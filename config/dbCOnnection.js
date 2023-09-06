const mongoose=require('mongoose');

const connectDB=async()=>{
    try{
        //asynchronous JavaScript code to pause the execution of a function until a promise is resolved or rejected
        const connect=await mongoose.connect(process.env.CONNECTION_STRING)
        console.log("Database Coonected !", connect.connection.host, connect.connection.name)
    }
    catch(err){
        console.log(err);
        //if there is an error exit the process
        process.exit(1);
    }
}

module.exports=connectDB;