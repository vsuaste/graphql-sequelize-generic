module.exports = `

  type Person{
    firstName: String!
    lastName: String
    email: String!
    token: String
    role: String
    dogs: [Dog]
    filterDogs(search: searchDogInput): [Dog]
  }

  enum PersonField{
    id
    firstName
    lastName
    email
  }

  input searchPersonInput{
    field: PersonField
    value: typeValue
    operator: Operator
    searchArg: [searchPersonInput]
  }

  type Query{
    people: [Person]
    readOne(id: ID): Person
    readAll(input: searchPersonInput): [Person]
  }

  type Mutation{
    addPerson(firstName: String!, lastName: String, email: String!, password: String!, role: String): Person!
    deletePerson(id: ID!): String!
    updatePerson(id: ID!, firstName: String, lastName: String, email: String): Person!
  }

`;
