Sequelize = require('sequelize');

const Conn = new Sequelize(
  'postgres',
  'postgres',
  'postgres',
  {
    dialect: 'postgres',
    host: '127.0.0.1'
  }
);

module.exports.connection = Conn;
