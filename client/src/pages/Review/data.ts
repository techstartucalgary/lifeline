import { Courses } from "../../logic/icsGen";

const testState: Courses = [
  {
    code: "PSYC",
    number: 203,
    title: "Psychology",
    key: "psyc-203",
    topic: "Psychology of Everyday Life",
    assessments: [
      {
        name: "Identity Assignment",
        date: new Date("2021-10-21T18:00:00.000"),
        weight: 6,
      },
      {
        name: "Coping Profile Assignment",
        date: new Date("2021-10-29T18:00:00.000"),
        weight: 2,
      },
      {
        name: "Self-Reflection/Goal Setting Assignment",
        date: new Date("2021-12-07T18:00:00.000"),
        weight: 7,
      },
      {
        name: "Experiential-Learning/Article-Evaluation Course Component",
        date: new Date("2021-12-08T23:59:59.999"),
        weight: 4,
      },
      {
        name: "Exam 1",
        date: new Date("2021-10-14T00:00:00.000"),
        weight: 25,
      },
      {
        name: "Exam 2",
        date: new Date("2021-11-18T00:00:00.000"),
        weight: 25,
      },
      {
        name: "Exam 3/Final Exam",
        date: new Date("2021-12-06T00:00:00.000"),
        weight: 31,
      },
    ],
  },
];

export default testState;
