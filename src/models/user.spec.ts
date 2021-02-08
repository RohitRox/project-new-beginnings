import User from "./user"
import store from '../store'
import * as g from "../lib/id_generator"

jest.mock('../store')
jest.mock('../lib/id_generator')

afterEach(() => {
  jest.clearAllMocks()
})

describe("User", () => {
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

  describe("errors", () => {
    it("validates user", () => {
      const userArgInvalid = {
        phone_number: "1324",
        date_of_birth: "201-03-02",
        address: {
          zip: "",
          address_line_1: "",
          address_line_2: ""
        }
      }
      const user = new User(userArgInvalid)
      const errs = user.errors()

      expect(errs).toContain('Invalid phone number')
      expect(errs).toContain('Invalid date format')
      expect(errs).toContain('Post/Zip code is required')
      expect(errs).toContain('Address Line 1 is required')
    })
  })

  describe("toJSON", () => {
    it("returns user attributes", () => {
      const user = new User(userArg)

      expect(user.toJSON()).toEqual(userArg)
    })
  })

  describe("get", () => {
    describe("when item exists in store", () => {
      it("returns new user", () => {
        const mockfindListener = jest.spyOn(store, 'find')
        mockfindListener.mockImplementation(() => {
          return userArg
        })
        const user = User.get(userArg.id)
        
        expect(mockfindListener).toHaveBeenCalledWith(userArg.id)
        expect(user.id).toEqual(userArg.id)
      })
    })

    describe("when item does exist in store", () => {
      it("throws error", () => {
        const mockfindListener = jest.spyOn(store, 'find')
        mockfindListener.mockImplementation(() => {
          throw new Error("Oops")
        })        
        expect(() => {  User.get(userArg.id) }).toThrowError(`User with id ${userArg.id} cannot be found`)
      })
    })
  })

  describe("save", () => {
    describe("when attributes are invalid", () => {
      it("throws error", async () => {
        const userArgInvalid = {
          phone_number: "1324",
          date_of_birth: "201-03-02",
          address: {
            zip: "",
            address_line_1: "",
            address_line_2: ""
          }
        }
        const user = new User(userArgInvalid)
        
        await expect(user.save).rejects.toThrow("Invalid phone number, Invalid date format, Post/Zip code is required, Address Line 1 is required")
      })
    })

    it("calls store create with new id", async () => {
      const arg = Object.assign({}, userArg, {id: undefined})
      
      const mockSaveListener = jest.spyOn(store, 'create')
      mockSaveListener.mockImplementation(() => {
        return arg
      })
      const mockUid = jest.spyOn(g, 'uid')
      mockUid.mockImplementation(() => {
        return Promise.resolve('123abc')
      })

      const user = new User(arg)
      await user.save()

      expect(mockSaveListener).toHaveBeenCalledWith('123abc', Object.assign({}, arg, { id: '123abc'}))
    })
  })

  describe("update", () => {
    describe("when update params are invalid", () => {
      it("throws error", () => {
        const user = new User(userArg)
        
        const userArgInvalid = {
          phone_number: "1324",
          date_of_birth: "201-03-02",
          address: {
            zip: "RG13BE",
            address_line_1: "Abbey Rd",
            address_line_2: ""
          }
        }

        expect(() => { user.update(userArgInvalid) }).toThrowError("Invalid phone number, Invalid date format")
      })
    })

    it("calls store update and update user args", () => {
      const user = new User(userArg)
      const userArgValid = {
        phone_number: "987654321",
        date_of_birth: "2011-03-02",
        address: {
          zip: "RG14BE",
          address_line_1: "Abbey Road",
          address_line_2: ""
        }
      }

      const mockUpdateListener = jest.spyOn(store, 'update')
      mockUpdateListener.mockImplementation(() => {
        return Object.assign({}, userArg, userArgValid)
      })
      user.update(userArgValid)

      expect(mockUpdateListener).toHaveBeenCalledWith(user.id, Object.assign({}, userArg, userArgValid))
    })
  })

  describe("delete", () => {
    it("calls store delete", () => {
      const mockDeleteListener = jest.spyOn(store, 'delete')

      const user = new User(userArg)
      user.delete()

      expect(mockDeleteListener).toHaveBeenCalledWith(user.id)
    })
  })
})

