import { Application, Router } from "express";
import { CalendarController } from "./controllers/calendar.controller";

import express = require("express");

export class App {
  public app: Application;
  public port: Number;

  constructor(controllers: Array<CalendarController>, port: Number) {
    this.app = express();
    this.port = port;
    this.initializeControllers(controllers);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }

  private initializeControllers(controllers: Array<CalendarController>) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }
}
