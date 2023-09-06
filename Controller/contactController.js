//import async handler
const asyncHandler=require('express-async-handler');
const contact=require('../Models/contactModel');

//@desc get all contacts
//@api /api/contacts
//@access public

const getContacts=asyncHandler(async(req, res)=>{
    //user.id is the id we decoded when we verify the token
    const contacts=await contact.find({user_id:req.user.id});
    res.json(contacts);
});
//@desc get one contacts
//@api /api/contacts/:id
//@access public

const getContactsByID=asyncHandler(async(req, res)=>{
    const contacts=await contact.findById(req.params.id);
    if (!contacts)
    {
        res.status(404);
        throw new Error ("Details not found");
    }
    res.status(200).json(contacts);
});
//@desc post all contacts
//@api /api/contacts
//@access public

const postContacts=asyncHandler(async(req, res)=>{
    const {name, address, age}=req.body;
        if (!name || !address || !age)
        {
            res.status(400);
            throw new Error ("All the data must be filled");
        }

    const contacts=await contact.create({name, address, age, user_id:req.user.id});
    res.status(500).json(contacts);
});

//@desc update one contacts
//@api /api/contacts/:id
//@access public

const updateContacts=asyncHandler(async(req, res)=>{
    const contacts=await contact.findById(req.params.id);
    if (!contacts)
    {
        res.status(404);
        throw new Error ("Details not found");
    }
    if (contacts.user_id.toString() != req.user.id){
        res.status(403);
        throw new Error("User doesn't have permission to update that contact");
    }

    //ne:true is to return the contact after update
    const updatedContact=await contact.findByIdAndUpdate(req.params.id, req.body, {new:true})
    res.json(updatedContact);
});

//@desc delete one contacts
//@api /api/contacts/:id
//@access public

const deleteContacts=asyncHandler(async(req, res)=>{
    const contacts=await contact.findById(req.params.id);
    if (!contacts)
    {
        res.status(404);
        throw new Error ("Details not found");
    }

    if (contacts.user_id.toString() != req.user.id){
        res.status(403);
        throw new Error("User doesn't have permission to delete that contact");
    }

    //ne:true is to return the contact after update
    await contact.deleteOne({_id:req.params.id});
    res.status(200).json(contacts);
});

module.exports={getContacts, postContacts, updateContacts, deleteContacts, getContactsByID};