const { ApolloServer, gql } = require("apollo-server-lambda");

const typeDefs = gql`
  type Query {
    hello: String
  }

  type Mutation {
      singleUpload(file: Upload!): File
  }

  type File {
      filename: String
      encoding: String
  }
`;

const resolvers = {
  Query: {
    hello: (parent, args, context) => {
        console.log("heyyyyyyy")
        return "Hello, world!";
    }
  },
  Mutation: {
    singleUpload: async (parent, args, context) => {
        const file = await args.file
        console.log("hiyaaaaa")
        console.log(file)
        return file
      }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

exports.handler = server.createHandler({
    cors: {
        origin: '*',
        credentials: true,
      }
});