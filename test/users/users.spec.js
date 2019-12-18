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
    const usersToRemove = await broker.call("users.find",{query:{ email: email }})    
    await Promise.all( // https://www.taniarascia.com/promise-all-with-async-await/
      usersToRemove.map(async user => {        
        await broker.call("users.remove",{ id:  user._id})
      })
    )    
    //    const result = await broker.call("users.find",{query: { email: email }})    
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
      const email = 'test1@gmail.com'      
      await removeUserByEmail(email)      
      expect(broker.call('users.signup', { email: email, password: 'asdf1004' })).resolves.toContain('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9')
    })

    it("should reject by client error if an user already registered", async () =>{
      const email = 'tessdft@gmail.com'       
      const user = await broker.call("users.find",{query:{ email: email }})
      await removeUserByEmail(email)
      await expect(broker.call('users.signup', { email: email, password: 'asdf1004' })).resolves.toContain('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9')
      expect(broker.call('users.signup', { email: email, password: 'asdf1004' })).rejects.toBeInstanceOf(MoleculerClientError)
    })
    it("should reject an ValidationError", () => {
      expect(broker.call('users.signup', {})).rejects.toBeInstanceOf(ValidationError)
    })    
  })
  
  
  describe("Test 'users.signin' action", () => {

    it("should rejects by not found user", async () => {            
      const userEntity = {
        email: 'test32123@gmail.com',
        password: 'asdf1002312'
      }
      await removeUserByEmail(userEntity.email) // delete email 
      expect(broker.call('users.signin', { email: userEntity.email, password: userEntity.password })).rejects.toBeInstanceOf(MoleculerClientError)
    })
    it("should reject an ValidationError", () => {
      expect(broker.call('users.signup', {})).rejects.toBeInstanceOf(ValidationError)
    })       
    it("should returned a token if it is succeed in login", async () => {
      const userEntity = {
        email: 'test32@gmail.com',
        password: 'asdf1002312'
      }
      await removeUserByEmail(userEntity.email)
      await broker.call('users.signup', { email: userEntity.email, password: userEntity.password })
      expect(broker.call('users.signin', { email: userEntity.email, password: userEntity.password })).resolves.toContain("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9")
    })
  })
  describe("Test 'JWT generation' method", () => {
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
})
