const sequelize = require('./sequelize')

module.exports = {
    getMovies: async (req, res) => {
        const listId = req.params.id

        const data = await sequelize.query(`
        SELECT m.title, m.id, m.description, m.image_url FROM movies m
        INNER JOIN movie_list_movies ml
        ON m.id = ml.movie_id
        WHERE ml.movie_list_id = ${listId}`)

        const movies = data[0]

        res.status(200).send(movies)
    }
}