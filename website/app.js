// Global variables
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = '0970d6e3eac52eea3dabf245a0139e16&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener for the #generate button
document.getElementById('generate').addEventListener('click', async () => {
    // Get zip code from user input
    const zipCode = getZipCode();
    // Get weather data from OpenWeatherMap API, wait for async function to finish
    const weatherData = await getWeatherData(baseUrl, zipCode, apiKey);
    console.log(weatherData);
    postData('/', { 
        temperature: weatherData.main.temp,
        date: newDate, 
        userResponse: document.getElementById('feelings').value 
    })
    .then(retrieveData)
    .catch(error => console.log('error', error));
  });

// Get zip code from user input
const getZipCode = () => {
    const zipInput = document.getElementById('zip');
    return zipInput.value;
}

// Async function to get weather data from OpenWeatherMap API
const getWeatherData = async (baseUrl, zipCode, apiKey) => {
    // url to fetch data from using zip code from user and API key from OpenWeatherMap
    const url = `${baseUrl}?zip=${zipCode}&appid=${apiKey}`;
    // fetch data from the url with async/await
    const response = await fetch(url);
    try {
      const data = await response.json();
      return data;
    } catch (error) {
      console.log('error', error);
    }
  };

// Async function to update UI with projectData
const retrieveData = async () =>{
    const request = await fetch('/all');
    try {
        // Transform into JSON
        const allData = await request.json()
        console.log(allData)
        // Write updated data to DOM elements
        document.getElementById('temp').innerHTML = allData.temperature + ' degrees F';
        document.getElementById('content').innerHTML = allData.feel;
        document.getElementById("date").innerHTML =allData.date;
    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
}

// POST data to server
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        return response;
    } catch (error) {
        console.log('error', error);
    }
}