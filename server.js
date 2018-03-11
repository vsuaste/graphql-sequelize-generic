 var express = require('express');
 var graphqlHTTP = require('express-graphql');
 var {buildSchema} = require('graphql');
 var resolvers = require('./resolvers');
 var schema = require('./schema');

 /* Schema */
var Schema = buildSchema(schema);

/* Resolvers
  TODO: function to just copy the resolvers to root object
*/
 var root = {
   people: resolvers.people,
   readOne: resolvers.readOne,
   readAll: resolvers.readAll,
   addPerson: resolvers.addPerson,
   deletePerson: resolvers.deletePerson,
   updatePerson: resolvers.updatePerson
 };

 /* Server */
 const APP_PORT = 3000;
 const app = express();

 app.use('/graphql', graphqlHTTP({
   schema: Schema,
   rootValue: root,
   pretty: true,
   graphiql: true
 }));

 app.listen(APP_PORT, ()=>{
   console.log(`App listening on port ${APP_PORT}`);
 });
