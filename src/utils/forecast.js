const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=818a8cf49cb0c8f747d3ec1c4aa3caa9&query=' + latitude + ',' + longitude + '&units=m'
    request({url,json : true}, (error,response) => {
        if(error){
            callback('Unable to provide the forecast service')
        } else if(response.body.error){
            callback('Unable to find location to provide forecast')
        } else{
            callback(undefined,response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' degrees out. It feels like ' + response.body.current.feelslike + ' degrees out.')
        }
    })
}

module.exports = forecast