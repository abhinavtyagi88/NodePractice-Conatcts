const user = require('express').Router();
const {registerUser ,currentUser, loginUser} =require('../controllers/userController.js')
const validateToken = require("../middleware/validateTokenHandlers.js");

user.post('/register',registerUser);

user.post("/login", loginUser);

user.get("/currentUser",validateToken, currentUser);

module.exports =  user;