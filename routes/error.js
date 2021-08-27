const express = require('express');
const cookieParser = require("cookie-parser"); //cookie handler
const router = express.Router();
const isSignedIn = require('../middleware/isSignedIn');

router.get("/",(req,res)=>{
    
    //simple error page
    res.render("../views/error.ejs");
});

module.exports = router;