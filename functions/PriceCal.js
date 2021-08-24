const axios = require('axios'); 

const PriceCal = async (coin) =>{
    try{
        //request External coinbase api for exchange rates of coin
        return await axios.get(`https://api.coinbase.com/v2/exchange-rates?currency=${coin}`);
    }
    catch(error){
        res.status(500).send(err);
    }

}

module.exports = PriceCal;