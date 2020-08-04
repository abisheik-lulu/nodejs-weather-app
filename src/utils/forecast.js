const request = require('postman-request')


const forecast = (lat, long, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=15e2866b28566203dad1dd4a221a42f3&query=" + lat + "," + long

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback(undefined, "unable to connect to weather service")
        }
        else if (response.body.error) {
            callback(undefined, "unable to find the location")
        }
        else {
            callback(undefined,
                response.body.current.weather_descriptions[0] + " .It is currently " +
                response.body.current.temperature + " degrees out." + " It feels like " +
                response.body.current.feelslike + " degrees out." + " The humidity is " +
                response.body.current.humidity + "%.")
        }
    })
}

module.exports = forecast










