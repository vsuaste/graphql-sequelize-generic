
const{dog} = require('../models/dog');
const{person} = require('../models/person');

/*
  Resolvers for generated attributes given a
  relationship with another model
*/
dog.prototype.owner = function(){
  return person.findOne({where: {id: this.personId}});
};


module.exports = {

  dogs: function(_,context){
         return dog.findAll();
 },

 readDog: function({id}){
   return dog.findOne({where: {id: id}});
 },

 addDog: function({name,breed}, context){
     return dog.create({name,breed}).
     then( dog =>{
       return dog;
     });
 },

 updateDog: function({id,name,breed,personId},context){
       return dog
       .findById(id)
       .then( dog => {
         return dog.update({
           name: name || dog.name,
           breed: breed || dog.breed,
           personId: personId || dog.personId,
         })
       });
     },
}
