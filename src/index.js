const express = require('express');
const app = express();
const ejs = require('ejs');
const routerLogin = require("./Routers/routerLogin");
const routerEjem = require("./Routers/routerEjemplo");
//Midelware
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//Asignacion De rutas
app.use(routerLogin);
app.use(routerEjem);

app.listen(3000,()=>{
    console.log("Server Runing in port: 3000");
})