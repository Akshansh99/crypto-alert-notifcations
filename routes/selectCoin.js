const express = require('express');
const cookieParser = require("cookie-parser"); //cookie handler
const router = express.Router();
const validateSignIn = require('../middleware/validateSignIn');
const isSignedIn = require('../middleware/isSignedIn');

router.get('/',isSignedIn,(req,res)=>{
  
    //Dropdown menu of coins is implemented here
    res.render("../views/coinSelect.ejs",{

    //email from cookie is sent here
    email:req.cookies.email

    });
  });

module.exports = router;