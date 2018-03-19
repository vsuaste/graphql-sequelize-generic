
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
     then( person =>{
       return person;
     });
 },

 updateDog: function({name,breed},context){
       return person
       .findById(id)
       .then( person => {
         return person.update({
           firstName: firstName || person.firstName,
           lastName: lastName || person.lastName,
           email: email || person.email,
         })
       });
     }
}
