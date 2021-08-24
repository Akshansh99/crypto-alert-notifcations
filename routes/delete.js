const express = require('express');
const cookieParser = require("cookie-parser"); //cookie handler
const router = express.Router();
const isSignedIn = require('../middleware/isSignedIn');

router.get("/email",isSignedIn,(req,res)=>{

    //delete authentication email
    res.clearCookie('email');
    
    //redirect to sign in page
    res.redirect('/start');
});

module.exports = router;