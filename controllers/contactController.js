const asyncHandler =require("express-async-handler")
const Contact = require("../models/contactModel");
const user =require('../models/userModel.js')



const getContact =  asyncHandler(async (req, res)=>{ 
    const contact =  await Contact.findById({user_id: req.user.id });
    if(!contact){
      return res.status(404).json({message:"No contact found"});
    }
    else {
      res.json (contact);
    }
    
   
     
});


const createContact = asyncHandler(async (req, res) => {
    console.log("The request body is :", req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      res.status(400);
      throw new Error("All fields are mandatory !");
    }

    console.log("ID:",req.user);

    const contact = await Contact.create({
      name,
      email,
      phone,
      user_id:764347343434344,
      // user_id: req.user.id,
    });
  
    res.status(201).json(contact);
  });




const getContacts = asyncHandler(async (req, res) => {
  const contact = await Contact.findById({user_id: req.params.id});
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});



const updateContacts = asyncHandler(async (req, res)=>{ 
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  // if (contact.user_id.toString() !== req.user.id) {
  //   res.status(403);
  //   throw new Error("User don't have permission to update other user contacts");
  // }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedContact);
});



const deleteContacts = asyncHandler(async (req, res)=>{ 
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  // if (contact.user_id.toString() !== req.user.id) {
  //   res.status(403);
  //   throw new Error("User don't have permission to update other user contacts");
  // }
  await Contact.deleteOne({ _id: req.params.id });
  res.status(200).json(contact).send({"CONTACT DELETED;":_id});
});


module.exports={
    getContact ,
    createContact,
    getContacts,
    updateContacts,
    deleteContacts
};       


