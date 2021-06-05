const mysql = require("mysql");
const mysqlConection = mysql.createConnection({ 
    host     : 'localhost',
    user     : 'root',
    port     : 3306,
    password : '2112',
    database : 'prototipo01'});
mysqlConection.connect((err)=>{
    if(err){
        console.log(err);
        return;
    }else   
    {
        console.log("DB Conectada");
    }
})
module.exports = mysqlConection;