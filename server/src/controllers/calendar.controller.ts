import { Router, Request, Response } from "express";

export class CalendarController {
  public path = "/calendar";
  public router = Router();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path, this.getASampleCalendar);
  }

  getASampleCalendar = (req: Request, res: Response) => {
    return res.json({
      calendar: [
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
    });
  };
}
