const sequelize = require('./sequelize')

module.exports = {
    addToList: async (req, res) => {
        const {title, description, privacy, userId} = req.body;
        console.log(userId);
        await sequelize.query(`
        INSERT INTO movie_lists(title, description, privacy)
        VALUES('${title}','${description}','${privacy}');
        ` 
        )
        const listId = await sequelize.query(`
        SELECT id FROM movie_lists
        WHERE title = '${title}';
        `)
        console.log(listId[0][0].id);
        await sequelize.query(`
        INSERT INTO user_lists(user_id, movie_list_id)
        VALUES(${userId}, ${listId[0][0].id});
        `)

        res.status(200).send('List created')
    },
    // getLists: async (req,res) => {
    //     const userId = req.body
    //     const userLists = await sequelize.query(`
    //     SELECT * FROM movie_lists
    //     WHERE `)
    // }
}