 var express = require('express');
 var graphqlHTTP = require('express-graphql');
 var {buildSchema} = require('graphql');
 var resolversPerson = require('./resolvers/person');
 var resolversDog = require('./resolvers/dog');
 var schema = require('./schema');

 var node_acl = require('acl');
 var {aclRules} = require('./acl_rules');
 var acl = new node_acl(new node_acl.memoryBackend());

 /* set authorization rules from file acl_rules.js */
 acl.allow(aclRules);

 /* relationships */
 require('./models/relationships');

 /* Schema */
var Schema = buildSchema(schema);

/* Resolvers
  TODO: function to just copy the resolvers to root object
*/
 var root = {
   people: resolversPerson.people,
   readOne: resolversPerson.readOne,
   readAll: resolversPerson.readAll,
   addPerson: resolversPerson.addPerson,
   deletePerson: resolversPerson.deletePerson,
   updatePerson: resolversPerson.updatePerson,
   //Dog resolvers
   addDog: resolversDog.addDog,
   readDog: resolversDog.readDog,
   dogs: resolversDog.dogs
 };

 /* Server */
 const APP_PORT = 3000;
 const app = express();

 //request is passed as context by default
 app.use('/graphql', graphqlHTTP((req)=> ({
   schema: Schema,
   rootValue: root,
   pretty: true,
   graphiql: true,
   context: {
     request: req,
     acl: acl
   }
 })));


 app.listen(APP_PORT, ()=>{
   console.log(`App listening on port ${APP_PORT}`);
 });
