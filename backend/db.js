const mongoose = require("mongoose");

async function connectionDb() {
    //connect with Mongodb
    mongoose.connect('mongodb://127.0.0.1:27017/AiCodeReviewer')
    .then(()=>console.log("MongoDb Connected.."))
    .catch(err=>console.log("Mongodb Error",err));
}
module.exports = connectionDb;   