import { Request, Response } from "express"

import BaseController from "./base"
import User from '../models/user'

class UsersController extends BaseController {
  constructor(){
    super()
  }

  get = (req: Request, res: Response) => {
    try {
      const id = req.params.user_id

      const user = User.get(id)

      res.json(user.toJSON())
    } catch (e) {
      res.status(404)
      this.errorResponse(res, e)
    }
  }
  
  create = async (req: Request, res: Response) => {
    try {
      const { phone_number, date_of_birth, address } = req.body as User
      
      const user = new User({ phone_number, date_of_birth, address })

      await user.save()

      res.json({ message: "User created", user: user.toJSON() })
    } catch (e) {
      res.status(422)
      this.errorResponse(res, e)
    }
  }

  update = (req: Request, res: Response) => {
    try {
      const user = User.get(req.params.user_id)

      const { phone_number, date_of_birth, address } = req.body as User
      user.update({ phone_number, date_of_birth, address })

      res.json({ message: "User updated", user: user.toJSON() })
    } catch (e) {
      res.status(422)
      this.errorResponse(res, e)
    }
  }

  delete = (req: Request, res: Response) => {
    try {
      const user = User.get(req.params.user_id)
      user.delete()

      res.json({ message: "User deleted" })
    } catch (e) {
      res.status(422)
      this.errorResponse(res, e)
    }
    
  }
}

export default new UsersController()