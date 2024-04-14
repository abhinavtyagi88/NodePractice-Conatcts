const express = require('express')
const dotenv = require('dotenv').config()
const app = express()
const connectDb =require('./config/DB.js')
const myContact = require('./routers/contactRoute.js')
const userRoute = require('./routers/userRoute.js')


connectDb(); // Connect to MongoDB database using mongoose
port = process.env.PORT || 3000

app.use(express.json())
app.use('/api/contacts',myContact);
app.use('/api/user',userRoute);


app.listen(port ,(error)=>{
    if(!error){
    console.log(`Server is running on port ${port}`);

    }
    
    else {
        console.log(`Error  :${error}`)
    }
    
})

