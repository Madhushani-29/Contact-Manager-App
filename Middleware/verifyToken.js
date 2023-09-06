const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    //splits a string into an array of substrings based on a specified separator
    //[1] accesses the second element of the array obtained from the split() 
    token = authHeader.split(" ")[1];

    //err: This parameter will hold any error that occurred during the verification process. 
    //If there is an error, it indicates that the token is not valid or has expired.
    //decode: If the verification is successful, this parameter will contain the decoded token payload.
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("User is not authorized");
      }
      //decoded represents the decoded payload of the JWT. 
      //user is the object assigned to the payload
      req.user = decoded.user;
      //execute the next process
      //that next one has mentioned in the router
      next();
    });

    if (!token) {
      res.status(401);
      throw new Error("User is not authorized or token is missing");
    }
  }
});

module.exports = validateToken;