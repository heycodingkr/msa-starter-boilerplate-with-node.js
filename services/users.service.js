'use strict'


const DbService = require("../mixins/db.mixin");
const CacheCleanerMixin = require("../mixins/cache.cleaner.mixin");
const jwt 			= require("jsonwebtoken");
const { MoleculerClientError} = require('moleculer').Errors
module.exports = {
  name: 'users',
  mixins: [
		DbService("users"),
		CacheCleanerMixin([
			"cache.clean.users"			
		])
	],
  /**
  * Service settings
  */
  settings: {
    fields: [ "_id", "email", "password"],
    entityValidator: {
      email: { type: 'email' },
      password: { type: 'string', min: 6 }
    }
  },

  /**
   * * Actions
  */
  actions: {

    /** SignUp a new user
     *
     * @actions
     * @param {Object} user - User Entity
     * @returns {Object} Created entity & token
     */
    
     signup: {
       params: {
         email: { "type": "string" },
         password: { "type": "string"}
       },
       handler(ctx) {
         let email = ctx.params.email
         let password = ctx.params.password
         return this.validateEntity({email: email, password: password})
         .then(async () => {
           const result = await this.adapter.insert({email: email, password: password})
           if(result) {
             ctx.meta.$statusCode = 201;
             return this.generatedJWT(result)
           } else {
            throw new MoleculerClientError("cant not create a user", 501, "cant create user", {email: email, password: password});
           }
          })         
       }
     }

    /**
      *  SignIn with email & password
      *
      *  @actions
      *  @param {Object} email - email
      *  @returns {Object}  Logged in user with token
      */

  },

  /**
   * * Events
   * */
  events: {},

  /**
   * * Methods
   * */
  methods: {
    generatedJWT: function (entity) {
      const today = new Date();
			const exp = new Date(today);
			exp.setDate(today.getDate() + 360);
      const jwtString = jwt.sign({				
				...entity,
				exp: 3600
      }, 'test secret');
      return jwtString
    }
  },

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
