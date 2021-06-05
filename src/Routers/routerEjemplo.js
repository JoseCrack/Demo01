const express = require("express");
const router = express.Router();
const db = require("../services/db");
const {Invitado,Cliente,Tranportista, Admin} = require("./seguridadApi");
//Esto seria un ejemplo de una pagina o seccion privada para un solo tipo de usuario
router.get("/api/getlistinvitado",Invitado,(req,res)=>{
      res.json({msg: req.userInfo.Nombre + " Eres un Invitado"})
})
router.get("/api/getlistcliente",Cliente,(req,res)=>{
    res.json({msg: req.userInfo.nombre + " Eres un Cliente"})
})
router.get("/api/getlisttans",Tranportista,(req,res)=>{
    res.json({msg: req.userInfo.nombre + " Eres un Transportista"})
})
router.get("/api/getlistadmin",Admin,(req,res)=>{
    res.json({msg: req.userInfo.nombre + " Eres un Admin"})
})

module.exports = router;