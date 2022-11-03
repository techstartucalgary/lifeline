import { Application, Router } from "express";
import Controller from "./controllers/controller.interface";
import cors from "cors";
import express = require("express");

export class App {
  public app: Application;
  public port: Number;

  constructor(controllers: Array<Controller>, port: Number) {
    this.app = express();
    this.app.use(cors());
    this.port = port;
    this.initializeControllers(controllers);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }

  private initializeControllers(controllers: Array<Controller>) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }
}
