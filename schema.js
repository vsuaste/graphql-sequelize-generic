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
    dogs: [Dog]
    filterDogs(search: searchArgInput): [Dog]
  }

  type Dog{
    id: ID
    name: String!
    breed: String
    personId: String
    owner: Person
    person: Person
  }

  enum PersonField{
    id
    firstName
    lastName
    email
  }

  enum DogField{
    name
    breed
  }

  enum SearchField{
    id
    firstName
    lastName
    email
    name
    breed
  }

  enum Operator{
    like
    or
    and
    eq
    between
    in
  }

  input typeValue{
    type: String
    value: String!
  }

  input searchArgInput{
    field: SearchField
    value: typeValue
    operator: Operator
    searchArg: [searchArgInput]
  }

  type Query{
    people: [Person]
    readOne(id: ID): Person
    readAll(input: searchArgInput): [Person]
    readDog(id:ID): Dog
    dogs : [Dog]
  }

  type Mutation{
    addPerson(firstName: String!, lastName: String, email: String!, password: String!, role: String): Person!
    deletePerson(id: ID!): String!
    updatePerson(id: ID!, firstName: String, lastName: String, email: String): Person!
    addDog(name: String!, breed: String, personId: ID): Dog
    updateDog(id: ID!,name: String, breed: String, personId: ID): Dog
  }
`
