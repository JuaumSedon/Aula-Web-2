const dbConn = require('../../config/dbConnection');
const {getPaitings} = require('../models/homeModel');
module.exports.home = (app ,req , res) => {
    console.log("Controller home")

    const db = dbConn;
    //Chamando o Model
    getPaitings(db,(error,result)=>{
        console.log(error);
        console.log(result);
        res.render("home.ejs",{paintings:result});
    });
  
}