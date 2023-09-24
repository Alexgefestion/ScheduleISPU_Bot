const getScheduleStudent = require('./getScheduleStudent.js');
const getScheduleTeacher = require('./getScheduleTeacher.js');

const fs = require('fs');
const TelegramBot = require('node-telegram-bot-api');
const token = '6524650278:AAGxF-RtKDu8xZSMGrXHCDllcds-5SL8UxA';
const bot = new TelegramBot(token, {polling: true});

const teacherName = ["Аббясов А.М.","Аксаковская Л.Н.","Алейников А.В.","Алексеев А.А.","Алексинский С.О.","Алыкова А.Л.","Андрианов С.Г.","Анисимов А.А.","Антонова О.В.","Аполонский В.В.","Аржанникова А.Е.","Аристархова О.А.","Артамонов М.А.","Ахалкова И.А.","Бабикова Л.Г.","Бадоев В.А.","Баженов В.С.","Балдов С.В.","Баллод Б.А.","Банников А.В.","Банникова С.А.","Барочкин А.Е.","Барочкин Е.В.","Басова Е.В.","Батаева В.В.","Башмакова Е.В.","Беляев Г.В.","Беляков А.Н.","Березина Е.С.","Битеряков Ю.Ф.","Блинов О.В.","Блудов А.Ю.","Борута С.С.","Братолюбов А.А.","Бубнов К.Н.","Буданов В.А.","Будник Г.А.","Буйлов П.В. ","Булавкин Г.В.","Бутырина М.В.","Бухмиров В.В.","Бушуев Е.Н.","Бушуева Н.В.","Бушуева О.А.","Васильев С.В.","Васильева М.А.","Ведерникова И.И.","Веселова И.Е.","Вилков П.В.","Виноградов А.Б.","Виноградов А.Л.","Виноградов В.Н.","Вихарев А.В.","Вихарев Д.Ю.","Власов А.М.","Волкова М.Ю.","Воробьев С.В.","Воробьева Е.А.","Воронова А.С.","Вылгина Ю.В.","Габитов Р.Н.","Гадалов А.Б.","Гайдина Ю.А.","Гаськов А.К.","Гвоздева Т.В.","Герман О.Ф.","Гнатюк А.Б.","Гнездов Н.Е.","Голубев А.В.","Голубев А.Н.","Голубева Л.В.","Голубков В.В.","Горбунов А.Г.","Горбунов В.А.","Горшенин С.Д.","Григорьев Д.Г.","Григорьев Е.Ю.","Григорян А.Ю.","Грубов Е.О.","Грубова Ю.В.","Гудкова Е.А.","Гусев Е.В.","Гусенков А.В.","Гусенкова Н.П.","Демин А.М.","Демьянцева Н.Г.","Долгих И.Ю.","Долинин Д.А.","Дыдыкина Н.Н.","Дюповкин Н.И.","Егоров В.Н.","Егоров С.А.","Егорова А.А.","Егорова Н.Е.","Егорычева Е.В.","Елизарова Н.Н.","Елисеева Е.Н.","Еремин И.В.","Еремина Н.А.","Ермаков К.К.","Ерофеева К.Л.","Ершов С.В.","Ефремова Н.В.","Жуков В.П.","Журавлев Е.В.","Журавлева И.В.","Зайцева Е.В.","Залипаева Е.А.","Зарубин З.В.","Захаров В.М.","Захаров М.А.","Захарьян Н.А.","Зиновьева Е.В.","Зорин М.Ю.","Зубков В.П.","Иванов И.Е.","Иванова Н.Б.","Иванова Н.Г.","Иванова О.Е.","Игнатьев Е.Б.","Игошин И.П.","Идрисова Ф.С.","Ильина Е.Э.","Ильичев Н.Б.","Ильченко А.Г.","Ионов А.В.","Кабанов О.А.","Казаков Ю.Б.","Калугина Т.Ф.","Канарейкин В.И.","Кандалов Ю. В.","Караваев В.И.","Карандашев А.П.","Караулов В.Н.","Карачев В.Д.","Каржевин А.А.","Карпычев Е.А.","Карякин А.М.","Киселев А.И.","Киселев В.Ю.","Клочкова Н.В.","Кожевников С.О.","Козлов М.Н.","Козлова М.В.","Кокин В.М.","Кокулин И.А.","Колганов А.Р.","Колесников В.С.","Колибаба В.И.","Колибаба О.Б.","Колобов А.Б.","Комин В.Г.","Коновалов А.В.","Копосов В.Н.","Копылова Л.Г.","Кормилицын Д.Н.","Корнилов Д.С.","Королев П.В.","Королева М.П.","Королева Т.В.","Коротков А.А.","Корочкина Е.Е.","Коршунова Л.Ю.","Корягина И.А.","Коряжкин В.М.","Костерин А.Ю.","Костюк В.Х.","Косяков С.В.","Котлова А.В.","Котлова Т.Б.","Котова К.А.","Кочетков А.Е.","Крайнова Л.Н.","Крамачева С.В.","Крапостин А.А.","Круглов А.В.","Крюкова Т.Б.","Кузьмин С.М.","Кукукина И.Г.","Куленко М.С.","Кулешов А.И.","Куликов Ф.А.","Кутумов Ю. Д.","Кутумова Е.В.","Кутурина Е.П.","Лапшин В.М.","Лапшина О.И.","Ларин А.Б.","Лебедев В.Д.","Лебедев С.К.","Лебедева Н.В.","Ледуховский Г.В.","Лисова С.Ю.","Литвинов С.Н.","Лифшиц А.С.","Лихачева А.В.","Лобанова Т.Е.","Логинова А.О.","Локов А.А.","Лоншаков Н.А.","Лукьянова К.Н.","Магницкий Д.Н.","Макаров А.В.","Максимов М.В.","Малафеев М.Д.","Малкова Е.Л.","Малышев Н.И.","Марков М.Г.","Мартиросян А.А.","Марченко С.А.","Маршалов Е.Д.","Маслов Л.Б.","Матвиевская Н.Ю.","Мечтаева М.Н.","Мешкова Ю.С.","Мингалева Т.Ю.","Минеев П.А.","Михайлов М.Ю.","Михеев П.Г.","Морозов Н.А.","Морозова А.А.","Мочалов А.С.","Мошкарина М.В.","Мукучян А.А.","Муравьев И.К.","Мурзин А.Ю.","Нагорная О.Ю.","Наумов Ю.В.","Наумова Е.А.","Невмятуллина Н.Б.","Нестеров С.А.","Никоноров А.Н.","Новоселов Е.М.","Ноздрин М.А.","Обронов М.С.","Овсянников А.А.","Овсянников Ю.М.","Огурцов А.В.","Огурцов Ф.Б.","Олейник О.Ю.","Орлова Е.В.","Осадчий Д.Ю.","Осколкова И.А.","Павлюкова Н.Л.","Падылина А.Л.","Палилов И.А.","Панков С.А.","Пантелеев Е.Р.","Пекунова А.В.","Петров А.Е.","Плетников С.Б.","Полкошников Д.А.","Попов Г.В.","Потапова М.Ю.","Пронин В.Ю.","Пронин Н.Н.","Прохорова Н.В.","Пушков В.М.","Пышненко Е.А.","Работаев В.Г.","Раева Т.Д.","Ракутина Д.В.","Ратманова И.Д.","Рафиков В.Р.","Рогожников Ю.Ю.","Родин Н.А.","Розин Е.Г.","Романова И.С.","Романова Н.Р.","Рубцов Д.В.","Рудаков Н.В.","Рябова Е.И.","Сабанеев Н.А.","Савельев В.А.","Савельев С.А.","Садыков А.М.","Сайкин М.С.","Самышина О.В.","Семенов В.К.","Сенников В.В.","Сергеева О.В.","Сидоров А.А.","Сидоров С.Г.","Сидорова И.Н.","Сироткин А.С.","Скоробогатов А.А.","Словесный С.А.","Смельчакова Е.В.","Смирнов В.В.","Смирнов Н.Н.","Смирнов С.Ф.","Смирнова Ю.М.","Созинова Т.Е.","Соколов А.К.","Соколов А.М.","Соколов К.Е.","Соколова А.С.","Соломаничев М.А.","Сорокин А.Ф.","Сороковнин М.Е.","Спичков Ю.П.","Ставров С.Г.","Ставровский Е.С.","Староверова Е.Б.","Степанов В.Ф.","Степанов С. Г.","Страхов А.С.","Строев В.П.","Сулыненков И.Н.","Суханова О.С.","Тарарыкин С.В.","Тарасов С.В.","Тарасова А.С.","Теплякова С.С.","Терехов А.И.","Терехов В.Г.","Терехова Н.Р.","Тимошин Л.И.","Тихов М.Е.","Тихомирова И.А.","Тихонов А.И.","Токарева Г.В.","Токов А.Ю.","Торопова Е.К.","Третьякова И.Ю.","Трифонов А.Ю.","Тычкин А.Р.","Тюрина С.Ю.","Тютиков В.В.","Угрюмова О.И.","Умнов Я.А.","Устинов Д.С.","Ухалова Е.Г.","Ушакова Н.В.","Фадеева М.С.","Фалина В.А.","Федоров Ю.А.","Федорова А.Ю.","Филатова Г.А.","Филатова М.В.","Филиппов В.А.","Филиппова А.И.","Фомина О.В.","Фомичёв А.А.","Фомичев М.Д.","Фролова О.В.","Харитонов Б.М.","Харламов А.К.","Хрипкова Л.Н.","Хрипунов А.С.","Целищев Е.С.","Чекан Г.В.","Чернов К.В.","Чернышева Л.П.","Чикалева А.М.","Чистова И.Н.","Чистосердов В.Л.","Чухин И.М.","Шагурина Е.С.","Шадриков Т.Е.","Шарафутдинова Н.К.","Шарунова С.В.","Шелепина И.Г.","Шилов М.А.","Шипко М.Н.","Ширяев А.Н.","Шишкин В.П.","Шмелева Г.А.","Шмелева Т.В.","Шмелева Т.Н.","Шошин В.Г.","Шувалов С.И.","Шуин В.А.","Шуина Е.А.","Шульпин А.А.","Ярунин С. Н.","Ярунина Н.Н.","Ясинский И.Ф."]

