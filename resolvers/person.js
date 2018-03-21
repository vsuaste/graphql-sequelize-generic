/*
  Resolvers for CRUD basic operations
  given a model defined with sequelize
*/
 const{person} = require('../models/person');
 const jwt =  require('jsonwebtoken');
 const bcrypt = require('bcryptjs');
 const searchArg = require('../utils/search-argument');

 var secret = 'something-secret';

 /*
   Resolvers for generated attributes given a
   relationship with another model
 */
 //person.prototype.dogs = function(){
  // return this.getDogs();
 //};
 person.prototype.filterDogs = function({search}, context) {
  let arg_sequelize = (new searchArg(search)).toSequelize();
  return this.getDogs({where: arg_sequelize});
}

 module.exports = {

   people: function(_,context){

    let token = context.request.headers["authorization"];
    try{
      //get person id from context
      let decoded = jwt.verify(token, secret);
      //check for permissions of that person.id
      let allowed = context.acl.isAllowed(decoded.id , 'person' ,'get');
      if(allowed){
          return person.findAll();
      }else{
        console.log("Permission denied");
        return null;
      }
    }catch(err){
      console.log("Invalid token");
      return  null;
    }
  },

  readAll: function({input}){

    let arg = new searchArg(input);
    let arg_sequelize = arg.toSequelize();
    return person.findAll({where: arg_sequelize});

  },

  readOne: function({id}){
    return person.findOne({where: {id: id}, include:[{all: true}]});
  },

  addPerson: function({firstName,lastName,email,password,role}, context){

      let hashedPassword = bcrypt.hashSync(password, 8);
      return person.create({firstName, lastName, email,hashedPassword,role}).
      then( person =>{
        person.token = jwt.sign({ id: person.id, role: person.role }, secret, {
          expiresIn: 86400 // expires in 24 hours
          });
        context.acl.addUserRoles(person.id,person.role);
        return person;
      });
  },

  deletePerson: function({id}, context){

    let token = context.request.headers["authorization"];
    try{
        //get person id from context
        let decoded = jwt.verify(token, secret);
        //check for permissions of that person.id
        let allowed = context.acl.isAllowed(decoded.id , 'person' ,'delete');
        if(allowed){
          return person
            .findById(id)
            .then( person =>{
                return person
                .destroy()
                .then(()=>{return 'Item succesfully deleted';});
              });
          }else{
            return "Permission denied";
          }
      }catch(err){
        return "invalid token";
      }
  },

  updatePerson: function({id,firstName,lastName,email},context){

    let token = context.request.headers["authorization"];
    try{
      //get person id from context
      let decoded = jwt.verify(token, secret);
      //check for permissions of that person.id
      let allowed = context.acl.isAllowed(decoded.id , 'person' ,'update');
      if(allowed){
        return person
        .findById(id)
        .then( person => {
          return person.update({
            firstName: firstName || person.firstName,
            lastName: lastName || person.lastName,
            email: email || person.email,
          })
        });
      }else{
        console.log("Permission denied");
        return null;
      }
    }catch(err){
      console.log("Invalid token");
      return null;
    }

  }
}
