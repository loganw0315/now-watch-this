const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;


const {registerUser, loginUser} = require('./login_controller.js')
const {search} = require('./search_controller.js')
const {addToList, getLists} = require('./lists_controller.js')

//Middleware
app.use(express.json());
app.use(cors());

//Login endpoints
app.post('/register', registerUser)
app.post('/login', loginUser)
//Search endpoints
app.post('/search', search)
//Lists endpoints
app.post('/lists', addToList)
app.get('/lists/:id', getLists)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));