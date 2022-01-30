const sequelize = require('./sequelize')

module.exports = {
    getMovies: async (req, res) => {
        const listId = req.params.id

        const movieData = await sequelize.query(`
        SELECT m.title, m.id, m.description, m.image_url FROM movies m
        INNER JOIN movie_list_movies ml
        ON m.id = ml.movie_id
        WHERE ml.movie_list_id = ${listId}`)

        const listData = await sequelize.query(`
        SELECT * from movie_lists
        WHERE id = ${listId}`)

        const movies = movieData[0]
        const list = listData[0][0]

        const data = {
            movies: movies,
            list: list
        }

        res.status(200).send(data)
    }
}