const dayOnWeek = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскреснье"];
const weekEvenOdd = ["первая неделя", "вторая неделя"];
let Person = JSON.parse(fs.readFileSync('person.json', { encoding: 'UTF8', flag: 'r+' }));

let date;
let hours;
let minutes;
let dayNum;
let weekNum;

Date.prototype.getWeek = function() {
  let date = new Date(this.getTime());
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  let week1 = new Date(date.getFullYear(), 0, 4);
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
}

function getData(){
	date = new Date();
	hours = date.getHours();
	minutes = date.getMinutes();
	dayNum = date.getDay()-1;
	if(date.getWeek() % 2 == 0){weekNum = 2}else{weekNum = 1}


	//time event
	if(dayNum != -1 && hours == 7 && minutes == 30){
		notification();
	}
	if(hours == 21 && minutes == 2){
	}

}


//init
getData();
setInterval(getData, 60000);
//init end

function createKeyboardFS(path, callback, arg1, arg2) {
	let divisionList = {
		reply_markup: {
			inline_keyboard: []
		},
		parse_mode: 'html'
	}
	fs.readdir(`schedule/постоянное/${path}`, (err, list) => {
		for(let i = 0; i<list.length; i++){

			if(list[i][list[i].length-4] != '.'){
				divisionList.reply_markup.inline_keyboard[i] = [{text: list[i], callback_data: path+list[i]}];
			}else{
				divisionList.reply_markup.inline_keyboard[i] = [{text: list[i].slice(0, list[i].length-4), callback_data: path+list[i]}];
			}

			if(i == list.length-1){
				callback(arg1, arg2, divisionList);
			}
		}
	});
}

