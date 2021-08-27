const express = require('express');
const router = express.Router();
const isSignedIn = require('../middleware/isSignedIn');
require("../functions/cronjob");

router.get('/',isSignedIn,(req,res)=>{

    //Destructuring cookies
    const {cookies} = req;
    const {email,coinSet,price} = cookies;

    //Render Success Page
    res.render("../views/success.ejs",{
        email: email,
        coin: coinSet,
        price: price
    });
});

module.exports = router;
