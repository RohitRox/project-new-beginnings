import { mainModule } from 'process'
import MemoryStore from './memory_store'

describe("MemoryStore", () => {
  let ms: MemoryStore
  const item = { id: "id-1", prop1: "prop-1" }

  beforeAll(() => {
    ms = new MemoryStore()
    ms.create(item.id, item)
  })

  afterEach(() => {
    ms.flush()
  })

  describe("find", () => {
    describe("when item exists", () => {
      it("return item and item props", () => {
        const find = ms.find(item.id)

        expect(find).toEqual(item)
      })
    })

    describe("when item does not exist", () => {
      it("throws error", () => {
        expect(() => { ms.find("weird-id") }).toThrowError()
      })
    })
  })

  describe("create", () => {
    describe("when item already exist", () => {
      it("throws error", () => {
        const item1 = { id: "id-11", prop1: "prop-1" }
        ms.create(item1.id, item1)

        expect(() => { ms.create(item1.id, {}) }).toThrowError()
      })
    })

    describe("when item does not exist", () => {
      it("adds to store", () => {
        const item1 = { id: "id-11", prop1: "prop-1" }
        ms.create(item1.id, item1)
        const find = ms.find(item1.id)

        expect(find).toEqual(item1)
      })
    })
  })

  describe("update", () => {
    describe("when item exist", () => {
      it("updates data", () => {
        const item1 = { id: "id-11", prop1: "prop-1" }
        ms.create(item1.id, item1)

        let itemUpdated = { id: "id-11", prop1: "prop-2" }
        ms.update(item1.id, itemUpdated)

        const find = ms.find(item1.id)

        expect(find).toEqual(itemUpdated)
      })
    })

    describe("when item does not exist", () => {
      it("throws error", () => {
        expect(() => { ms.update("weird-id", {}) }).toThrowError()
      })
    })
  })

  describe("delete", () => {
    it("deletes data for given id", () => {
      const item1 = { id: "id-11", prop1: "prop-1" }
      ms.create(item1.id, item1)

      ms.delete(item1.id)

      expect(() => { ms.find(item1.id) }).toThrowError()
    })
  })
})