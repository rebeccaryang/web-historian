var path = require('path');
var fs = require('fs');
// var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset, callback) {
  fs.readFile(asset, function(err, content){
    if(err){
      res.statusCode = 500;
      res.end(err);
    } else if (callback){
      res.statusCode = 200;
      content = JSON.parse(content) || content;
      res.writeHead('content-type','text/html')
      res.end(callback(content));
    } else {
      res.statusCode = 200;
      res.end(content);
    }
  });
};

exports.writeDocument = function(data, asset) {
  fs.writeFile(asset, JSON.stringify(data), function(err){
    if(err){
      console.log(err);
    } else {
      console.log('File written successfully.. maybe...')
    }
  });
};



// As you progress, keep thinking about what helper functions you can put here!
