//var ics = require('ics');
const ics = require('ics');

var fs = require('fs');
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
function convert(calendar) {
    var icsEvents = [];
    for(var key in calendar.assessments) {
        if(calendar.assessments.hasOwnProperty(key)) {
            let eventName = calendar.course + " " +  key;
            icsEvents.push({
                title: eventName,
                start: [2022, determineMonth(calendar.assessments[key]),determineDate(calendar.assessments[key]),6,30],
                duration: {minutes: 60}

            })
        }
    }
    return icsEvents;
}

function convertSemester(semester_calendar) {
    var icsEvents = [];
    for(var calendar in semester_calendar) {
        for(var key in semester_calendar[calendar].assessments) {
            if(semester_calendar[calendar].assessments.hasOwnProperty(key)) {
                let eventName = semester_calendar[calendar].course + " " +  key;
                icsEvents.push({
                    title: eventName,
                    start: [2022, determineMonth(semester_calendar[calendar].assessments[key]),determineDate(semester_calendar[calendar].assessments[key]),6,30],
                    duration: {minutes: 60}
    
                })
            }
        }
    }
    return icsEvents;
}

var calendarentry = {
    course: "SENG 550",
    assessments: {
        Assignment1: "October 1",
        Assignment2: "October 31",
        Final: "December 13"
    }
}
courses = [
    {
    course: "SENG 550",
    assessments: {
        Midterm1: "September 27",
        Midterm2: "October 16",
        Midterm3: "Nov 6",
        Final: "December 9"
    },
    assessments: {
        Midterm1: "September 27",
        Midterm2: "October 16",
        Midterm3: "Nov 6",
        Final: "December 9"
    }
    }, 
    {
        course: "ANTH 363",
        assessments: {
            Assignment1: "October 1",
            Assignment2: "October 31",
            Final: "December 13"
        }
        
    }
    , 
    {
        course: "Sociioloigy 203", 
        assessments: {
            Assignment1: "October 13",
            Lab2: "December 15",
            Lab3: "November 27",
            Midterm: "October 5",
            Final: "December 14"
        }
    }
]

let icsCalendarEntries1Course = convert(calendarentry);

let icsCalendarEntriesWholeSemester = convertSemester(courses);

console.log("Converted to an ics, now exporting the file");
console.log(icsCalendarEntries1Course);
console.log(icsCalendarEntriesWholeSemester);
/*fs.writeFileSync('example2.ics',icsCalendarEntries);
ics.createEvents(icsCalendarEntries2,function (error,value) {
    if(error) {
        console.log(error);
    }
    fs.writeFileSync('example2.ics',value);
}); 
*/

