const Sequelize = require("sequelize");

const sequelize = new Sequelize('heroku_81805232f2e8e1e', 'root', 'TheDelta28super', {
    dialect: "mysql",
    host: "us-cdbr-iron-east-05.cleardb.net",
    ssl: false,
    logging:  console.log,
    
    pool: {
        max: 20,
        min: 0,
        idle: 5000
    },
    mysql://bdb767ebc4f703:58939cab@us-cdbr-iron-east-05.cleardb.net/heroku_81805232f2e8e1e?reconnect=true
    define: {
        timestamps: false
    }
});

module.exports = sequelize;