const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());

const isSignedIn = (req,res,next)=>{
    const {cookies} = req;

    //If previously authenticated, route should work.
    if('email' in cookies) next();
    
    //Not authorised to access
    else res.redirect("/error");
}

module.exports = isSignedIn;