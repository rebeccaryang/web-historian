var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

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
      res.end(callback(content));
    } else {
      res.statusCode = 200;
      res.end(content);
    }
  })
};

// exports.getFile = function(path, scheme, callback){
//   var results;
//   fs.readFile(path, scheme, function(err,content){
//     if(!err){
//       return callback(err,content);
//     } else {
//       console.log(err);
//       return callback(err);
//     }

//     // return callback(err,results);
//   });
// }



// As you progress, keep thinking about what helper functions you can put here!
