const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;


const {registerUser, loginUser} = require('./login_controller.js')
const {search} = require('./search_controller.js')
const {addToLists, getLists, deleteList} = require('./lists_controller.js');
const { addMovieToList, getMovieDetails } = require('./movie_controller.js');
const { getMovies } = require('./list-movies_controller.js');


//Middleware
app.use(express.json());
app.use(cors());

//Login endpoints
app.post('/register', registerUser)
app.post('/login', loginUser)
//Search endpoints
app.post('/search', search)
//Lists endpoints
app.post('/lists', addToLists)
app.get('/lists/:id', getLists)
app.delete('/lists', deleteList)
//Movie endpoints
app.get('/movie/:id', getMovieDetails)
app.post('/movie', addMovieToList)
//List Movies endpoints
app.get('/list-movies/:id', getMovies)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));