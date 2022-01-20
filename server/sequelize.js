const {Sequelize} = require('sequelize')

const sequelize = new Sequelize(
    "    postgres://mtyzoaqdjgmfud:9c423e333cdf3b08e75b7bae22164d9d8c06443b8c39ed98d3f3a5534994b17f@ec2-34-227-120-94.compute-1.amazonaws.com:5432/d1k7c7it30k7en",
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