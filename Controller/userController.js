const asynkHandler=require('express-async-handler');
const user=require('../Models/userModel');
//import bcrypt
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');

//@desc register the users
//@route /api/users/register
//@access public
const registerUser=asynkHandler(async(req, res)=>{
    const {username, email, password}=req.body;
    if (!username || !email || !password)
    {
        res.status(400);
        throw new Error("All data must be filled.");
    }
    //find there is a user using that email
    const userAvailable=await user.findOne({email});
    if (userAvailable)
    {
        res.status(400);
        throw new Error("User already registered.");
    }

    //hashing password
    //dcrypt also get a promise
    //10 is no of salt rounds
    const hashedPassword=await bcrypt.hash(password, 10);
    const users=await user.create({username, email, password:hashedPassword});
    //is user created no need to display all data since there is the hash password
    if (users)
    {
        res.status(201).json({_id:users.id, email:users.email});
    }
    else {
        res.status(400);
        throw new Error("User data not valid");
    }
});

//@desc loging the users
//@route /api/users/login
//@access public
const loginUser=asynkHandler(async(req, res)=>{
    const {email, password}=req.body;
    if (!email || !password)
    {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    //fins there is a user with that email
    const users=await user.findOne({email});
    //compare the password
    if (users && (await bcrypt.compare(password, users.password)))
    {
        //sign get few parameters 
        //we need to provide payload as a object, this is the payload embaded with token
        //need to provide access token secret
        //need to expiration time of our token
        //afetr the expiration date the user can not call to the apis
        const accessToken=jwt.sign({
            user:{
                username:users.username, 
                email:users.email,
                id:users.id
            }
        }, 
        process.env.ACCESS_TOKEN_SECRET, 
        {expiresIn:"100m"}
        );
        res.status(200).json({accessToken});
    }
    else{
        res.status(401);
        throw new Error("Email or password not correct.");
    }
});

//@desc display the current user
//@route /api/users/current
//@access public
const currentUser=asynkHandler(async(req, res)=>{
    res.json({message:'Current User Details'});
});

module.exports={registerUser, loginUser, currentUser};