
const db = require("../services/db");
function Invitado(req, res, next) {
    const { Token } = req.body;
    db.query("SELECT u.Id,u.Usuario , p.Nombre, u.Token, e.Codigo, t.NivelAcceso FROM prototipo01.usuarios as u inner join personas as p on IdPersona = p.Id inner join estadousuario as e on IdEstadoUsuario = e.id inner join tipousuario as t on u.IdTipoUsuario = t.Id where u.Token = ?;", [Token], (err, result) => {
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
                    switch (user.NivelAcceso) {
                        case 0:
                            req.userInfo = { Nombre: user.Nombre, Id: user.Id, Usuario: user.Usuario, Token: user.Token };
                            next();
                            break;
                        case 1:
                            res.json({ success: false, msg: "Tipo de Usuario no Admitido." })
                            break;
                        case 3:
                            res.json({ success: false, msg: "Tipo de Usuario no Admitido." })
                            break;
                        case 5:
                            res.json({ success: false, msg: "Tipo de Usuario no Admitido." })
                            break;
                        default:
                            break;
                    }
                    break;
            }
        }
        else
            res.json({ success: false, msg: "Usuario Incorrecto." })
    })
    //  next();
}

function Cliente(req, res, next) {
    const { Token } = req.body;
    db.query("SELECT u.Id,u.Usuario , p.Nombre, u.Token, e.Codigo, t.NivelAcceso FROM prototipo01.usuarios as u inner join personas as p on IdPersona = p.Id inner join estadousuario as e on IdEstadoUsuario = e.id inner join tipousuario as t on u.IdTipoUsuario = t.Id where u.Token = ?;", [Token], (err, result) => {
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
                    switch (user.NivelAcceso) {
                        case 0:
                            res.json({ success: false, msg: "Tipo de Usuario no Admitido." })
                            break;
                        case 1:
                            req.userInfo = { Nombre: user.Nombre, Id: user.Id, Usuario: user.Usuario, Token: user.Token };
                            next();
                            break;
                        case 3:
                            res.json({ success: false, msg: "Tipo de Usuario no Admitido." })
                            break;
                        case 5:
                            res.json({ success: false, msg: "Tipo de Usuario no Admitido." })
                            break;
                        default:
                            break;
                    }
                    break;
            }
        }
        else
            res.json({ success: false, msg: "Usuario Incorrecto." })
    })
}

function Tranportista(req, res, next) {
    const { Token } = req.body;
    db.query("SELECT u.Id,u.Usuario , p.Nombre, u.Token, e.Codigo, t.NivelAcceso FROM prototipo01.usuarios as u inner join personas as p on IdPersona = p.Id inner join estadousuario as e on IdEstadoUsuario = e.id inner join tipousuario as t on u.IdTipoUsuario = t.Id where u.Token = ?;", [Token], (err, result) => {
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
                    switch (user.NivelAcceso) {
                        case 0:
                            res.json({ success: false, msg: "Tipo de Usuario no Admitido." })
                            break;
                        case 1:
                            res.json({ success: false, msg: "Tipo de Usuario no Admitido." })
                            break;
                        case 3:
                            req.userInfo = { Nombre: user.Nombre, Id: user.Id, Usuario: user.Usuario, Token: user.Token };
                            next();
                            break;
                        case 5:
                            res.json({ success: false, msg: "Tipo de Usuario no Admitido." })
                            break;
                        default:
                            break;
                    }
                    break;
            }
        }
        else
            res.json({ success: false, msg: "Usuario Incorrecto." })
    })
}

function Admin(req, res, next) {
    const { Token } = req.body;
    db.query("SELECT u.Id,u.Usuario , p.Nombre, u.Token, e.Codigo, t.NivelAcceso FROM prototipo01.usuarios as u inner join personas as p on IdPersona = p.Id inner join estadousuario as e on IdEstadoUsuario = e.id inner join tipousuario as t on u.IdTipoUsuario = t.Id where u.Token = ?;", [Token], (err, result) => {
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
                    switch (user.NivelAcceso) {
                        case 0:
                            res.json({ success: false, msg: "Tipo de Usuario no Admitido." })
                            break;
                        case 1:
                            res.json({ success: false, msg: "Tipo de Usuario no Admitido." })
                            break;
                        case 3:
                            res.json({ success: false, msg: "Tipo de Usuario no Admitido." })
                            break;
                        case 5:
                            req.userInfo = { Nombre: user.Nombre, Id: user.Id, Usuario: user.Usuario, Token: user.Token };
                            next();
                            break;
                        default:
                            break;
                    }
                    break;
            }
        }
        else
            res.json({ success: false, msg: "Usuario Incorrecto." })
    })
}
module.exports = { Invitado, Cliente, Tranportista, Admin };