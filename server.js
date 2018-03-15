 var express = require('express');
 var graphqlHTTP = require('express-graphql');
 var {buildSchema} = require('graphql');
 var resolvers = require('./resolvers');
 var schema = require('./schema');

 var node_acl = require('acl');
 //var acl_rules = require('./acl_rules');
 var acl = new node_acl(new node_acl.memoryBackend());

/*
ACL rules
  TODO: change to separate file
*/
 acl.allow([{
   roles: 'administrator',
   allows: [{
     resources: 'person',
     permissions: ['get','put', 'delete','update']
   }]
 },
 {
   roles: 'guest',
   allows: [{
     resources: 'person',
     permissions: ['get']
   }]
 }]);

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
