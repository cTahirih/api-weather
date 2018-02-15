$(document).ready(function(params) {
  const btnPredic = $('#btn-prediction');
  const boxPrediction = $('#weather-box');
  const days = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', ' Dominngo'];

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
    //
    // const newsRsult = `
    // <div class = "mt-2 mb-2 pt-2 pb-2 pl-2 pr-2">
    //   <div class = "col-1">
    //     <img class="img-fluid rounded" src="../assets/images/${element.icon}.png">
    //   </div>
    //   <div class = "row">
    //     <div class = "col-6">
    //       <p class="text-justify">${element.temperatureMax}</p>
    //     </div>
    //     <div class = "col-6">
    //       <p class="text-justify">${element.temperatureMin}</p>
    //     </div>
    //   </div>
    // </div>
    // `;
    // boxInfoPrediction.append(newsRsult);

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

    week = rspWeek.slice(0, 7);
    week.forEach((element, index) => {
      console.log(element);
      const newsRsult = `
      <div class = "row">
        <div class="col-2">
          <p>${days[index]}</p>
        </div>
        <div class = "col-2">
          <img class="img-fluid" src="assets/images/${element.icon}.png">
        </div>
        <div class = "col-4">
          <p class="text-justify">Temperatura Max.<span>${element.temperatureMax}</span></p>
        </div>
        <div class = "col-4">
          <p class="text-justify">Temperatura Min.<span>${element.temperatureMin}</span></p>
        </div>
        </div>
      </div>
      `;
      $('.box-week').append(newsRsult);
    });
  }


  btnPredic.on('click', getLocation);
});
