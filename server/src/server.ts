import { App } from "./app";
import { CalendarController } from "./controllers/calendar.controller";


const port: number = 3001;

const app = new App([new CalendarController()],port);

app.listen();

  