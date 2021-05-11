const path = require('path')
const fs = require('fs')
const indent = 4



for (let date of fs.readdirSync( path.join(__dirname, '.') ).filter(e=> /\d{4}-\d{2}-\d{2}/.test(e))){

for(let file of fs.readdirSync(path.join(__dirname, date,'currencies'))){
  let filePath = path.join(__dirname, date,'currencies',file)
  if(fs.statSync(filePath).isDirectory()){

    for(let innerfile of fs.readdirSync(filePath))
    {
      let innerfilePath  = path.join(filePath,innerfile)
      saveDate(innerfilePath, date)
      
    }



  }else
    saveDate(filePath, date)
  
 

}



}


function saveDate(filePath, date){
  let jsonval = JSON.parse(fs.readFileSync(filePath).toString())
  let savejson = {};
  savejson['date'] = date;
  for(let [key,value] of Object.entries(jsonval))
  savejson[key]= value

  if (filePath.endsWith('.min.json'))
  fs.writeFileSync(filePath, JSON.stringify(savejson))
  else if(filePath.endsWith('.json'))
  fs.writeFileSync(filePath, JSON.stringify(savejson, null, indent))

}
