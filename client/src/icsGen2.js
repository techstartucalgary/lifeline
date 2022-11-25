//var ics = require('ics');
const ics = require('ics');

var fs = require('fs');
const { time } = require('console');

function getICSDate(dateString) {
    
    const [date, time] = dateString.split("T");
    const [year, month, day] = date.split("-");
    const [hours, minutes, milis] = time.split(":");
    console.log({year});
    
    return [parseInt(year),parseInt(month),parseInt(day),parseInt(hours),parseInt(minutes)];
}
function toICSEvent(event,courseName) {
    entryTitle = event.name + " " + courseName;
    if(event.weight != "UNKNOWN") {
        entryTitle = `${entryTitle} (${event.weight}%)`
        //  entryTitle = entryTitle + " (" + event.weight + "%)";
    }
    var eventStart; 
    if(event.date != "TBD") {
        eventStart = getICSDate(event.date);
    } else {
        eventStart = [-1,-1,-1,-1,-1];
    }
    console.log(eventStart);
    let icsEvent = {
        title: entryTitle,
        start: eventStart,
        duration: {minutes: 60}
    } 
    return icsEvent;
}



let example = {
    "name": "Research Report",
    "date": "2022-10-04T11:00:00.000",
    "weight": "20"
}

function getICS(courseArray) {
    let events = [];
    for(const course in courseArray) {
        for(const assessment in courseArray[course].assessments) {
            console.log(courseArray[course].course);
            console.log(courseArray[course].assessments);
            events.push(toICSEvent(courseArray[course].assessments[assessment],courseArray[course].course));
        }
    }
    return events;
}
let singleEvent = toICSEvent(example,"introduction to art History");
console.log(singleEvent);

let semester = [
    {
        "course": "PSYC 203",
        "topic": "Psychology of Everyday Life",
        "assessments": [
            {
                "name": "Identity Assignment",
                "date": "2021-10-21T18:00:00.000",
                "weight": "6"
            },
            {
                "name": "Coping Profile Assignment",
                "date": "2021-10-29T18:00:00.000",
                "weight": "2"
            },
            {
                "name": "Self-Reflection/Goal Setting Assignment",
                "date": "2021-12-7T18:00:00.000",
                "weight": "7"
            },
            {
                "name": "Experiential-Learning/Article-Evaluation Course Component",
                "date": "2021-12-8T23:59:59.999",
                "weight": "4"
            },
            {
                "name": "Exam 1",
                "date": "2021-10-14T00:00:00.000",
                "weight": "25"
            },
            {
                "name": "Exam 2",
                "date": "2021-11-18T00:00:00.000",
                "weight": "25"
            },
            {
                "name": "Exam 3/Final Exam",
                "date": "TBD",
                "weight": "31"
            }
        ]
    },
    {
        "course": "HTST 209",
        "topic": "The History of China",
        "assessments": [
            {
                "name": "Midterm examination",
                "date": "2022-02-28T00:00:00.000",
                "weight": "45"
            },
            {
                "name": "Term essay",
                "date": "2022-04-04T00:00:00.000",
                "weight": "35"
            },
            {
                "name": "Final examination",
                "date": "TBD",
                "weight": "20"
            },
        ]
    }

]

let semesterICS = getICS(semester);

function filterICS(semesterICS) {
    var result = semesterICS;
    for(const event in result) {
        if(result[event].start[0] == -1) {
           result.splice(event,event);
        } 
     }
     return result;
}
var semesterICSFiltered = filterICS(semesterICS);
console.log("Filtered to remove start times of -1");
console.log(semesterICSFiltered);

//var icsFile = ics.createEvents(semesterICSFiltered);
const {error,value} = ics.createEvents(semesterICSFiltered);
if(error) {
    console.log(error);
} else {
    fs.writeFileSync('coursedeadlines.ics',value);
}
console.log("printing the contents of the ics file");
//console.log(icsFile);
//fs.writeFileSync("course",icsFile);
//console.log(semesterICS);

