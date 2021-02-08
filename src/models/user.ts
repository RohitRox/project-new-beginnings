import store from "../store"
import AppError from "../lib/error"
import { uid } from "../lib/id_generator"
import logger from "../lib/logger"

interface INewUser {
  id?: string
  phone_number: string
  date_of_birth: string
  address: {
    zip: string
    address_line_1: string
    address_line_2: string
  }
}

interface IUser extends INewUser {
  id: string
}

export default class User implements IUser {
  id = ""
  phone_number: string
  date_of_birth: string
  address: {
    zip: string
    address_line_1: string
    address_line_2: string
  }

  constructor(arg: INewUser) {
    this.phone_number = arg.phone_number || ""
    this.date_of_birth = arg.date_of_birth || ""
    this.address = {
      zip: arg.address?.zip || "",
      address_line_1: arg.address?.address_line_1 || "",
      address_line_2: arg.address?.address_line_2 || "",
    }

    if (arg.id) {
      this.id = arg.id.trim().toUpperCase()
    }
  }

  errors() {
    let errs = []

    if (this.phone_number.length != 9) {
      errs.push("Invalid phone number")
    }

    if (!this.date_of_birth.match(/^\d{4}-\d{1,2}-\d{1,2}$/)) {
      errs.push("Invalid date format")
    }

    if (!this.address.zip.length) {
      errs.push("Post/Zip code is required")
    }

    if (!this.address.address_line_1.length) {
      errs.push("Address Line 1 is required")
    }

    return errs
  }

  save = async () => {
    const errs = this.errors()
    if (errs.length > 0) {
      throw new AppError(errs.join(", "))
    }
    
    this.id = await uid()
    const { id, phone_number, date_of_birth, address } = this
    store.create<IUser>(id, {
      id,
      phone_number,
      date_of_birth,
      address,
    })
  }

  update(args: INewUser) {
    const u = new User(Object.assign({}, this.toJSON(), args))
    const errs = u.errors()

    if (errs.length > 0) {
      throw new AppError(errs.join(", "))
    }

    const { phone_number, date_of_birth, address } = u
    const id = this.id

    store.update<IUser>(id, {
      id,
      phone_number,
      date_of_birth,
      address,
    })

    this.phone_number = phone_number
    this.date_of_birth = date_of_birth
    this.address = address
  }

  delete() {
    store.delete((this as IUser).id)
  }

  toJSON() {
    const { id, phone_number, date_of_birth, address } = this
    return {
      id,
      phone_number,
      date_of_birth,
      address,
    }
  }

  static get(id: string) {
    try {
      const props = store.find<IUser>(id.trim().toUpperCase())
      return new User(props)
    } catch (e) {
      throw new AppError(`User with id ${id} cannot be found`)
    }
  }
}
