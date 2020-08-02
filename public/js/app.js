// fetch('http://puzzle.mead.io/puzzle').then((response) => {

//     response.json().then((data) => {
//         console.log(data);
//     });

// });

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

// messageOne.textContent = 'From JavaScript';

weatherForm.addEventListener('submit', (event) => {

    event.preventDefault();

    const location = search.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch('http://localhost:3000/weather?address=' + encodeURIComponent(location)).then((response) => {
   
        response.json().then((data) => {
        
            if(data.error) {

                messageOne.textContent = data.error;
                messageTwo.textContent = '';
            
            } else {

                messageOne.textContent = data.location;
                messageTwo.textContent = 'Weather description: ' + data.forecast.weatherDescription + '. Temperature: ' + data.forecast.temperature + '. Feels like: ' + data.forecast.feelsLike + '.';

            }

        });
        
    });

});