import { EventEmitter } from "events";
import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import express from "express";
import logger from "./config/logger";
import helmet from "helmet";
import Controller from "./interfaces/controller.interface";
import RequestWithUser from "./interfaces/request.interface";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./config/openapi.json";
import errorMiddleware from "./middleware/error.middleware";
import noCache from 'nocache';
import cors from 'cors';
import dataConfig from './config/dataconfig';

class App extends EventEmitter {
    public app: express.Application;
    constructor(controllers: Controller[]) {
        super();
        this.app = express();
        this.app.use(cors())

        this.initializeSecurity();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
        this.initializeApiDocs();
    }

    public listen() {
      this.app.listen(dataConfig.PORT, () => {
       logger.info(`App listening on the port ${dataConfig.PORT}`);
      });
    }
  private initializeSecurity() {
    this.app.use(noCache());
    this.app.use(helmet.frameguard());
    this.app.use(helmet.hidePoweredBy());
    this.app.use(helmet.hsts());
    this.app.use(helmet.ieNoOpen());
    this.app.use(helmet.noSniff());
    this.app.use(helmet.xssFilter());
  }
  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
    this.app.use(compression());

    // use for computing processing time on response
    this.app.use((request: RequestWithUser, response: express.Response, next: express.NextFunction) => {
      request.startTime = Date.now();
      next();
    });
  }

  private initializeApiDocs() {
    this.app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

    /**
     * Iterates through controllers in services/index and adds their routes/handlers to app
     * @param controllers
     */
    private initializeControllers(controllers: Controller[]) {
        controllers.forEach((controller) => {
            this.app.use("/", controller.router);
        });
    }

}

export default App;