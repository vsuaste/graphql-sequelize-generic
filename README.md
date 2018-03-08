# graphql-sequelize-generic
Example of server using sequelize and graphql with the intention that most of the code
can be generated automatically.

## Files
server.js    ----- >  only contains server setup

connection.js ----- > credentials for the database

crud.js ----- > class for basic CRUD operations, constructor receives a model

### Given a model the next files will be generated:

model.js

resolvers.js

## TODO
- [ ] Function for copy resolver to root
- [ ] Generic names for basic resolvers
- [ ] Search arg

