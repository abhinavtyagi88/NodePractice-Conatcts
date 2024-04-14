const myRoute =  require('express').Router();
const validateToken = require('../middleware/validateTokenHandlers.js')
//  myRoute.route('/').get((res,req)=>{
//     res.set('Content-Type', 'text/html');
//     res.status(200).send("<h1>Hello GFG Learner!</h1>");
//  });

const {getContact ,
createContact,
getContacts,
updateContacts,
deleteContacts} = require('../controllers/contactController.js')


// myRoute.use(validateToken)
myRoute.get('/', getContacts); 
myRoute.post('/',createContact); 


myRoute.put('/:id', updateContacts); 
myRoute.post('/:id',getContact); 
myRoute.delete('/:id',deleteContacts); 

 module.exports=myRoute;