$(document).ready(function(params) {
  const btnPredic = $('#btn-prediction');
  const boxPrediction = $('#weather-box');
  const days = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', ' Domingo'];

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var myLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        console.log(myLocation);
        var proxy = 'https://cors-anywhere.herokuapp.com/';
        var apiLinkDS = `https://api.darksky.net/forecast/133ef44c6b580d317343f1b7dca221e0/${myLocation.lat},${myLocation.lng}?units=si`;

        $.ajax({
          url: proxy + apiLinkDS,
          success: getWeather
        });
      });
    } else {
      demo.innerHTML = 'Geolocation is not supported by this browser.';
    }
  }

  function getWeather(data) {
    console.log(data);
    let imgWeather = $('.img-weather');
    let boxInfoPrediction = $('.info-time');
    let rspToday = data.currently;
    let rspCity = data.timezone;
    let rspWeek = data.daily.data;
    let getIcon = rspToday.icon;

    let cut = rspCity.indexOf('/');
    let city = rspCity.substr(cut + 1);

    const predictionDay = `
    <div class = "row">
      <div class="col-12 d-flex justify-content-center">
        <img class="d-block" src="assets/images/${getIcon}.png">
      </div>
    </div>
    <div class="row">
      <div class="col-8 offset-2 text-center title">
        <h2>${rspToday.temperature}°-${city}</h2>
      </div>
      <div class="text-left col-8 offset-2 col-md-6 offset-md-3 col-lg-4 offset-lg-4 box-1">
        <p>Sensación Térmica: <span>${rspToday.apparentTemperature}</span></p>
        <p>Humedad: <span>${rspToday.humidity}</span></p>
        <p>Viento: <span>a ${rspToday.windSpeed} m/s</span></p>
      </div>
      <div class="col-12 d-flex justify-content-center mt-3 mb-3">
        <input class="btn btn-green" type="button" value="Ver más" id="btn-more">
      </div>
    </div>
    `;
    boxInfoPrediction.append(predictionDay);

    $('#btn-more').one('click', function() {
      week = rspWeek.slice(0, 7);
      week.forEach((element, index) => {
        console.log(element);
        const newsRsult = `
          <div class="col-12 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
            <div class = "row">
                <div class="col-2">
                  <p>${days[index]}</p>
                </div>
                <div class = "col-2">
                  <img class="img-fluid" src="assets/images/${element.icon}.png">
                </div>
                <div class = "col-4">
                  <p class="">Max.<span>${element.temperatureMax}°</span></p>
                </div>
                <div class = "col-4">
                  <p class="">Min.<span>${element.temperatureMin}°</span></p>
                </div>
            </div>
          </div>
        `;
        $('.box-week').append(newsRsult);
      });
    });
  }


  btnPredic.one('click', getLocation);
});
