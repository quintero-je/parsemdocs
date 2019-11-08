
var admZip = require('adm-zip');
var fs = require('fs');
var keywords = require('../helpers/keywords');
var path = require('path');

var parser = function parseWordDocument(fileName) {
	var resultList = [];
	let file = path.join(__dirname, '../public/uploads/' + fileName)
	const zip = new admZip(file);
	var contentXml = zip.readAsText("word/document.xml");
	//zip.extractAllTo(path.join(__dirname,'../public/uploads/test/'+item+'/'));	
	var matchedWP = contentXml.match(/<w:p.*?>.*?<\/w:p>/gi);
	if (matchedWP) {
		matchedWP.forEach(function (wpItem) {
			var matchedWT = wpItem.match(/(<w:t>.*?<\/w:t>)|(<w:t\s.[^>]*?>.*?<\/w:t>)/gi);
			var textContent = '';
			if (matchedWT) {
				matchedWT.forEach(function (wtItem) {
					if (wtItem.indexOf('xml:space') === -1) {
						textContent += wtItem.slice(5, -6);
					} else {
						textContent += wtItem.slice(26, -6);
					}
				});
				resultList.push(textContent);
			}
		});
	};

	var sortedText = textExtractFyField(resultList, positionsExplore(resultList));
	return sortedText;
};


function positionsExplore(arrDoc) {
	let keyWPos = [];
	let fieldName = '';
	arrDoc.forEach((txt, index) => {
		keywords.forEach((item) => {
			if (item.words) {
				let srh = txt.search(item.words);
				if (txt.length < 70 && srh >= 0) {
					fieldName = item.name;
				}
			}
		});
		if (fieldName == '' && index == 0) {
			keyWPos.push({ field: 'post_title', arrPosition: index });
		};
		if (fieldName == '' && index == 1) {
			keyWPos.push({ field: '_general', arrPosition: index });
		};
		if (fieldName != '') {
			keyWPos.push({ field: fieldName, arrPosition: index });
		};
	});
	return keyWPos;
};


function cleanArray(a) {
	let arr = [];
	a.forEach((item) => { if (item) { arr.push(item) } });
	return arr;
};


function textExtractFyField(docArray, positions) {
	let obj = new Object;
	positions.forEach((item) => {
		obj[item.field] += docArray.slice(item.arrPosition, item.arrPosition + 1) + ' ';
		obj[item.field] = obj[item.field].replace('undefined', '')
	});
	return obj;
};

module.exports = parser;
