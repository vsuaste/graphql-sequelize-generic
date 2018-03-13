/*
  Resolvers for CRUD basic operations
  given a model defined with sequelize
*/
 const{person} = require('./model');

 class searchArg{
   constructor({field, value, operator, searchArg}){
     this.field = field;
     this.value = this.constructor.parseValue(value);
     this.operator = operator;
     this.searchArg = searchArg
   }

   static parseValue(val){
     if(val!==undefined)
     {
       if(val.type === "Array")
       {
         return val.value.split(",");
       }else{
         return val.value;
       }
     }
   }

   toSequelize(){
     let searchArgsInSequelize = {};

     if(this.searchArg === undefined && this.field === undefined)
     {
       searchArgsInSequelize['$'+this.operator] = this.value;

     }else if(this.searchArg === undefined)
     {
       searchArgsInSequelize[this.field] = {
          ['$'+this.operator] : this.value
       };
     }else if(this.field === undefined){
       searchArgsInSequelize['$'+this.operator] = this.searchArg.map(sa => {
         let new_sa = new searchArg(sa);
         return new_sa.toSequelize();
       });
     }else{
        searchArgsInSequelize[this.field] = {
          ['$'+this.operator] : this.searchArg.map(sa => {
            let new_sa = new searchArg(sa);
            return new_sa.toSequelize();
          })
        }
     }

     return searchArgsInSequelize;
   }
 };


 module.exports = {

   people: function(){
    return person.findAll();
  },

  readAll: function({input}){
    let arg = new searchArg(input);
    let arg_sequelize = arg.toSequelize();
    return person.findAll({where: arg_sequelize});

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
