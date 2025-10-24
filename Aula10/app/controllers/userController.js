const dbConn = require('../../config/dbConnection');
const userModel = require('../models/userModel');



module.exports.addUser = (req,res) =>{

    const {email,senha} = req.body;

    userModel.addUser(dbConn,{email,senha},(err,result)=>{

        if(err){

            console.log(email , senha);
            
            return res.status(500).send("Erro no Controller", err);

        }else{
            
            console.log("Usuario adicionado");
            res.redirect('/');
            
        }
    })



}



