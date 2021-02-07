import { Response } from "express"

import logger from "../lib/logger"
import AppError from "../lib/error"

export default class BaseController {
  errorResponse(res: Response, err: Error) {
    logger.error(err)

    if (err instanceof AppError) {
      return res.status(500).send({ message: err.message });
    } else {
      return res.status(500).send({ message: "Oops! Something went Wrong. Please try again later." });
    }

  }
}