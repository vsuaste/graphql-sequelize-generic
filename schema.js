/*
  GraphQL Schema Definition
*/
module.exports = `
type Person{
    firstName: String!
    lastName: String
    email: String!
  }

  type Query{
    people: [Person]
    readOne(id: ID): Person!
  }

  type Mutation{
    addPerson(firstName: String!, lastName: String, email: String!): Person!
    deletePerson(id: ID!): String!
    updatePerson(id: ID!, firstName: String, lastName: String, email: String): Person!
  }
`
