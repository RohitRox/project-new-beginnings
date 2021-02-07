import { Request, Response } from "express"

import BaseController from "./base"
import logger from "../lib/logger"
import AppError from "../lib/error"

class UsersController extends BaseController {
  constructor(){
    super()
  }

  get = (req: Request, res: Response) => {
    try {
      
    } catch (e) {
      return this.errorResponse(res, e)
    }
  }
  
  create = (req: Request, res: Response) => {
    try {

    } catch (e) {
      return this.errorResponse(res, e)
    }
  }

  update = (req: Request, res: Response) => {
    try {

    } catch (e) {
      return this.errorResponse(res, e)
    }
  }

  delete = (req: Request, res: Response) => {
    try {

    } catch (e) {
      return this.errorResponse(res, e)
    }
    
  }
}

export default new UsersController()