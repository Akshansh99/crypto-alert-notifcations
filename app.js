//Initialisation of resources
const express = require('express'); 
const cookieParser = require("cookie-parser"); //cookie handler
const app = express();
const axios = require('axios'); //api request response handler
const PORT = process.env.PORT || 5000; // local and deployment port

// app.use(express.json({ extended: false }));
app.set("view engine", "ejs");

app.use(
  express.urlencoded({
      extended: true,
  })
);

app.use(cookieParser());

app.use('/start',require('./routes/signin.js'));
app.use('/selectCoin',require('./routes/selectCoin.js'));
app.use('/setPrice',require('./routes/setPrice.js'));
app.use('/delete',require('./routes/delete.js'));

app.listen(PORT,()=>console.log(`The Server running on ${PORT}`));