function readFsShedule(dayNumArg, weekNumArg, TextArg, chatId){
	for(let i = 0; i < Person.length; i++){
		if(Person[i][0] == chatId){
			let shedule = JSON.parse(fs.readFileSync(`schedule/постоянное/${Person[i][1]}`, { encoding: 'UTF8', flag: 'r+' }));
			if(weekNumArg == 0){
				let compliteShedule1 = '\n\r\n\r';
				let compliteShedule2 = '\n\r\n\r';
				if(weekNum == 1){
					compliteShedule1 = '<b> (Текущая) </b>\n\r\n\r';
				}else{
					compliteShedule2 = '<b> (Текущая) </b>\n\r\n\r';
				}
				for(let i = 0; i<7; i++){
					if(shedule[i][dayNumArg]!= 'null'){
						compliteShedule1 += shedule[i][dayNumArg] + '\n\r';
					}
				}
				for(let i = 7; i<14; i++){
					if(shedule[i][dayNumArg]!= 'null'){
						compliteShedule2 += shedule[i][dayNumArg] + '\n\r';
					}
				}
				compliteData = '<b>'+dayOnWeek[dayNumArg]+', '+weekEvenOdd[0]+'</b>'+compliteShedule1+'\n\r\n\r<b>'+dayOnWeek[dayNumArg]+', '+weekEvenOdd[1]+'</b>'+compliteShedule2;
			
			}else{
				let compliteShedule = '';
				for(let i = 7*(weekNumArg-1); i<7*weekNumArg; i++){
					if(shedule[i][dayNumArg]!= 'null'){
						compliteShedule += shedule[i][dayNumArg] + '\n\r';
					}
				}
				compliteData = '<b>'+dayOnWeek[dayNumArg]+', '+weekEvenOdd[weekNumArg-1]+' '+TextArg+'</b>\n\r\n\r'+compliteShedule;
			}
			bot.sendMessage(chatId, compliteData, {parse_mode: 'html'});
			return;
		}
	}
}

