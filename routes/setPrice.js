const express = require('express');
const cookieParser = require("cookie-parser"); //cookie handler
const router = express.Router();
// const validateSignIn = require('../middleware/validateSignIn');
const isSignedIn = require('../middleware/isSignedIn');

//dummy post route to find if our request is correct or not 
router.post('/',isSignedIn,(req,res)=>{
    // res.json(req.body);
    const coin = req.body.coin.toString();
    res.cookie('coinSet',coin);
    res.redirect('/setPrice');
  });
  
router.get('/',isSignedIn,(req,res)=>{
    const {cookies} = req;
    res.clearCookie('coinSet');
    res.render("../views/setAlert.ejs",{
      coin: cookies.coinSet,
      coinPrice : 50
    })
    // res.send(cookies.coinSet);
});

router.post('/showDetails',(req,res)=>{
  res.json(req.body);
});


module.exports = router;