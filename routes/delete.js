const express = require('express');
const cookieParser = require("cookie-parser"); //cookie handler
const router = express.Router();
// const validateSignIn = require('../middleware/validateSignIn');
const isSignedIn = require('../middleware/isSignedIn');

router.get("/email",isSignedIn,(req,res)=>{
    res.clearCookie('email');
    res.redirect('/start');
});

module.exports = router;