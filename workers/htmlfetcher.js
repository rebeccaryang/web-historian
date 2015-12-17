var http = require('http');
var fs = require('fs');
var helpers = require('./archive-helpers.js');

var siteList = '';

fs.readFile(__dirname + '/../archives/sites.txt', function(err, content){
	if(err){
		console.log(err);
	} else {
		siteList = JSON.parse(content);
	}
});


for(var key in siteList){

	if(siteList[key] === "In progress"){

		http.get(key, function(res){
			var dataString = '';
			res.on('data', function(chunk){
				dataString += chunk;
			});
			res.on('end', function(){
				helpers.writeToArchive(key, dataString);
			});
		});
	}
}