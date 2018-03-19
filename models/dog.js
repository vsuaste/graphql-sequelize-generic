_ = require('lodash');
Faker = require('faker');

const {connection} = require('../connection');

const Dog = connection.define('dog',{

  id: {
  type: Sequelize.UUID,
  primaryKey: true,
  defaultValue: Sequelize.UUIDV4,
},

  name:{
    type: Sequelize.STRING,
    allowNull:false
  },

  breed:{
    type:Sequelize.STRING
  }

});

module.exports.dog = Dog;
