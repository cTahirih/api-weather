$(document).ready(function(params) {
 
  const btnPredic = $('#btn-prediction'); 
  const boxPrediction = $('#weather-box'); 
  const days = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', ' Domingo', 'Lunes'];

  function getLocation() {
    if (navigator.geolocation) {
      // obteniendo la posicion en la que actualmente me encuentro. Utilizando el getCurrentPosition que tiene  como parametro a una funcion
      navigator.geolocation.getCurrentPosition(function(position) {
        // declarando  variable tipo object de alcance limitado ya que es una variable local
        let myLocation = { // object con dos propiedades
          lat: position.coords.latitude, // key: lat y value: la posicion de mi latitud en coordenadas
          lng: position.coords.longitude // key: lng y value: la posicion de mi longitud en coordenadas
        };
        console.log(myLocation);
        // Esta API permite solicitudes de origen cruzado a cualquier parte. Las cookies estan deshabilitadas
        let proxy = 'https://cors-anywhere.herokuapp.com/';
        /* La API de Dark Sky le permite buscar el clima en cualquier parte del mundo, volviendo (donde esté disponible):
        Condiciones climáticas actuales
        Proyecciones minuto a minuto de hasta una hora
        Pronósticos de hora a hora y día a día hasta siete días
        Observaciones hora por hora y día a día que se remontan a décadas*/
        let apiLinkDS = `https://api.darksky.net/forecast/133ef44c6b580d317343f1b7dca221e0/${myLocation.lat},${myLocation.lng}?units=si`;
        // Usando el metodo .ajax para peticiones asincronas
        $.ajax({
          // concatenando las dos url que hacen el llamado de las apis correspondientes
          url: proxy + apiLinkDS,
          // el valor hace el llamado a la funcion getweather
          success: getWeather
        });
      });
      // caso contrario de la condicional si el navegador no tiene la propiedad geolocation, entonces se dice que geolocation no es soportado por el navegador
    } else {
      demo.innerHTML = 'Geolocation is not supported by this browser.';
    }
  }

  // funcion statement con un solo parametro(data)->obteniendo datos de la api en un object de javascript
  function getWeather(data) {
    console.log(data);
    // declarando variables de alcance localizacion
    let boxInfoPrediction = $('.info-time');
    // recorriendo el object por medio de sus propiedades
    let rspToday = data.currently; // datos actuales
    let rspWeek = data.daily.data;
    let getIcon = rspToday.icon;
    let summary = rspToday.summary;

    // incluyendo html desde js, insertandole los datos obtenidos de las correspodiente API mediante la concatenacion de comillas invertidas
    const predictionDay = `
    <div class = "row">
      <div class="col-12 d-flex justify-content-center">
        <img class="d-block" src="assets/images/${getIcon}.png">
      </div>
    </div>
    <div class="row">
      <div class="col-8 offset-2 text-center title">
        <h2>${rspToday.temperature}°-${summary}</h2>
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
    // El método append () inserta contenido especificado al final de los elementos seleccionados, este sera dentro de la caja de informcion de predicciones
    boxInfoPrediction.append(predictionDay);

    // al hacer el evento click en el boton(llamada por selector tipo id btn-more) solo se permitira una vez por ello ponemos el .one
    $('#btn-more').one('click', function() {
      // haciendo iteraccion dia a dia de los elementos del array para insertar el contenido de los iconos y la temperatura maxima o minima
      rspWeek.forEach((element, index) => {
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

  // solo una vez nos ejecutara el evento click de la peticion de ubicacion
  btnPredic.one('click', getLocation);
});
