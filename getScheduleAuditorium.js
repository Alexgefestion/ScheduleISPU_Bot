const fs = require('fs');
const _timeout = 2000;


let numDivision = 0;
let numCourse = 0;
let numGroup = 0;

class GetScheduleAuditorium {
	constructor() {

	}
	Schedule = new Array;
	directoryBypass() {
			fs.readdir(`schedule/постоянное`, (err, Division) => {
				fs.readdir(`schedule/постоянное/${Division[numDivision]}`, (err, Course) => {
					fs.readdir(`schedule/постоянное/${Division[numDivision]}/${Course[numCourse]}`, (err, Group) => {

						this.Schedule = JSON.parse( fs.readFileSync(`schedule/постоянное/${Division[numDivision]}/${Course[numCourse]}/${Group[numGroup]}`, { encoding: 'UTF8', flag: 'r+' }) );
						console.log(`schedule/постоянное/${Division[numDivision]}/${Course[numCourse]}/${Group[numGroup]}`)
						this.ScheduleBypass(this.Schedule);
						if(numGroup<Group.length-1){
							numGroup++;
							
						}else{
							numGroup = 0;

							if(numCourse<Course.length-1){
								numCourse++;
								this.directoryBypass();
							}else{
								numCourse = 0;

								if(numDivision<Division.length-1){
									numDivision++;
									this.directoryBypass();
								}else{
									numDivision = 0;
									return;
								}
							}
						}

					});	
				});	
			});	

	}
	ScheduleBypass(shedule){
		for(let i = 0; i < 14; i++){
			for(let j = 0; j < 7; j++){
				if(shedule[i][j] != ''){
					// console.log(j,shedule[i][j])
				}
			}
		}
		console.log(this)
		this.directoryBypass()
	}


}

module.exports = GetScheduleAuditorium;