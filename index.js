var request = require('request');
var cheerio = require('cheerio');
var path = require('path');
var fs = require ('fs');
var url = require('url');
// var url = process.argv[2];


var url_address = 'http://substack.net/images/';

request(url_address, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var page = body;
    $ = cheerio.load(page);
    
    var rows =  $('tr');

    filename = url.parse(url_address).hostname + '.csv';

    fs.writeFile(filename,"filePermission, AbsURL, fileType\n");

    rows.each(function(_, el) {
      var filePermission = $(el).find('code').first().text();
      var absUrl = url_address + $(el).find('a').text();
      var fileType =  path.extname($(el).find('a').text()).substr(1);
      data = filePermission + ',' + absUrl + ','+ fileType + '\n';
      fs.appendFile(filename, data)
    });
  }
})

