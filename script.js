const searchBox = document.querySelector('.search-box');
const input = searchBox.querySelector('input');
const button = searchBox.querySelector('button');
const days = document.querySelectorAll('.day');

// OpenWeatherMap API key
const apiKey = 'adc9a277ecafb4ab74d7d061342c50af';
// Function to get the weather data for a given city
const getWeatherData = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };
  
  // Function to update the weather information for each day
  const updateWeatherInfo = (data) => {
    days.forEach((day, index) => {
      const date = new Date(data.list[index].dt_txt);
      const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
      const icon = `https://openweathermap.org/img/wn/${data.list[index].weather[0].icon}.png`;
      const highTemp = data.list[index].main.temp_max.toFixed(0);
      const lowTemp = data.list[index].main.temp_min.toFixed(0);
      day.querySelector('h2').textContent = dayOfWeek;
      day.querySelector('img').setAttribute('src', icon);
      day.querySelector('p:nth-of-type(1)').textContent = `High: ${highTemp}°C`;
      day.querySelector('p:nth-of-type(2)').textContent = `Low: ${lowTemp}°C`;
    });
  };
  
  // Event listener for the search button
  button.addEventListener('click', async () => {
    const city = input.value.trim();
    if (city) {
      try {
        const weatherData = await getWeatherData(city);
        updateWeatherInfo(weatherData);
      } catch (error) {
        console.error(error);
        alert('Unable to get weather data. Please try again later.');
      }
    } else {
      alert('Please enter a city name.');
    }
  });
  
  // Default city
  const defaultCity = 'london';
  getWeatherData(defaultCity).then(updateWeatherInfo).catch(console.error);
  
  