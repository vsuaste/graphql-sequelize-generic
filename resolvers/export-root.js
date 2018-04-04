var resolversPerson = require('./person');
var resolversDog = require('./dog');

module.exports = {
  people: resolversPerson.people,
  readOne: resolversPerson.readOne,
  readAll: resolversPerson.readAll,
  addPerson: resolversPerson.addPerson,
  deletePerson: resolversPerson.deletePerson,
  updatePerson: resolversPerson.updatePerson,

  //Dog resolvers
  addDog: resolversDog.addDog,
  readDog: resolversDog.readDog,
  updateDog: resolversDog.updateDog,
};
