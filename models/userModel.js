const mongoose= require('mongoose')

const userSchema =  new mongoose.Schema({
    
    name: {
        type: String,
        required: [true, "Please add the contact name"],
      },
      email: {
        type: String,
        required: [true, "Please add the contact email address"],
        unique: [true,"The email must be unique"] ,
      },
      password:{
        type:String,
        required: true
      },
    
  }
,{timestamps: true}
);

    module.exports = mongoose.model("Userschema",userSchema);