import { Router, Request, Response } from "express";
import Controller from "./controller.interface";

export class CalendarController implements Controller {
  public path = "/calendar";
  public router = Router();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path, this.handleCalendarRequest);
  }

  handleCalendarRequest = (req: Request, res: Response) => {
    var generatedCalendar = this.getGeneratedCalendar()
    return res.json(generatedCalendar);
  };

  getGeneratedCalendar = () => {
    // We can insert all the logic for generating the calendar here
    const sampleCalendar =  
      { calendar: [
        {
          course: "SENG 550",
          assessments: {
            Assignment1: "October 1",
            Assignment2: "October 31",
            Final: "December 13",
          },
        },
        {
          course: "SENG 513",
          assessments: {
            Assignment1: "October 11",
            Assignment2: "October 31",
            Final: "December 23",
          },
        },
      ],
    };

    return sampleCalendar;
  };

}
