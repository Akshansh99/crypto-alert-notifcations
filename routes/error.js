const express = require('express');
const cookieParser = require("cookie-parser"); //cookie handler
const router = express.Router();
const isSignedIn = require('../middleware/isSignedIn');

router.get("/",(req,res)=>{
    
    //simple error page
    res.send({msg:"You cannot access this page!"});
});

module.exports = router;