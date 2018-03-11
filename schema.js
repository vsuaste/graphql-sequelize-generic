/*
  GraphQL Schema Definition
*/
module.exports = `
type Person{
    firstName: String!
    lastName: String
    email: String!
  }

  enum Operator{
    like
    or
    and
    eq
  }

  input searchArgInput{
    field: String
    value: String
    operator: Operator
    searchArg: [searchArgInput]
  }

  type Query{
    people: [Person]
    readOne(id: ID): Person!
    readAll(input: searchArgInput): [Person]
  }

  type Mutation{
    addPerson(firstName: String!, lastName: String, email: String!): Person!
    deletePerson(id: ID!): String!
    updatePerson(id: ID!, firstName: String, lastName: String, email: String): Person!
  }
`
