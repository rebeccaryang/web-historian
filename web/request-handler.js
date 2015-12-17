var path = require('path');
var archive = require('../helpers/archive-helpers');
var url = require('url');
var helpers = require('./http-helpers.js');
var fs = require('fs');


//===================================
// Routes
var router = {
	'/':'/public/index.html',
	'/styles.css':'/public/styles.css',
	'/loading':'/public/loading.html'
};



// ===================================
// Create SiteList(memory)
var siteList = '';
fs.readFile(__dirname + '/archives/sites.txt', function(err, content){
	if(err){
		console.log(err);
	} else {
		siteList = JSON.parse(content);
	}
});



// ===================================
// Request Handler
exports.handleRequest = function (req, res) {
  var dir = url.parse(req.url).pathname;
  if(router[dir]){

  	if(req.method === 'POST'){
  		var stringifiedData = "";
  		req.on('data', function(chunk){
  			stringifiedData += chunk;
  		});
  		res.statusCode = 302;
  		req.on('end', function(){
  			//TO DO: Check if the key already exists!
  			siteList[stringifiedData.slice(4)] = 'In progress';
  			helpers.writeDocument(siteList, __dirname + '/archives/sites.txt');
  		});
  		helpers.serveAssets(res, __dirname + router['/loading']);
  	}

  	if(req.method === 'GET'){
		helpers.serveAssets(res, __dirname + router[dir]);		
  	}
  }
  
  // res.end(archive.paths.list);
};
