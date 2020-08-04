const request=require('postman-request')

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?limit=1&access_token=pk.eyJ1IjoiYWJoaS1sdWx1IiwiYSI6ImNrZDRucmdhMjF5dHcydXBndW9xY21xNXEifQ.uL7p7xahyr97fXmfXhjjqQ"

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('unable to connect to location services!', undefined)
        }
        else if (response.body.features.length === 0) {
            callback("unable to find location.Try another search", undefined)
        }
        else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })

}



module.exports=geocode