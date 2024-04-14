
const User = require('../models/userModel.js');
const asyncHandler = require( 'express-async-handler' );
const bcrypt = require('bcrypt');
const jwt =require('jsonwebtoken');



const registerUser = asyncHandler(async (req, res) => {
  const {name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    console.log("All fields are mandatory!");
  }

  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    console.log("User already registered!");
  }

  //Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password: ", hashedPassword);
  const user = await User.create({
    name,
    email,
    password: hashedPassword
  });

  console.log(`User created ${user}`);
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    console.log("User data is not valid");
  }
  res.json({ message: "Register the user" });
});



const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const user = await User.findOne({ email });
  
  //compare password with hashedpassword
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECERT,
      { expiresIn: "1m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("email or password is not valid");
  }
});

const currentUser =  (req, res) => {
    // res.set(  'Content-Type', 'application/json');
    res.status(200)
    .json({ "message": "currentUser" });

}

module.exports = {registerUser, loginUser, currentUser};