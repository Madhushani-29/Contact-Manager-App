const express=require('express');
const dotenv=require('dotenv').config();
const connectDB=require('./config/dbCOnnection');
const errorHandler=require('./Middleware/errorHandler');

const app=express();

const port=process.env.PORT || 5000;

connectDB();


app.use(express.json());
app.use('/api/contacts', require('./Routers/contactRouter'));
app.use('/api/users', require('./Routers/userRouter'));
app.use(errorHandler)

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});