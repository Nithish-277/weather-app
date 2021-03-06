const request = require('request')

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoibml0aGlzaC0yNzciLCJhIjoiY2t4aXdrNTRkNjhobzJ4bGF1YWFiYnpwYiJ9.mRgqn1JRuFSs6Ut2N9n7Mw&limit=1'
    request({url,json:true},(error,{body}) => {
        if(error) {
            callback('Unable to connect location services!')
        } else if(body.features.length===0){
            callback('Unable to find location, try with another search')
        } else {
            callback(undefined,{
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    })
}

module.exports = geocode