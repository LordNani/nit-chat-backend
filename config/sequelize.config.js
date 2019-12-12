const Sequelize = require("sequelize");
const path = require('path')

module.exports = {
  config: path.resolve('./database/config', 'config.js'),
  'models-path': path.resolve('./database/models'),
  'seeders-path': path.resolve('./database/seeders'),
  'migrations-path': path.resolve('./database/migrations'),
}

const sequelize = new Sequelize('d50sa3ju24gr5g', 'gvuwdocaxkkmjy', 'de515f09b406d11299682415f754ba7f38478e53dc75aacddf2c3bba57bb12ee', {
    dialect: "mysql",
    host: "ec2-174-129-255-91.compute-1.amazonaws.com:5432",
    ssl: false,
    logging:  console.log,
    
    pool: {
        max: 20,
        min: 0,
        idle: 5000
    },
    mysql://bdb767ebc4f703:58939cab@us-cdbr-iron-east-05.cleardb.net/heroku_81805232f2e8e1e?reconnect=true
    postgres://gvuwdocaxkkmjy:de515f09b406d11299682415f754ba7f38478e53dc75aacddf2c3bba57bb12ee@ec2-174-129-255-91.compute-1.amazonaws.com:5432/d50sa3ju24gr5g
    define: {
        timestamps: false
    }
});

module.exports = sequelize;