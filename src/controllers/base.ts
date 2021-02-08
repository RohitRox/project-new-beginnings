import { Response } from "express"

import logger from "../lib/logger"
import AppError from "../lib/error"

export default class BaseController {
  errorResponse(res: Response, err: Error) {
    logger.error(err)

    if (err instanceof AppError) {
      res.status(res.statusCode || 500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Oops! Something went Wrong. Please try again later." });
    }

  }
}