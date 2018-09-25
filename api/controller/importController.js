var fs = require('fs');
var parse = require('csv-parse');

var parser = parse({ delimiter: ';' }, function (err, data) {
  // when all countries are available,then process them
  // note: array element at index 0 contains the row of headers that we should skip
  data.forEach(function (line) {
    // create country object out of parsed fields
    var country = {
      "name": line[0]
      , "code": line[1]
      , "continent": line[2]
      , "population": line[4]
      , "size": line[5]
    };
    console.log(JSON.stringify(country));
  });
});