function readFsSheduleTeacher(dayNumArg, weekNumArg, TextArg, name, chatId){
	let Keyboard = {
		reply_markup: {
		    inline_keyboard: [
		    	[{text: 'сегодня', callback_data: 'Tс'+name},
		    	{text: 'завтра', callback_data: 'Tз'+name}],
		    	[{text: 'пн', callback_data: 'T0'+name},
		    	{text: 'вт', callback_data: 'T1'+name},
		    	{text: 'ср', callback_data: 'T2'+name},
		    	{text: 'чт', callback_data: 'T3'+name},
		    	{text: 'пт', callback_data: 'T4'+name},
		    	{text: 'сб', callback_data: 'T5'+name},]
		    ],
		resize_keyboard: true,
	    },
	    parse_mode: 'html'
	}
	let shedule = JSON.parse(fs.readFileSync(`schedule/преподаватели/${name}.txt`, { encoding: 'UTF8', flag: 'r+' }));
	let compliteData;

	if(weekNumArg == 0){
		//выдаем расписание одним сообщением за обе недели
		let compliteShedule1 = '\n\r\n\r';
		let compliteShedule2 = '\n\r\n\r';
		if(weekNum == 1){
			compliteShedule1 = '<b> (Текущая) </b>\n\r\n\r';
		}else{
			compliteShedule2 = '<b> (Текущая) </b>\n\r\n\r';
		}
		for(let i = 0; i<7; i++){
			if(shedule[i][dayNumArg]!= 'null'){
				compliteShedule1 += shedule[i][dayNumArg] + '\n\r';
			}
		}
		for(let i = 7; i<14; i++){
			if(shedule[i][dayNumArg]!= 'null'){
				compliteShedule2 += shedule[i][dayNumArg] + '\n\r';
			}
		}
		compliteData = '<b>'+name+'\n\r\n\r'+dayOnWeek[dayNumArg]+', '+weekEvenOdd[0]+'</b>'+compliteShedule1+'\n\r\n\r<b>'+dayOnWeek[dayNumArg]+', '+weekEvenOdd[1]+'</b>'+compliteShedule2;

	}else{
		let compliteShedule = '';
		for(let i = 7*(weekNumArg-1); i<7*weekNumArg; i++){
			if(shedule[i][dayNumArg]!= 'null'){
				compliteShedule += shedule[i][dayNumArg] + '\n\r';
			}
		}
		compliteData = '<b>'+name+'\n\r\n\r'+dayOnWeek[dayNumArg]+', '+weekEvenOdd[weekNumArg-1]+' '+TextArg+'</b>\n\r\n\r'+compliteShedule;
	}
	bot.sendMessage(chatId, compliteData, Keyboard);
	return;

}

function notification(){
	for(let i = 0; i < Person.length; i++){
		if(Person[i][2] == 1){
			// await readFsShedule(dayNum, weekNum, '', Person[i][0]);
			let text = 'Доброе утро, энергет! \n\r\n\rРасписание на сегодня \n\r'
			let shedule = JSON.parse(fs.readFileSync(`schedule/постоянное/${Person[i][1]}`, { encoding: 'UTF8', flag: 'r+' }));
			let compliteShedule = '';
			for(let i = 7*(weekNum-1); i<7*weekNum; i++){
				if(shedule[i][dayNum]!= 'null'){
					compliteShedule += shedule[i][dayNum] + '\n\r';
				}
			}
			bot.sendMessage(Person[i][0], text+'<b>'+dayOnWeek[dayNum]+', '+weekEvenOdd[weekNum-1]+' '+'</b>\n\r'+compliteShedule, {parse_mode: 'html'});
		}
	}
}

function adminCommand(){
	bot.sendMessage(1760868440,	'action', {
	reply_markup: {
	    inline_keyboard: [
	    		[{text: 'person', callback_data: 'person'}],
	    		[{text: 'notification', callback_data: 'notification'}]
	    	]
	    },
	    parse_mode: 'html'
	});
}






