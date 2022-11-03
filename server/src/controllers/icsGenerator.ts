
let ics = require('ics');
let fs = require('fs');
const exampleICS = "./example.ics"
/*calendar: [
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
  ];
  */

  ics.createEvent({
    title: 'Dinner',
    start: [2022, 12, 15, 6, 30],
    duration: { minutes: 50 }
  }, (error, value) => {
    if(error) {
      console.log(error);
    }
    
    fs.writeFileSync('example.ics', value);
    
    //writeFileSync(`${__dirname}/event.ics`, value);
  });
  