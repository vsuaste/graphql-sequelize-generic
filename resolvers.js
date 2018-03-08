/*
  Resolvers for CRUD basic operations
  given a model defined with sequelize
*/

 var Crud = require('./crud');
 const{person} = require('./model');

 const crud = new Crud(person);

 module.exports = {

   people: function(){
    return crud.allItems();
  },

  readOne: function({id}){
    return crud.itemById({id});
  },

  addPerson: function(args){
    return crud.addItem(args);
  },

  deletePerson: function({id}){
    return crud.deleteItem({id});
  },

  updatePerson: function(args){
    return crud.updateItem(args);
  }

 }
