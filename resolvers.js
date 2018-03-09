/*
  Resolvers for CRUD basic operations
  given a model defined with sequelize
*/
 const{person} = require('./model');

 module.exports = {

   people: function(){
    return person.findAll();
  },

  readOne: function({id}){
    return person.findOne({where: {id: id}});
  },

  addPerson: function({firstName,lastName,email}){
      return person.create({firstName, lastName, email});
  },

  deletePerson: function({id}){
    return person
      .findById(id)
      .then( person =>{
          return person
          .destroy()
          .then(()=>{return 'Item succesfully deleted';});
      });
  },

  updatePerson: function({id,firstName,lastName,email}){
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
