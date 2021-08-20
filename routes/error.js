const express = require('express');
const cookieParser = require("cookie-parser"); //cookie handler
const router = express.Router();
// const validateSignIn = require('../middleware/validateSignIn');
const isSignedIn = require('../middleware/isSignedIn');

app.get("/",(req,res)=>{
    res.send({msg:"You cannot access this page!"});
});