const { default: axios } = require('axios')
const sequelize = require('./sequelize')

module.exports = {
    addMovieToList: async (req, res) => {
        const {id, title, description, image_url, listId} = req.body

        const movieExistsInDb = await sequelize.query(`
        SELECT EXISTS (SELECT * FROM movies WHERE id = '${id}');`)
        

        if(movieExistsInDb[0][0].exists === false){
            sequelize.query(`
            INSERT INTO movies (id, title, description, image_url)
            VALUES ('${id}', '${title}', '${description}', '${image_url}');`)
        }
    
        const movieExistsOnList = await sequelize.query(`
        SELECT EXISTS (SELECT * FROM movie_list_movies WHERE movie_list_id = ${listId} AND movie_id = '${id}');`)

        if(movieExistsOnList[0][0].exists === false){
            sequelize.query(`
            INSERT INTO movie_list_movies(movie_list_id, movie_id)
            VALUES (${listId}, '${id}');`)
            res.status(200).send('Movie added')
        }else{
            res.status(500).send('Movie already on list')
        }

    
        

        
    },
    getMovieDetails: async (req, res) => {
        const movieId = req.params.id
        let movieData = ""
        console.log(movieId);
        await axios.get(`https://imdb-api.com/en/API/Title/k_i466l60f/${movieId}`).then((res) => {
            
            movieData = res.data
        })
        if(movieData){
            console.log(movieData);
            res.status(200).send(movieData)
        }else{
            res.status(500).send('Movie details could not be retrieved')
        }
    },
    removeMovieFromList: async (req, res) => {
        const {movieId, listId} = req.body

        await sequelize.query(`
        DELETE FROM movie_list_movies
        WHERE movie_list_id = ${listId}
        AND movie_id = '${movieId}'`)
        
        res.status(200).send('Movie has been removed from list')
    },
    getAllUserMovies: async (req, res) => {
        const userId = req.params.id

        const movieData = await sequelize.query(`
        SELECT * FROM movies m
        INNER JOIN  movie_list_movies mlm
        ON m.id = mlm.movie_id
        INNER JOIN user_lists ul
        ON mlm.movie_list_id = ul.movie_list_id
        WHERE ul.user_id = ${userId};`)

        const filteredMovieData = movieData[0].map()

        res.status(200).send(movieData)
    }


}