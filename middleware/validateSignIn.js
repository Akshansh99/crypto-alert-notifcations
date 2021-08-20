const express = require('express');
const cookieParser = require("cookie-parser");
const app = express();

module.exports = validateSignIn = (req,res,next)=>{
    const {cookies} = req;
  
    //If there is no email stored in cookie, enter the email 
    if(!('email' in cookies)) next();
    //else redirect to the main page
    else 
    res.redirect("/selectCoin");
    // res.json({
    //     "error":"Already entered email!"
    // })
  }