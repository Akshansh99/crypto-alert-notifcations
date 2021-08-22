const bull = require("bull");
const emailProcess = require("./emailProcess");
const REDIS_URL = "redis://127.0.0.1:6379"; //local redis url

const emailQueue = new bull('email', REDIS_URL); //creating a redis queue

//Initiating the queue objects to process using emailProcess function
emailQueue.process(emailProcess);


const sendNewEmail = (data)=>{
    //data to be stored in redis queue for an object
    emailQueue.add(data,{

    })
}

module.exports = {
    sendNewEmail
}