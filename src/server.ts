import express, { Application, Request, Response, NextFunction } from "express"
import bodyParser from "body-parser"
import pino from "pino-http"
import helmet from "helmet"

import logger from "./lib/logger"
import routes from "./routes"

// new express server application
const server: Application = express()

// server port
const PORT = process.env.PORT || 8000
const SERVICE_PATH = '/api'

// base middlewares
server.use(bodyParser.json())
server.use(helmet())
server.use(pino())

// routes registration
server.use(SERVICE_PATH, routes);

// health check
server.use(`${SERVICE_PATH}/status`, (req: Request, res: Response) => {
  return res.status(200).json({ status: 'All systems go' });
});

// global error handler
server.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(error)
  res.status(500).json({ message: 'Internal server error' });
});

server.listen(PORT, () => {
  logger.info(`Server is running on PORT ${PORT}`)
})
