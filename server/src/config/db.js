const mongoose = require("mongoose");

const MongodbConnect = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB Connected");
        
    } catch (error) {
        console.log(error, "DB Connection is Failed");
    }
}

module.exports = MongodbConnect;