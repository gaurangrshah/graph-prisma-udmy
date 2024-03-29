import '@babel/polyfill';
import { GraphQLServer, PubSub } from 'graphql-yoga';
// GraphQLServer allows us to create a graphql server using the yoga library.
import db from './db';
import { resolvers, fragmentReplacements } from './resolvers/index';
import prisma from './prisma';
// importing here to add to application context

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers, // adds imported resolvers to our application
  context(request) {
    return {
      db, // setting database to context.
      pubsub,  // making pubsub instance accessible to resolvers
      prisma, // makes prisma available to application context.
      request, // allows us to access our custom headers from resolvers
    }
  },
  fragmentReplacements, // exposes fragments to application, same as context, resolvers & typeDefs
});


server.start({ port: process.env.PORT || 4001 }, () => {
  // process.env.PORT = heroku assigned port for production
  // 4001 = default local port for development
  console.log(`served up: http://localhost:${port}`);
});
