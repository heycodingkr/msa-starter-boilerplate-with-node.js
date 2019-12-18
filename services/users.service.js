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
         let { email , password} = ctx.params         
         return this.validateEntity({email: email, password: password})
         .then(async() => {
          const result = await this.adapter.find({email: email })
          if(result.length > 0) {
            throw new MoleculerClientError("cant not create a user", 501, "cant create user bcuz user already signed up", { email: email});
          }
          return result
         })
         .then(async () => {
           const result = await this.adapter.insert({query: {email: email, password: password}})
           if(result) {
             ctx.meta.$statusCode = 201;
             return this.generatedJWT(result)
           } else {
             throw new MoleculerClientError("cant not create a user", 501, "cant create user", {email: email, password: password});
           }
          })         
       }
     },


      /**
        *  SignIn with email & password
        *
        *  @actions
        *  @param {Object} email - Email
        *  @param {Object} password - Password
        *  @returns {Object}  Logged in user with token
        */
      signin: {
        params: {
          email: { "type": "string" },
          password: { "type": "string"}
        },
        handler(ctx) {
          const { email , password } = ctx.params          
          return this.validateEntity({email: email, password: password}).then(
            async () =>{
              const result = await this.adapter.find({query: { email: email}})
              if(result.length < 1) {
                throw new MoleculerClientError("user email does not exist", 501, "user does not exist", {email: email});
              }
              return this.generatedJWT(result)
            }
          )
        }
      },          
  },

  /**
   * * Events
   * */
  events: {},

  /**
   * * Methods
   * */
  methods: {

    /**
     * make a jwt token by user entity
     * @param {*} entity user entity
     */
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
