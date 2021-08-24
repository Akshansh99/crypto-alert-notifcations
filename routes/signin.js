const express = require('express');
const cookieParser = require("cookie-parser"); //cookie handler
const router = express.Router();
const validateSignIn = require('../middleware/validateSignIn');

// Main start page
router.get("/",validateSignIn,(req,res)=>{
  
    //Simple render page asking for the email to be sent
    res.render('../views/signin.ejs')
});

//sign in route Post route
router.post('/signin',validateSignIn,(req,res)=>{

    //Parse user input into string
    const email = req.body.email.toString();

    //Add email to cookie
    res.cookie('email',email);

    res.redirect('/selectCoin');
  });
  


module.exports = router;