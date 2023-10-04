const GetScheduleStudent = require('./getScheduleStudent.js');
const GetScheduleTeacher = require('./getScheduleTeacher.js');
const GetScheduleAuditorium = require('./getScheduleAuditorium.js');

const ScheduleTeacher = new GetScheduleTeacher();
const ScheduleStudent = new GetScheduleStudent();
const ScheduleAuditorium = new GetScheduleAuditorium();

ScheduleAuditorium.directoryBypass();
// console.log(ScheduleAuditorium.directoryBypass)