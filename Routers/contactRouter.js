const express=require('express');
const router=express.Router();
const {getContacts, postContacts, updateContacts, deleteContacts, getContactsByID}=require("../Controller/contactController");
const validateToken = require('../Middleware/verifyToken');

router.use(validateToken);
router.route("/").get( getContacts).post(postContacts);
router.route("/:id").put(updateContacts).delete(deleteContacts).get(getContactsByID);
module.exports=router;



