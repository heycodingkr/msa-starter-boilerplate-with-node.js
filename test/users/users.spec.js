'use strict'

const { ServiceBroker } = require('moleculer')
const { ValidationError, ServiceNotFoundError } = require('moleculer').Errors
const TestService = require('../../services/users.service')
const jwt 			= require("jsonwebtoken");
const _ = require('lodash')
describe("Test 'users' service", () => {
  const broker = new ServiceBroker({ logger: false })  
  broker.createService(TestService)

  beforeAll(() => broker.start())
  afterAll(() => broker.stop())

  describe("Test 'users.signup' action", () => {
    it("should be started service", () => {
      expect(broker.started).toBeTruthy()
    })
    it("should be not throw ServiceNotFoundError", () => {
      expect(broker.call('users.signup')).rejects.not.toBeInstanceOf(ServiceNotFoundError)
    })
    it("should have property with 'validateEntity'", () => {
      expect(_.find(broker.services,{ name: "users" })).toHaveProperty('validateEntity')
    })    
    it("should return with token string", async () => {    
      const usersToRemove = await broker.call("users.find",{ email: 'test@gmail.com' })
      usersToRemove.map((user) => broker.call("users.remove",{ id:  user._id}))
      await broker.call("users.find",{ email: 'test@gmail.com' })      
      expect(broker.call('users.signup', { email: 'test@gmail.com', password: 'asdf1004' })).resolves.toContain('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9')
    })
    it("should reject an ValidationError", () => {
      expect(broker.call('users.signup', {})).rejects.toBeInstanceOf(ValidationError)
    })
  })
  
})
