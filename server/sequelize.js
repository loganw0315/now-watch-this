const {Sequelize} = require('sequelize')
require('dotenv').config()
const uri = process.env.DB_URI

const sequelize = new Sequelize(
    `${uri}`,
    {
        dialect: "postgres",
        dialectOptions:{
            ssl:{
                require: true,
                rejectUnauthorized: false
            }
        }
    }
)

module.exports = sequelize