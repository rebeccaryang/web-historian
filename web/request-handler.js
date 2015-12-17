var path = require('path');
var archive = require('../helpers/archive-helpers');
var url = require('url');
var helpers = require('./http-helpers.js');

// require more modules/folders here!

var router = {
	'/':'/public/index.html',
	'/styles.css':'/public/styles.css'
};

exports.handleRequest = function (req, res) {
  var dir = url.parse(req.url).pathname;
  if(router[dir]){
	  helpers.serveAssets(res, __dirname + router[dir]);	
  }
  
  // if(dir === '/'){
	 //  helpers.getFile(__dirname +'/public/index.html', 'utf8', function(err, results){
		//   	if(err){
		//   		res.statusCode = 500;
		//   		res.end(err);
		//   	} else {
		//   		res.statusCode = 200;
		// 		res.end(results);
		//   	}
		//   });

  // }

  // if(dir === '/styles.css'){
  // 		helpers.getFile(__dirname + '/public/styles.css', 'utf8', function(err, results){
  // 		if(err){
  // 			res.statusCode = 500;
  // 			res.end(err);
  // 		} else {
  // 			res.statusCode = 200;
  // 			res.end(results);
  // 		}
  // 	});
  // }

  // res.end(archive.paths.list);
};
