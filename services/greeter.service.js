'use strict'

module.exports = {
  name: 'greeter',

  /**
  * Service settings
  */
  settings: {},

  /**
   * * Service dependencies
   * */
  dependencies: [],

  /**
   * * Actions
  */
  actions: {
    hello: {
      graphql: {
          query: "hello: String"
      },
      handler(ctx) {
          return "Hello Moleculer!"
      }
    },
    welcome: {
        params: {
            name: "string"
        },
        graphql: {
            mutation: "welcome(name: String!): String"
        },
        handler(ctx) {
            return `Hello ${ctx.params.name}`;
        }
    }
  },

  /**
   * * Events
   * */
  events: {},

  /**
   * * Methods
   * */
  methods: {},

  /**
   * * Service created lifecycle event handler
   * */
  created () {},

  /**
   * * Service started lifecycle event handler
   * */
  started () {},

  /**
   * * Service stopped lifecycle event handler
   * */
  stopped () {}
}
