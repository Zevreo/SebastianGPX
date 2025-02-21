import { buildSchema } from "graphql";

const schema = buildSchema(`
    type Query {
      people: [Person]
      person(id: ID!): Person
    }
  
    type Mutation {
      addPerson(
        name: String!,
        fatherLastName: String!,
        motherLastName: String!,
        address: String!,
        phone: String!
      ): Person
      updatePerson(
        id: ID!,
        name: String,
        fatherLastName: String,
        motherLastName: String,
        address: String,
        phone: String
      ): Person
      deletePerson(id: ID!): String
    }
  
    type Person {
      id: ID
      name: String
      fatherLastName: String
      motherLastName: String
      address: String
      phone: String
    }
  `);

export default schema;
