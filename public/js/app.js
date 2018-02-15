$(document).ready(function(params) {
  const btnPredic = $('#btn-prediction');
  const boxPrediction = $('#weather-box');

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

    let getTmp = $('<h1/>', {
      'class': 'tmp'
    }).text(rspToday.temperature + '°' + '-' + city);
    $('#tmp').append(getTmp);
    let getSensationTmp = $('<p/>', {
      'class': 'tmp'
    }).text('Sensación Térmica: ' + rspToday.apparentTemperature);
    boxInfoPrediction.append(getSensationTmp);
    let getHumidity = $('<p/>', {
      'class': 'tmp'
    }).text('Humedad: ' + rspToday.humidity);
    boxInfoPrediction.append(getHumidity);

    let getWindSpeed = $('<p/>', {
      'class': 'tmp'
    }).text('Viento: a ' + rspToday.windSpeed + ' m/s');
    boxInfoPrediction.append(getWindSpeed);
    imgWeather.attr('src', `assets/images/${getIcon}.png`);
  }


  btnPredic.on('click', getLocation);
});


