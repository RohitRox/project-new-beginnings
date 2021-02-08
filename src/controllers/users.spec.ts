import { Request, Response } from 'express'

import UsersController from './users'
import User from '../models/user'

const MockUser = jest.fn()
jest.mock("../models/user", () => {
  function F () {
    return MockUser()
  }
  F.get = jest.fn()
  return F
})

afterEach(() => {
  jest.clearAllMocks()
})

const mockResponse = () => {
  let res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res as Response;
};

const mockRequest = (params = {}, body = {}) => ({
  params,
  body,
} as Request);

describe("UsersController", () => {
  describe("get", () => {
    it("gets user from User model and returns user json", () => {
      const user_id = '123'
      const req = mockRequest({ user_id })
      const res = mockResponse()

      const user = { id: user_id, phone_number: "123456789" }
      const getListen = jest.spyOn(User, 'get')
      getListen.mockImplementation(() => {
        return { toJSON: () => user } as User
      })

      UsersController.get(req, res)

      expect(getListen).toHaveBeenCalledWith(user_id)
      expect(res.json).toHaveBeenCalledWith(user)
    })
  })

  describe("create", () => {
    it("gets user from User model and returns user json", async () => {
      const userArg = {
        id: "ABC123",
        phone_number: "123456789",
        date_of_birth: "2001-03-02",
        address: {
          zip: "RG13BE",
          address_line_1: "Abbey Road",
          address_line_2: ""
        }
      }
      const req = mockRequest({}, userArg)
      const res = mockResponse()

      const saveListenFn = jest.fn()

      MockUser.mockImplementation(() => {
        return {
          save: saveListenFn,
          toJSON() { return userArg },
        }
      })

      await UsersController.create(req, res)

      expect(saveListenFn).toHaveBeenCalled()
      expect(res.json).toHaveBeenCalledWith({
        message: "User created",
        user: userArg
      })
    })
  })

  describe("update", () => {
    it("gets user from User model and returns user json", () => {
      const userArg = {
        id: "ABC123",
        phone_number: "123456789",
        date_of_birth: "2001-03-02",
        address: {
          zip: "RG13BE",
          address_line_1: "Abbey Road",
          address_line_2: ""
        }
      }
      const req = mockRequest({}, userArg)
      const res = mockResponse()

      const updateListenFn = jest.fn()
      const getListen = jest.spyOn(User, 'get')
      getListen.mockImplementation(() => {
        return {
          update(args: any) { updateListenFn() },
          toJSON() { return userArg },
        } as User
      })

      UsersController.update(req, res)

      expect(updateListenFn).toHaveBeenCalled()
      expect(res.json).toHaveBeenCalledWith({
        message: "User updated",
        user: userArg
      })
    })
  })

  describe("delete", () => {
    it("gets user from User model and returns user json", () => {
      const user_id = '123'
      const req = mockRequest({ user_id })
      const res = mockResponse()

      const deleteFn = jest.fn()
      const getListen = jest.spyOn(User, 'get')
      getListen.mockImplementation(() => {
        return { delete: () => { deleteFn() } } as User
      })

      UsersController.delete(req, res)

      expect(deleteFn).toHaveBeenCalled()
    })
  })
})