const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory path
app.use(express.static(publicDirectoryPath));

app.get('', (request, response) => {

    response.render('index', {
        
        title: 'Weather App',
        name: 'LABB'
    
    });

});

app.get('/about', (request, response) => {

    response.render('about', {

        title: 'About',
        name: 'LABB'

    });

});

app.get('/help', (request, response) => {

    response.render('help', {
       
        title: 'Help',
        name: 'LABB',
        errorMessage: 'Something went wrong'

    });

});

app.get('/weather', (request, response) => {

    if (!request.query.address) {

        return response.send({
            error: 'You must provide an address'
        });

    }

    geocode(request.query.address, (error, {latitude, longitude, location } = {}) => {

        if (error) {
            return response.send({ error });
        }

        forecast(latitude, longitude, (error, forecastData) => {

            if (error) {
                return response.send({ error });
            }

            response.send({

                forecast: forecastData,
                location,
                address: request.query.address

            });

        });

    });

});

app.get('/products', (request, response) => {

    if (!request.query.search) {

        return response.send({
            error: 'You must provide a search term'
        });
    
    }

    console.log(request.query.search);

    response.send({
        products: []
    });

});

app.get('/help/*', (request, response) => {

    response.render('404', {

        title: '404',
        name: 'LABB',
        errorMessage: 'Help article not found'

    });

});

app.get('*', (request, response) => {

    response.render('404', {

        title: '404',
        name: 'LABB',
        errorMessage: 'Page not found'

    });

});

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});