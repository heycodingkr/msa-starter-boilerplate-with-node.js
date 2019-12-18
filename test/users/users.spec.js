'use strict'

const { ServiceBroker } = require('moleculer')
const { ValidationError, ServiceNotFoundError, MoleculerClientError } = require('moleculer').Errors
const TestService = require('../../services/users.service')
const jwt 			= require("jsonwebtoken");
const _ = require('lodash')
describe("Test 'users' service", () => {
  const broker = new ServiceBroker({ logger: false })  
  broker.createService(TestService)
  const userService = _.find(broker.services,{ name: "users" })
  beforeAll(() => broker.start())
  afterAll(() => broker.stop())
  const removeUserByEmail = async (email) => {
    const usersToRemove = await broker.call("users.find",{ email: email })
    usersToRemove.map((user) => broker.call("users.remove",{ id:  user._id}))
    await broker.call("users.find",{ email: 'test@gmail.com' })    
  }

  describe("Test 'user service' is available", () => {
    it("should be started service", () => {
      expect(broker.started).toBeTruthy()
    })
    it("should be not throw ServiceNotFoundError", () => {
      expect(broker.call('users.signup')).rejects.not.toBeInstanceOf(ServiceNotFoundError)
    })
  })
  describe("Test 'users.signup' action", () => {
    
    it("should have property with 'validateEntity'", () => {
      expect(_.find(broker.services,{ name: "users" })).toHaveProperty('validateEntity')
    })    
    it("should return with token string", async () => {
      const email = 'test@gmail.com'      
      removeUserByEmail(email)      
      expect(broker.call('users.signup', { email: email, password: 'asdf1004' })).resolves.toContain('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9')
    })
    it("should reject an ValidationError", () => {
      expect(broker.call('users.signup', {})).rejects.toBeInstanceOf(ValidationError)
    })    
  })
  describe("Test 'JWT generate' method", () => {
    it("should have generatedJWT method in service", () => {
      expect(userService).toHaveProperty('generatedJWT')
    })

    it("should generate jwt token by generatedJWT method", () => {
      const userEntity = {
        email: 'asdf10232@gmail.com',
        password: 'asdf10023'
      }
      expect(userService.generatedJWT(userEntity)).toContain('yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9')
    })
  })
  
  describe("Test 'users.signin' action", () => {

    it("should rejects by not found user", () => {            
      const userEntity = {
        email: 'easycodingkr@gmail.com',
        password: 'asdf1002312'
      }
      removeUserByEmail(userEntity.email) // delete email 
      expect(broker.call('user.signin', userEntity)).rejects.toBeInstanceOf(MoleculerClientError)
    })
    it("should reject an ValidationError", () => {
      expect(broker.call('users.signup', {})).rejects.toBeInstanceOf(ValidationError)
    })       
    it("should signin returned a token ", () => {
      // todo signup with email/password
      // todo signin with email/password
      // remove user by email.
    })
  })
})
