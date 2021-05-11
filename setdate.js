const glob = require("glob");
const path = require('path')
const fs = require('fs')
const indent = 4

var getDirectories = function (src, callback) {
  glob(src + '/**/*', callback);
};


for (let date of fs.readdirSync( path.join(__dirname, '.') ).filter(e=> /\d{4}-\d{2}-\d{2}/.test(e))){

getDirectories(path.join(__dirname, date,'currencies'), function (err, res) {
  if (err) {
    console.log('Error', err);
  } else {
    for(let dirval of res.filter(e=>e.endsWith('.json'))){
        let jsonval = fs.readFileSync(dirval).toString()
        jsonval = JSON.parse(jsonval)
        jsonval['date'] = date
        if (dirval.endsWith('.min.json'))
        fs.writeFileSync(dirval, JSON.stringify(jsonval))
        else
        fs.writeFileSync(dirval, JSON.stringify(jsonval, null, indent))
      
    }      
  }
});

}
