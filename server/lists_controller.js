const sequelize = require('./sequelize')

module.exports = {
    addToLists: async (req, res) => {
        let {title, description, userId} = req.body;
        if(title.includes("'")){
            title = title.replaceAll("'", "''")
        }
        if(title.includes(";")){
            title = title.replaceAll(";", "/;")
        }
        if(description.includes("'")){
            description = description.replaceAll("'", "''")
        }
        if(description.includes(";")){
            description = description.replaceAll(";", "/;")
        }
        console.log(userId);
        await sequelize.query(`
        INSERT INTO movie_lists(title, description)
        VALUES('${title}','${description}');
        ` 
        )
        const listId = await sequelize.query(`
        SELECT id FROM movie_lists
        WHERE title = '${title}';
        `)
        await sequelize.query(`
        INSERT INTO user_lists(user_id, movie_list_id)
        VALUES(${userId}, ${listId[0][0].id});
        `)

        res.status(200).send('List created')
    },
    getLists: async (req,res) => {
        const userId = req.params.id
        const listData = await sequelize.query(`
        SELECT * FROM movie_lists m
        INNER JOIN user_lists l
        ON l.movie_list_id = m.id
        INNER JOIN users u
        ON l.user_id = u.id
        WHERE u.id = ${userId}
        `)

        const userLists = listData[0]
        res.status(200).send(userLists)
    },
    deleteList: async (req, res) => {
        const {listId} = req.body
        await sequelize.query(`
        DELETE FROM user_lists
        WHERE movie_list_id = ${listId}`)
        await sequelize.query(`
        DELETE FROM movie_lists
        WHERE id = ${listId};`)
        await sequelize.query(`
        DELETE FROM movie_list_movies
        WHERE movie_list_id = ${listId};`)

        res.status(200).send(`${listId}`)
    }
}