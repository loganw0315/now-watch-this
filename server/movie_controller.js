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
        }else{
            res.status(500).send('Movie already on list')
        }

    
        res.status(200).send('Movie added')

        
    },


}