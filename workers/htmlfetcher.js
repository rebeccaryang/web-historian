var http = require('http');
var fs = require('fs');
var helpers = require('./archive-helpers.js');
var httphelpers = require ('../web/http-helpers.js');
var cronjob = require('cron').CronJob;

var siteList = '';

var sitesToScrape = [];

var job = new cronjob({
	cronTime: '01 * * * * *',
	onTick: function(){
		console.log("Cronjob running!")
		findSites();
	},
	start: true
});

var findSites = function(){
	fs.readFile('../web/archives/sites.txt', function(err, content){
		if(err){
			console.log(err);
		} else {
			siteList = JSON.parse(content);
			for(var key in siteList){
				if(siteList[key] === "In progress"){
					sitesToScrape.push([key])
				}
			}
			if(sitesToScrape.length > 0){
				scrapingSites();	
			}
			//write results to sites.txt
		}
	});	
}



var scrapingSites = function(){

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

		});
	}).on('error', function(e){
		siteList[key] = "Not Found";
		httphelpers.writeDocument(siteList, '../web/archives/sites.txt');
		if(sitesToScrape.length > 1){
			sitesToScrape.shift();
			scrapingSites();
		}
	});				
}