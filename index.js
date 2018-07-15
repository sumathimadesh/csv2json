const https = require('https')
const fs = require('fs')
const path = require('path')
const uuidv1 = require('uuid/v1')

const csvtojson=require('csvtojson')

const downloadPage = (url='https://prod-edxapp.edx-cdn.org/assets/courseware/v1/07d100219da1a726dad5eddb090fa215/asset-v1:Microsoft+DEV283x+2T2018+type@asset+block/customer-data.csv') => {
  console.log('downloading ', url)
  const fetchPage = (urlF, callback) => {
    https.get(urlF, (response) => {
      let buff = ''
      response.on('data', (chunk) => { 
        buff += chunk
      })
      response.on('end', () => {
        callback(null, buff)
      })
    }).on('error', (error) => {
      console.error(`Got error: ${error.message}`)
      callback(error)
    })
  }
  const folderName = uuidv1()
  fs.mkdirSync(folderName)
  fetchPage(url, (error, data)=>{
    if (error) return console.log(error)
    fs.writeFileSync(path.join(__dirname, folderName, 'csvfile.csv'), data)
  	
	let fileInputPath = path.join(__dirname, folderName, 'csvfile.csv'); 
		
	const csvFilePath=folderName		
		csvtojson().fromFile(fileInputPath)
					.then((jsonObj)=>{
						fs.writeFileSync(path.join(__dirname, folderName, 'jsonfile.json'), JSON.stringify(jsonObj,null, 2))
				})
		
		
		});
  
}

downloadPage(process.argv[2])