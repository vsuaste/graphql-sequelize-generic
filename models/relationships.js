
const{person} = require('../models/person');
const{dog} = require('../models/dog');

person.hasMany(dog, {as: 'dogs'});
dog.belongsTo(person, {as: 'person'});
