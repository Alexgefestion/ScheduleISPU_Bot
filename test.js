const GetScheduleStudent = require('./getScheduleStudent.js');
const GetScheduleTeacher = require('./getScheduleTeacher');

const ScheduleTeacher = new GetScheduleTeacher();
const ScheduleStudent = new GetScheduleStudent();

ScheduleTeacher.directiryBypass();