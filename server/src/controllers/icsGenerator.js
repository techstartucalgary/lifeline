var ics = require('ics');
var fs = require('fs');
var exampleICS = "./example.ics";
var calendar = [
    {
        course: "SENG 550",
        assessments: {
            Assignment1: "October 1",
            Assignment2: "October 31",
            Final: "December 13"
        }
    },
    {
        course: "SENG 513",
        assessments: {
            Assignment1: "October 11",
            Assignment2: "October 31",
            Final: "December 23"
        }
    },
];
function determineMonth(wordDate) {
    var result = wordDate.trim().split(/\s+/);
    if (result[0].toLowerCase() == "january") {
        return 1;
    }
    else if (result[0].toLowerCase() == "february") {
        return 2;
    }
    else if (result[0].toLowerCase() == "march") {
        return 3;
    }
    else if (result[0].toLowerCase() == "april") {
        return 4;
    }
    else if (result[0].toLowerCase() == "may") {
        return 5;
    }
    else if (result[0].toLowerCase() == "june") {
        return 6;
    }
    else if (result[0].toLowerCase() == "july") {
        return 7;
    }
    else if (result[0].toLowerCase() == "august") {
        return 8;
    }
    else if (result[0].toLowerCase() == "september") {
        return 9;
    }
    else if (result[0].toLowerCase() == "october") {
        return 10;
    }
    else if (result[0].toLowerCase() == "november") {
        return 11;
    }
    else if (result[0].toLowerCase() == "december") {
        return 12;
    }
}
function determineDate(wordDate) {
    var result = wordDate.trim().split(/\s+/);
    console.log(result);
    let date = parseInt(result[1]);
    return date;
}
ics.createEvent({
    title: calendar[0].course,
    start: [2022, determineMonth(calendar[0].assessments.Assignment1), determineDate(calendar[0].assessments.Assignment1), 6, 30],
    duration: { minutes: 50 }
}, function (error, value) {
    if (error) {
        console.log(error);
    }
    fs.writeFileSync('example.ics', value);
    //writeFileSync(`${__dirname}/event.ics`, value);
});
determineDate(calendar[0].assessments.Assignment1);


