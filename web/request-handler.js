var path = require('path');
var archive = require('../helpers/archive-helpers');
var url = require('url');
var helpers = require('./http-helpers.js');
var fs = require('fs');

// require more modules/folders here!

var router = {
	'/':'/public/index.html',
	'/styles.css':'/public/styles.css'
};

var siteList = '';

fs.readFile(__dirname + '/archives/sites.txt', function(err, content){
	if(err){
		console.log(err);
	} else {
		siteList = JSON.parse(content);
	}
});

exports.handleRequest = function (req, res) {
  var dir = url.parse(req.url).pathname;
  if(router[dir]){

  	if(req.method === 'POST'){
  		var stringifiedData = "";
  		req.on('data', function(chunk){
  			stringifiedData += chunk;
  		});
  		req.on('end', function(){
  			siteList[stringifiedData.slice(4)] = 'In progress';
  			helpers.writeDocument(siteList, __dirname + '/archives/sites.txt');
  		});
  	}
	helpers.serveAssets(res, __dirname + router[dir]);	
  }
  
  // res.end(archive.paths.list);
};
