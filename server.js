 var express = require('express');
 var path = require('path');
 var graphqlHTTP = require('express-graphql');
 var {buildSchema} = require('graphql');
 var resolversPerson = require('./resolvers/person');
 var resolversDog = require('./resolvers/dog');
 var mergeSchema = require('./utils/merge-schemas');

 var node_acl = require('acl');
 var {aclRules} = require('./acl_rules');
 var acl = new node_acl(new node_acl.memoryBackend());

 /* set authorization rules from file acl_rules.js */
 acl.allow(aclRules);

 /* relationships */
 require('./models/relationships');

 /* Schema */
var merged_schema = mergeSchema( path.join(__dirname, './schemas'));
var Schema = buildSchema(merged_schema);

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
   updateDog: resolversDog.updateDog,
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
