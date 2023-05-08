const apiKey_2 = "796ff0431510819b5471cf4f8c396c49";
const baseUrl_2 = "https://api.openweathermap.org/data/2.5/forecast";
function getweatherList() {
  const cityName = document.getElementById("city").value;
  const startDate = document.getElementById("checkin").value;
  const endDate = document.getElementById("checkout").value;

  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);
  const daysBetween = Math.ceil((endDateObj - startDateObj) / (1000 * 60 * 60 * 24));

  if (daysBetween > 16) {
    alert("Weather forecast is only available for 16 days. Please choose a shorter period.");
    return;
  }

  const requestUrl = `${baseUrl_2}?q=${cityName}&appid=${apiKey_2}&units=metric`;

  fetch(requestUrl)
    .then((response) => response.json())
    .then((data) => {
      const weatherListElem = document.getElementById("weatherlist");
      weatherListElem.innerHTML = "";

      let currentDay = startDateObj;
      for (let i = 0; i < daysBetween; i++) {
        const dailyData = data.list.filter((item) => {
          const itemDate = new Date(item.dt_txt);
          return itemDate.toDateString() === currentDay.toDateString();
        });

        if (dailyData.length > 0) {
          const minTemperature = Math.min(...dailyData.map((item) => item.main.temp_min));
          const maxTemperature = Math.max(...dailyData.map((item) => item.main.temp_max));
          const weatherCondition = dailyData[0].weather[0].description;
          const weatherIcon = `https://openweathermap.org/img/wn/${dailyData[0].weather[0].icon}.png`;

          const weatherItemElem = document.createElement("p");
          weatherItemElem.innerHTML = `Weather in ${cityName} on ${currentDay.toISOString().substring(0, 10)}: ${weatherCondition}
           <img src="${weatherIcon}">, Temperature: ${minTemperature.toFixed(1)}°C - ${maxTemperature.toFixed(1)}°C`;
          weatherListElem.appendChild(weatherItemElem);
        }
        currentDay.setDate(currentDay.getDate() + 1);
      }
    })
    .catch((error) => console.error(error));
}
