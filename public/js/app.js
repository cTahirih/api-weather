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
          // success: function(data) {
          //   console.log(data.daily);
          // }
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
    let rspWeek = data.daily.data;
    let getIcon = rspToday.icon;
    console.log(getIcon);
    imgWeather.attr('src', `assets/images/${getIcon}.png`);
    
    console.log(rspToday);

    console.log(rspWeek);
  }


  btnPredic.on('click', getLocation);
});


