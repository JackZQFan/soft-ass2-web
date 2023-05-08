const apiKey_0 = '796ff0431510819b5471cf4f8c396c49';
const baseUrl_0 = 'https://api.openweathermap.org/data/2.5/weather';

function getCurWeather() {
  const city = document.getElementById('city').value;
  const url = `${baseUrl_0}?q=${city}&appid=${apiKey_0}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const weather = data.weather[0];
      const temperature = data.main.temp;
      const description = weather.description;
      const icon = weather.icon;

      const weatherList = document.getElementById('weatherlist');
      weatherList.innerHTML = `Current temperature in ${city}: ${temperature}°C\nWeather description: ${description}\nIcon: 
      <img src="http://openweathermap.org/img/w/${icon}.png">`;
    })
    .catch(error => console.error(error));
}
