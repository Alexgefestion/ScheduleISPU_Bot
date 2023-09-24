const fs = require('fs');

function createBody(){//создание данных тела для арпы
	let content = (fs.readFileSync("test.txt", { encoding: 'UTF8', flag: 'r+' })).toString();
	content = content.split('fetch');
	for(let i=1; i<content.length;i++){
		let division = content[i].slice(content[i].indexOf('SubDivision=')+12, content[i].indexOf('&ctl00%24ContentPlaceHolder1%24ddlCorse'))
		let coursename = content[i].slice(content[i].indexOf('Corse=')+6, content[i].indexOf('&ctl00%24ContentPlaceHolder1%24ddlObject'))
		let name1 = content[i].slice(content[i].indexOf('ObjectValue=')+12, content[i].indexOf('&ctl00%24ContentPlaceHolder1%24rblS'))//имена групп
		let name2 = content[i].slice(content[i].indexOf('rblSubGroup=')+12, content[i].indexOf('"method"')-6)//имена подгрупп
		let data = content[i].slice(content[i].indexOf('body')+8, content[i].indexOf('"method"')-6);
		fs.writeFileSync(`body header/107/${division}/${coursename}/${name1} ${name2}.txt`, data);
	}
}
createBody();

