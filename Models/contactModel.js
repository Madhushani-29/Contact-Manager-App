const mongoose=require('mongoose');
//function is used to define the structure and properties of a document in MongoDB
const contactSchema=mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user",
      },
    name:{
        type:String, 
        required: [true, "Please add a contact name."]
    },
    address:{
        type:String, 
        required: [true, "Please add a contact address."]
    },
    age:{
        type:String, 
        required: [true, "Please add a contact age."]
    }
},
{
    timestamps:true
}
);
// function is used to create a model based on the defined schema
//two arguments:name of model and the schema object
module.exports=mongoose.model("contact", contactSchema);
