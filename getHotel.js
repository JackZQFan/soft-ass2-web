const apiKey = '5ec845e9f3msh2e96f4f809d32bcp1b05cajsna0b8e9a90b0f';
const baseUrl = 'https://booking-com.p.rapidapi.com/v2/hotels/search';
let pageNumber = 0;
function getHotels() {
  const city = document.getElementById('city').value;
  const checkin = new Date(document.getElementById('checkin').value).toISOString().slice(0, 10);
  const checkout = new Date(document.getElementById('checkout').value).toISOString().slice(0, 10);
  const currency = document.getElementById('currency').value;
  const adultsNumber = document.getElementById('adults_number').value;


  if (adultsNumber < 1) {
    console.error('The number of adults should be at least 1.');
    return;
  }

  const url = `${baseUrl}?order_by=popularity&adults_number=${adultsNumber}&checkin_date=${checkin}&filter_by_currency=${currency}&locale=en-gb&checkout_date=${checkout}&units=metric&room_number=1&include_adjacency=true&children_number=2&page_number=${pageNumber}&children_ages=5%2C0&categories_filter_ids=class%3A%3A2%2Cclass%3A%3A4%2Cfree_cancellation%3A%3A1&dest_id=`;


  const locationIdUrl = `https://booking-com.p.rapidapi.com/v1/hotels/locations?name=${city}&locale=en-gb`;

  const locationIdSettings = {
    async: true,
    crossDomain: true,
    url: locationIdUrl,
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'booking-com.p.rapidapi.com',
    },
  };

  $.ajax(locationIdSettings).done(function (response) {
    const locationId = response[0].dest_id;
	const destType = response[0].dest_type;
    // const hotelUrl = url + locationId;
	const hotelUrl = `${url}${locationId}&dest_type=${destType}`;


    const hotelSettings = {
      async: true,
      crossDomain: true,
      url: hotelUrl,
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'booking-com.p.rapidapi.com',
      },
    };

    $.ajax(hotelSettings).done(function (response) {
      let hotelList = '';

      for (let hotel of response.results) {
        hotelList += 'Hotel Name: ' + hotel.name + '<br>';
        hotelList += 'Price: ' + hotel.priceBreakdown.grossPrice.currency + ' ' + hotel.priceBreakdown.grossPrice.value.toFixed(2) + '<br>';
        hotelList += 'Review Score: ' + hotel.reviewScore + ' (' + hotel.reviewScoreWord + ')<br>';
        hotelList += 'Latitude: ' + hotel.latitude + ', Longitude: ' + hotel.longitude + '<br>';
        hotelList += 'Check-in: ' + hotel.checkin.fromTime + ' - ' + hotel.checkin.untilTime + '<br>';
        hotelList += 'Check-out: ' + hotel.checkout.fromTime + ' - ' + hotel.checkout.untilTime + '<br><br>';
      }

      document.getElementById('hotellist').innerHTML = 'Hotel List:<br>' + hotelList
      document.getElementById('page-number').textContent = `Page: ${pageNumber + 1}`;
      document.getElementById('pagination').style.display = 'block';

  });
});
}  

function prevPage() {
  if (pageNumber > 0) {
    pageNumber--;
    getHotels();
  }
}

function nextPage() {
  pageNumber++;
  getHotels();
}
