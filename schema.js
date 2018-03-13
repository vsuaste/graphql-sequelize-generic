/*
  GraphQL Schema Definition
*/
module.exports = `
type Person{
    firstName: String!
    lastName: String
    email: String!
  }

  enum PersonField{
    id
    firstName
    lastName
    email
  }

  enum PersonOperator{
    like
    or
    and
    eq
    between
    in
  }

  input searchArgInput{
    field: PersonField
    value: String
    operator: PersonOperator
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
