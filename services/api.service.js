'use strict';

const ApiGateway = require('moleculer-web')
const { ApolloService } = require("moleculer-apollo-server");
module.exports = {
  name: 'api',
  mixins: [
    ApiGateway,
    ApolloService({  
      typeDefs: ``,
            // Global resolvers
      resolvers: {},

            // API Gateway route options
      routeOptions: {
        path: "/graphql",
        cors: false,        
      },      
      serverOptions: {
        tracing: true,
        engine: {
          apiKey: process.env.APOLLO_ENGINE_KEY
            }
      }
    })
  ],
  // More info about settings: https://moleculer.services/docs/0.13/moleculer-web.html
  settings: {
    port: process.env.PORT || 3000,
    routes: [
      {
        path: '/api',
        aliase: {
          // "POST /users/signup": "users.signup",
        },
        whitelist: [
          // Access to any actions in all services under "/api" URL
          '**'
        ],
        bodyParsers: {
          json: {
            strict: false
          },
          urlencoded: {
            extended: false
          }
        }
      }
    ],

    // Serve assets from "public" folder
    assets: {
      folder: 'public'
    }
  }
}
