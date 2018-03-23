module.exports = `

  type Dog{
    id: ID
    name: String!
    breed: String
    personId: String
    owner: Person
    person: Person
  }

  enum DogField{
    name
    breed
  }

  input searchDogInput{
    field: DogField
    value: typeValue
    operator: Operator
    searchArg: [searchDogInput]
  }

  type Query{
    readDog(id:ID): Dog
    dogs : [Dog]
  }

  type Mutation{
    addDog(name: String!, breed: String, personId: ID): Dog
    updateDog(id: ID!,name: String, breed: String, personId: ID): Dog
  }

`;
