import { IStore } from './interface'

let list: {[id: string]: Object} = {}

class MemoryStore implements IStore {
  find <T>(id: string): T {
    if (list[id]) {
      return list[id] as T
    } 
    throw "Record not found"
  }

  create <T>(id: string, props: T) {
    if (list[id]) {
      throw "Record already exists"
    }
    list[id] = props
  }

  update <T>(id: string, props: T) {
    if (!list[id]) {
      throw "Record does not exist"
    }
    list[id] = props
  }

  delete (id: string) {
    delete list[id]
  }

  flush() {
    list = {}
  }
}

export default MemoryStore