var http = require('http');
var fs = require('fs');
var helpers = require('./archive-helpers.js');
var httphelpers = require ('../web/http-helpers.js');

var siteList = '';

var sitesToScrape = [];

fs.readFile('../web/archives/sites.txt', function(err, content){
	if(err){
		console.log(err);
	} else {
		siteList = JSON.parse(content);
		for(var key in siteList){
			console.log(key);
			if(siteList[key] === "In progress"){
				sitesToScrape.push([key])
			}
		}
		scrapingSites();
		//write results to sites.txt
	}
});





var scrapingSites = function(){
	// Pop off site
	// Do all the work
	// On end, call it again
	// Base case: sitesToScrape.length = 0
	var key = sitesToScrape[0];
	http.get('http://'+key, function(res){
		var dataString = '';
		res.on('data', function(chunk){
			dataString += chunk;
		});
		res.on('end', function(){
			helpers.writeToArchive(key, dataString);
			siteList[key] = "Completed";
			httphelpers.writeDocument(siteList, '../web/archives/sites.txt'); //this prolly ain gonna work
			if(sitesToScrape.length > 1){
				sitesToScrape.shift();
				scrapingSites();
			}
			// httphelpers.writeDocument(JSON.stringify(siteList),)
			// loopThroughSites();

		});
	}).on('error', function(e){
		console.log("This shit is whack");
		siteList[key] = "Not Found";
		httphelpers.writeDocument(siteList, '../web/archives/sites.txt');
		if(sitesToScrape.length > 1){
			sitesToScrape.shift();
			scrapingSites();
		}
	});				
}
