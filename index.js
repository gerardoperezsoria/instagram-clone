/*
import express from 'express';
import bodyParser from 'body-parser';
import { ApolloServer, graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';

import typeDefs from './schemas'
import resolvers from './resolvers'

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });


const PORT = 3000;

const app = express();

app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));
app.get('/graphiql',graphiqlExpress({endpointURL: '/graphql'}));

app.listen(PORT);

*/

const connect = require('connect');
const { ApolloServer, gql } = require('apollo-server-express');
const query = require('qs-middleware');

import typeDefs from './schemas'
import resolvers from './resolvers'

/*
// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`;
 
// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};
*/

const server = new ApolloServer({ typeDefs, resolvers });
 
const app = connect();
const path = '/graphql';
 
app.use(query());
server.applyMiddleware({ app, path });
 
app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);