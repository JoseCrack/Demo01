const express = require("express");
const router = express.Router();
const db = require("../services/db");
const jwt = require("jsonwebtoken");

//Peticion de tipo POST a /api/singup la cual permite registrar a un usuario o cliente en la DB 
router.post("/api/singup",(req,res)=>{
    try {
        const body = req.body;
        if(verify(body.usuario) || verify(body.password) || verify(body.nombre) || verify(body.apellidos) || verify(body.dni) || verify(body.telfi) || verify(body.telmov) || verify(body.email)){
           res.json({success : false ,msg: "Faltan Campos por rellenar"})
        }else{
            //Busca en la DB si existe algun usuario con el mismo nombre de usuario de ser asi lo notifica
            db.query("SELECT count(id) as count  FROM prototipo01.usuarios where Usuario = '" + body.usuario + "';",(err,result)=>{
               //Susede si no existen nombres de usuarios iguales
                if (result[0].count == 0) {
                    //Ejecuta una consulta a una funcion(no se como se le dice en realidad) para facilitar el registro de usuarios(Es invension mia muy cambiable)
                    db.query("call prototipo01.registerNewUser(?, ?, ?, ?, ?, ?, ?, ?);", [body.usuario, body.password, body.nombre, body.apellidos, body.dni, body.telfi, body.telmov, body.email], (err, result) => {
                        if (err)
                            res.json({ success: false, msg: "A ocurrido un error al registrarse" })
                        else if (result[0][0].result == "Saved")
                            res.json({ success: true, msg: "Usuario Registrado Confirme la Cuenta por su correo Electronico" })
                    })
                }
                else
                    res.json({ success: false, msg: "El nombre de usuario ya esta en la DB" })
            })
        }     
    } catch (error) {
        console.log(error)
        res.json({error: "Error al insertal datos"})
    }

})

//Petision tipo POST a /api/login la cual consede o deniega el acceso al usuario o cliente 
router.post("/api/login",async (req,res)=>{
        const body = req.body;
        if(verify(body.usuario) || verify(body.password) ){
            res.json({success : false ,msg: "Faltan Campos por rellenar"})
            return;
        } else {
            //Ejecuta una consulta a la DB pidiendo informacion sobre el usuaaraio solisitado para loguear
            db.query("SELECT u.Id,u.Usuario , p.Nombre, u.Token,e.Codigo, t.NivelAcceso FROM prototipo01.usuarios as u inner join personas as p on IdPersona = p.Id inner join estadousuario as e on IdEstadoUsuario = e.id inner join tipousuario as t on u.IdTipoUsuario = t.Id where u.Usuario = ? AND u.Contrasena = ?;", [body.usuario, body.password], (err, result) => {
                if (err) {
                    res.json({ success: false, msg: "Internal Error" })
                }
                //Alacena el primer dato que regresen de la DB 
                const user = result[0]
                if (user) {
                    //Compara los estados del usuario y deniega o consede acceso
                    switch (user.Codigo) {
                        case 0:
                            res.json({ success: false, msg: "Usuario Suspendido." })
                            break;
                        case 1:
                            res.json({ success: false, msg: "Usuario Pendiente a cofirmacion de Correo." })
                            break;
                        case 2:
                            //Verifica si en la DB del usuario esta el campo token nulo lo cual indicaria que el usuario nunca se a logueado en ese caso se crearia y asignaria un token 
                            if (user.Token == null) {
                                const tok = GenTokens(user);
                                //Envia a la DB el token correspondiente al usuario solo se ejecuta la primera vez que se loguee
                                db.query("UPDATE usuarios SET Token = ? where Id = ?;", [tok, user.Id], (err, result) => {
                                    if (err) {
                                        res.json({ success: false, msg: "Error al Loguear al usuario..." })
                                    } else {
                                        res.json({ success: true, msg: "Usuario Logueado.", Usuario: { Usuario: user.Usuario, Nombre: user.Nombre, Token: tok, NivelAccess: user.NivelAcceso } });
                                    }
                                })
                            } else {
                                //En caso de existir el token solo responde la peticion de permitido 
                                res.json({ success: true, msg: "Usuario Logueado.", Usuario: { Usuario: user.Usuario, Nombre: user.Nombre, Token: user.Token, NivelAccess: user.NivelAcceso } });
                            }
                            break;
                        default:
                            break;
                    }
                } 
                else
                    res.json({ success: false, msg: "Usuario Incorrecto." })

           
            });
        }
});

//Verifica que los parametros no esten nulos o vacios
function verify(params) {
    if (params == "" || params == null)
        return true;
    else
        return false;
}
//Genera el token del Usuario cuando se loguea
function GenTokens(dataUser) {
    //Retorna el token de los datos del usuario utilizando una clave secreta 
    const token = jwt.sign({dataUser},"ZXCVBNM<>?");
    //console.log(token);
    return token;
}
module.exports = router;