bot.setMyCommands([
	{command: '/choose', description: 'выбрать группу'},
	{command: '/notification', description: 'включить/отключить рассылку расписания'},
	{command: '/info', description: 'информация'},
	{command: '/help', description: 'инструкция пользования'},
]);






bot.on('message', async (msg) => {
	console.log(msg);
	const chatId = msg.chat.id;
	const msgText = msg.text;


	let info = 'Внимание! Бот находится в бета релизе, в случае неполадок напишите @alexgefestion. '
	let help = 'Для получения расписания студента используйте /choose\n\r    (ваш выбор будет запомнен, поторный ввод данных не требуется)\n\r\n\rДля включения/отключения утренней рассылки расписания (по умолчанию включена) используйте /notification \n\r\n\rДля того чтобы открыть расписание преподавателя напишите  в чат фамилию полность или её часть \n\r          "<i>Ледуховский</i>" или "<i>Лед</i>"';

	//commands
	if(msgText === '/help'){
		return bot.sendMessage(chatId, help,{parse_mode: 'html'});
	}
	if(msgText === '/info'){
		if(chatId === 1760868440){
			adminCommand();
		}
		return bot.sendMessage(chatId, info);
	}
	if(msgText === '/start'){
		await bot.sendMessage(chatId, help, {reply_markup: {keyboard: [['/info']],resize_keyboard: true},parse_mode: 'html'});
		return createKeyboardFS('', (arg1, arg2, divisionList)=>{bot.sendMessage(arg1, arg2, divisionList)}, chatId, '<b>факультет</b>');
	}

	if(msgText === '/choose'){
		await bot.sendMessage(chatId, "Выберите группу", {reply_markup: {keyboard: [['/info']],resize_keyboard: true}});
		return createKeyboardFS('', (arg1, arg2, divisionList)=>{bot.sendMessage(arg1, arg2, divisionList)}, chatId, '<b>факультет</b>');
	}

	if(msgText === '/notification'){
		for(let i = 0; i < Person.length; i++){
			if(Person[i][0] == chatId){
				if(Person[i][2] == 1){
					Person[i][2] = 0;
					bot.sendMessage(chatId, 'Ежедневная рассылка расписания <b>отключена</b>',{parse_mode: 'html'});
				}else{
					Person[i][2] = 1;
					bot.sendMessage(chatId, 'Ежедневная рассылка расписания <b>включена</b>',{parse_mode: 'html'});
				}
				fs.writeFileSync('person.json', JSON.stringify(Person));
			}
		}
		return;
	}

	//text commands
	if(msgText === 'сегодня'){
		if(dayNum == -1){
			return readFsShedule(6, weekNum, '', chatId);
		}else{
			return readFsShedule(dayNum, weekNum, '', chatId);
		}
	}
	if(msgText === 'завтра'){
		if(dayNum == -1){
			if(weekNum == 1){
				return readFsShedule(dayNum+1, weekNum+1, '', chatId);
			}else{
				return readFsShedule(dayNum+1, weekNum-1, '', chatId);
			}
		}else{
			return readFsShedule(dayNum+1, weekNum, '', chatId);
		}
	}
	if(msgText === 'пн'){
		return readFsShedule(0, 0, '(Текущая)',  chatId);
	}
	if(msgText === 'вт'){
		return readFsShedule(1, 0, '(Текущая)',  chatId);
	}
	if(msgText === 'ср'){
		return readFsShedule(2, 0, '(Текущая)',  chatId);
	}
	if(msgText === 'чт'){
		return readFsShedule(3, 0, '(Текущая)',  chatId);
	}
	if(msgText === 'пт'){
		return readFsShedule(4, 0, '(Текущая)',  chatId);
	}
	if(msgText === 'сб'){
		return readFsShedule(5, 0, '(Текущая)',  chatId);
	}
	//поиск аудитории
	if(msgText.length < 5){
		if(msgText[0] === 'А' || msgText[0] === 'а'){
		}
		if(msgText[0] === 'Б' || msgText[0] === 'б'){
			
		}
		if(msgText[0] === 'С' || msgText[0] === 'с'){
			
		}
	}



	let teacherKeyboard = {
		reply_markup: {
			inline_keyboard: []
		},
		parse_mode: 'html'
	}
	for(let i = 0; i < teacherName.length; i++){
		if(teacherName[i].includes(msgText)){
			teacherKeyboard.reply_markup.inline_keyboard.push([{text: teacherName[i], callback_data: teacherName[i]}]);
		}
	}
	if(teacherKeyboard.reply_markup.inline_keyboard.length != 0){
		bot.sendMessage(chatId, '<b>Совпадение имени:</b>', teacherKeyboard);
	}
	//поиск преподавателя

});





