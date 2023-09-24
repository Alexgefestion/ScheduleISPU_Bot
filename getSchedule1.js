const fs = require('fs');
const requestURL = 'http://schedule.ispu.ru/'

const startLess = ["8.00","9.50","11.40","14.00","15.50","17.40","19.25","8.00","9.50","11.40","14.00","15.50","17.40","19.25"]
const endLess = ["9.35","11.25","13.15","15.35","17.25","19.15","21.00","9.35","11.25","13.15","15.35","17.25","19.15","21.00"]



// let Schedule = 107;
// let SubDivision = 30000;
// let Corse = 1;
// let ObjectValue = 918;
// let SubGroup = 5789;
// let body = (fs.readFileSync(`body header/${Schedule}/${SubDivision}/${Corse}/${ObjectValue} ${SubGroup}.txt`, { encoding: 'UTF8', flag: 'r+' })).toString();                          

function directiryBypass() {
	let numDivision = 0;
	let numCourse = 0;
	let numGroup = 0;

	bypass()
	function bypass(){
		fs.readdir(`body header/107`, (err, Division) => {
			fs.readdir(`body header/107/${Division[numDivision]}`, (err, Course) => {
				fs.readdir(`body header/107/${Division[numDivision]}/${Course[numCourse]}`, (err, Group) => {
					let body = (fs.readFileSync(`body header/107/${Division[numDivision]}/${Course[numCourse]}/${Group[numGroup]}`, { encoding: 'UTF8', flag: 'r+' })).toString();
					console.log(`body header/107/${Division[numDivision]}/${Course[numCourse]}/${Group[numGroup]}`)
					setTimeout(GetSchedule, 100, body);
					if(numGroup<Group.length-1){
						numGroup++;
					}else{
						numGroup = 0;

						if(numCourse<Course.length-1){
							numCourse++;
						}else{
							numCourse = 0;

							if(numDivision<Division.length-1){
								numDivision++;
							}else{
								numDivision = 0;
								return;
							}
						}
					}
					setTimeout(bypass, 500);
				});	
			});	
		});	
	}
}
// GetSchedule(body);
async function GetSchedule(bodyArg) {
	let response = await fetch(requestURL, {
  		method: 'POST',
  		headers: {
    		"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    		"accept-language": "ru,ru-RU;q=0.9,en;q=0.8,en-GB;q=0.7,en-CA;q=0.6,en-US;q=0.5,en-NZ;q=0.4,en-ZA;q=0.3,en-IN;q=0.2,en-AU;q=0.1,be;q=0.1",
    		"cache-control": "no-cache",
    		"content-type": "application/x-www-form-urlencoded",
    		"pragma": "no-cache",
    		"upgrade-insecure-requests": "1",
  		},
  			body: `${bodyArg}`
	});
	if (response.ok) {
		let data = await response.text();
		formationSchedule(data);
	} else {
		console.log("error HTTP: " + response.status) ;
	}

}
function formationSchedule(data) {
	let Offset = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	let Rowspan = [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],];
	let RawSheet = [['','','','','','',''],['','','','','','',''],['','','','','','',''],['','','','','','',''],['','','','','','',''],['','','','','','',''],['','','','','','',''],['','','','','','',''],['','','','','','',''],['','','','','','',''],['','','','','','',''],['','','','','','',''],['','','','','','',''],['','','','','','','']];
	let CompliteSheet = [['','','','','','',''],['','','','','','',''],['','','','','','',''],['','','','','','',''],['','','','','','',''],['','','','','','',''],['','','','','','',''],['','','','','','',''],['','','','','','',''],['','','','','','',''],['','','','','','',''],['','','','','','',''],['','','','','','',''],['','','','','','','']];
	
	let Name = [];

	let i = -1;
	while ((i = data.indexOf('selected="selected"', i+1)) != -1){//получаем имя группы из html
	    Name.push(data.slice(data.indexOf('">', i+27)+2, data.indexOf('</', i+27)));
	}
	let sv = data.indexOf('checked="checked" /><label for="ContentPlaceHolder1_rblSubGroup_', )+64;
	Name[4] = data.slice(data.indexOf('>', sv)+1,data.indexOf('<', sv));
	
	data = data.split('table')[5];//выделяем таблицу с расписанием
	data = data.split('<tr');//отделение строки
	for (let i = 3; i < data.length ; i++) {
		data[i] = data[i].split('<td');//отделение ячейки из строк
		if(i == 3 || i == 10){
			createRawSheet(2, i);
		}else{
			createRawSheet(1, i);
		}
	}
	createCompliteSheet(RawSheet);
	function createRawSheet(num, i) {

		//i это строка. j это столбец
		
		for (let j = 1 + num; j < data[i].length ; j++) {
			let rowspan = parseInt(data[i][j][(data[i][j].indexOf('rowspan'))+9]);
			let colorSquare = '⬜️';

			if(data[i][j].indexOf('лек.') != -1){
				colorSquare = '🟧';
			}else{
				if(data[i][j].indexOf('сем.') != -1){
					colorSquare = '🟩';
				}else{
					if(data[i][j].indexOf('лаб.') != -1){
						colorSquare = '🟪';
					}
				}
			}
			

			if(rowspan > 1){
				for(let long = 1; long < rowspan; long++){
					Rowspan[i-3][j-num-1] = 1;
				}
			}
			data[i][j] = data[i][j].split('>')[1].split('<')[0];
			if(data[i][j]!= ''){
				RawSheet[i-3][j-num-1] = colorSquare + startLess[i-3]+"-"+endLess[i-4+rowspan]+data[i][j];
			}else{
				RawSheet[i-3][j-num-1] = 'null';
			}
		}
	}
	function createCompliteSheet(RawSheet){
		for(let j = 0; j < 7; j++){
			for(let i = 0; i < 14; i++){
				CompliteSheet[i][j+Offset[i]] = RawSheet[i][j];
				Offset[i+1] += Rowspan[i][j];
			}
		}
		fs.writeFileSync(`schedule/${Name[0]}/${Name[1]}/${Name[2]}/${Name[3]} ${Name[4]}.txt`, JSON.stringify(CompliteSheet));
	}
	
}

directiryBypass();
