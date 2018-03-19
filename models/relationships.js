
const{person} = require('../models/person');
const{dog} = require('../models/dog');

person.hasMany(dog);
dog.belongsTo(person);
