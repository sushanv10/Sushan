const mongoose= require('mongoose');
require('dotenv').config();

const mongo_uri=process.env.MONGO_URI;


const connectDB= async () =>{
    try{
        await mongoose.connect(mongo_uri);
        console.log("Mongoose Connected");
    }catch(error){
        console.log(error);
        process.exit(1);
    }
};

module.exports= connectDB;