bot.on('callback_query', async (msg) => {
	console.log(msg);
	const messageId = msg.message.message_id;
	const chatId = msg.message.chat.id;
	const msgText = msg.message.text;
	const data = msg.data;

	if(msgText === 'факультет'){
		await createKeyboardFS(data+'/', (arg1, arg2, divisionList)=>{bot.sendMessage(arg1, arg2, divisionList)}, chatId, '<b>курс</b>');
		return bot.deleteMessage(chatId, messageId);
	}

	if(msgText === 'курс'){
		await createKeyboardFS(data+'/', (arg1, arg2, divisionList)=>{bot.sendMessage(arg1, arg2, divisionList)}, chatId, '<b>группа</b>');
		return bot.deleteMessage(chatId, messageId);
	}

	if(msgText === 'группа'){
		await bot.sendMessage(chatId,	'Ваша группа: <b>'+ data.slice(0,data.length-4)+'</b>', {
		reply_markup: {
		    keyboard: [
		    		["сегодня", "завтра"],
		    		["пн", "вт", "ср", "чт", "пт", "сб"]
		    	],
		    resize_keyboard: true,
		    },
		    parse_mode: 'html'
		});
		bot.deleteMessage(chatId, messageId);
		bot.sendMessage(1760868440, '@'+msg.message.chat.username+'   '+data);
		for(let i = 0; i < Person.length; i++){
			if(Person[i][0] == chatId){
				Person[i][1] = data;
				break;
			}else{
				if(i === Person.length-1){
					Person.push([chatId, data, 1]);
				}
			}
		}
		fs.writeFileSync('person.json', JSON.stringify(Person));
		return;
	}

	if(msgText === 'Совпадение имени:'){
		return bot.sendMessage(chatId, 'Расписание <b>'+data+'</b>', {
		reply_markup: {
		    inline_keyboard: [
		    	[{text: 'сегодня', callback_data: 'Tс'+data},
		    	{text: 'завтра', callback_data: 'Tз'+data}],
		    	[{text: 'пн', callback_data: 'T0'+data},
		    	{text: 'вт', callback_data: 'T1'+data},
		    	{text: 'ср', callback_data: 'T2'+data},
		    	{text: 'чт', callback_data: 'T3'+data},
		    	{text: 'пт', callback_data: 'T4'+data},
		    	{text: 'сб', callback_data: 'T5'+data},],
		    	],
		    resize_keyboard: true,
		    },
		    parse_mode: 'html'
		});
	}
	if(data[0] === 'T'){
		if(data[1] === 'с'){
			if(dayNum == -1){
				await readFsSheduleTeacher(6, weekNum, '(Текущая)', data.slice(2, data.length), chatId);
				return bot.deleteMessage(chatId, messageId);
			}else{
				await readFsSheduleTeacher(dayNum, weekNum, '(Текущая)', data.slice(2, data.length), chatId);
				return bot.deleteMessage(chatId, messageId);
			}
		}

		if(data[1] === 'з'){
			if(dayNum == -1){
				if(weekNum == 1){
					await readFsSheduleTeacher(dayNum+1, weekNum+1, '', data.slice(2, data.length),  chatId);
					return bot.deleteMessage(chatId, messageId);
				}else{
					await readFsSheduleTeacher(dayNum+1, weekNum-1, '', data.slice(2, data.length),  chatId);
					return bot.deleteMessage(chatId, messageId);
				}
			}
			await readFsSheduleTeacher(dayNum+1, weekNum, '(Текущая)', data.slice(2, data.length),  chatId);
			return bot.deleteMessage(chatId, messageId);
		}

		if(data[1] === '0' || data[1] === '1' || data[1] === '2' || data[1] === '3' || data[1] === '4' || data[1] === '5'){
			await readFsSheduleTeacher(data[1], 0, '(Текущая)', data.slice(2, data.length),  chatId);
			return bot.deleteMessage(chatId, messageId);
		}
	}



	//admin 
	if(data === 'person'){
		await bot.sendMessage(1760868440, Person.toString())
		return;
	}
	if(data === 'notification'){
		notification();
		return;
	}


});



bot.on("polling_error", console.log);





