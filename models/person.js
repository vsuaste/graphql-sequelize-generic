/*
  Definition sequelize model
  Note: lodash and faker are only for testing purposes
*/

/* change name of file model.js ---> person.js */

_ = require('lodash');
Faker = require('faker');

const {connection} = require('../connection');

const Person = connection.define('person',{
  firstName:{
    type: Sequelize.STRING,
    allowNull:false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNul:false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password:{
    type: Sequelize.STRING,
    allowNul:false
  },
  role:{
    type: Sequelize.STRING
  },
  token:{
    type: Sequelize.STRING
  }
});

//Generate fake data for table for testing purposes
connection.sync({force: true}).then(()=> {
    _.times(15, ()=>{
      return Person.create({
        firstName: Faker.name.firstName(),
        lastName: Faker.name.lastName(),
        email: Faker.internet.email()
      }).then( person => {
        return person;
        })
      });
    });

module.exports.person = Person;
