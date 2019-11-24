const request = require('request')

const forecast= (latitude, longitude, callback)=>{

    const url = 'https://api.darksky.net/forecast/4c8d46b81aa869c849004dbcb7d8c898/'+latitude+','+longitude
    request({ url, json: true},(error, {body})=>{
        if(error){
            callback('Unable to connect to weather service', undefined)
        }else if(body.error){
            callback('Unable to find location', undefined)
        }else if(!error ){
        //console.log(body.daily.data[0])
        callback(undefined, body.daily.data[0].summary+' It is currently '+body.currently.temperature+' degrees out. '+' Today High '+body.daily.data[0].temperatureHigh+' degrees, Low '+body.daily.data[0].temperatureLow+' degrees. There is a '+body.currently.precipIntensity+'% chance of '+body.currently.precipType+'.')
       }
        
    })
}

module.exports=forecast