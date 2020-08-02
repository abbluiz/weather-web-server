const request = require('request');

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=96e98eb542fcede3abea0b63bad67032&query=' + latitude + ',' + longitude;

    request({ url, json: true }, (error, {body}) => {

        if (error) {
            callback('Unable to connect to weather service.', undefined);
        } else if (body.error) {
            callback('Unable to find location.', undefined);
        } else {

            callback(undefined, {

                weatherDescription: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelsLike: body.current.feelslike 

            });
        
        }

    });

};

module.exports = forecast;