
/*
Generic CRUD operations
*/
module.exports = class{

  constructor( model ){
    this.model = model;
    console.log("model created...",this.model.getTableName());
  }

  allItems(){
    return this.model.findAll();
  }

  itemById({id}){
    return this.model.findOne({where: {id: id}});
  }

  addItem(args){
    return this.model.create(args);
  }

  deleteItem({id}){
    return this.model.findById(id)
    .then( found =>{
        return found
        .destroy()
        .then(()=>{return 'Item succesfully deleted';});
    });
  }

  updateItem(args){
    return this.model.findById(id)
      .then( found => {
        return found.update(args)
        .then(()=>{ return person;});
      });
  }
}
