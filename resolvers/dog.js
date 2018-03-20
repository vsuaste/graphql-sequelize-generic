
const{dog} = require('../models/dog');

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

 updateDog: function({name,breed},context){
       return dog
       .findById(id)
       .then( dog => {
         return dog.update({
           name: name || dog.name,
           breed: breed || dog.breed,
         })
       });
     }
}
