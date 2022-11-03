import { CalendarController} from '../../controllers/calendar.controller'


const calendarController = new CalendarController();

const hardCodedCalendarValue =  
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

// A test in jest looks something like this
test('adds 1 + 2 to equal 3', () => {
    expect(1+2).toBe(3);
});


// Testing the generateCalendar method of the calendar controller
// We use describe for making a test suite - getting a bundle of all the related tests
describe('Testing the Calendar Controller', () => {
    console.log('Testing the Calendar Controller');

    test('Testing the getGeneratedCalendar method', () => {
        expect(calendarController.getGeneratedCalendar()).toEqual(hardCodedCalendarValue);
        });
  });