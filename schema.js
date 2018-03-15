/*
  GraphQL Schema Definition
*/
module.exports = `
type Person{
    firstName: String!
    lastName: String
    email: String!
    token: String
    role: String
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

  input personValue{
    type: String
    value: String!
  }

  input searchArgInput{
    field: PersonField
    value: personValue
    operator: PersonOperator
    searchArg: [searchArgInput]
  }

  type Query{
    people: [Person]
    readOne(id: ID): Person!
    readAll(input: searchArgInput): [Person]
  }

  type Mutation{
    addPerson(firstName: String!, lastName: String, email: String!, password: String!, role: String): Person!
    deletePerson(id: ID!): String!
    updatePerson(id: ID!, firstName: String, lastName: String, email: String): Person!
  }
`
