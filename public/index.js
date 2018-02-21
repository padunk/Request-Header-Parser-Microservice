var ip = require('ip');
var http = require('http');
var parser = require('ua-parser-js');

module.exports = function (app) {

  var result = {
    "ipaddress": null,
    "language": null,
    "software":null
  };
  
  app.get('/api/whoami', function(req, res) {
    var myIp = ip.address();
    var lang = req.headers["accept-language"].split(',')[0];
    var ua = parser(req.headers['user-agent']);
    
    result.ipaddress = myIp;
    result.language = lang;
    result.software = ua.ua.match(/\(.+?\)/)[0];
    
    res.end(JSON.stringify(result));
  });
}
