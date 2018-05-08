var lat;
var long; 
var units = 'metric';

var getUnitSymbol = function(units){
  if(units === 'imperial')
    return '&deg; F'
  else
    return '&deg; C'
}

var constructImageURL = function(id){
  return 'url(http://openweathermap.org/img/w/'+ id +'.png)'
}

var constructWeatherURL = function(lat, long, units){
        // get weather for this location and populate the fields
  var api_key = '91f4e829855e2e11dd75cbfd1616be1d'
  var api_endpoint = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + long
        + '&units=' + units
        + '&APPID=' + api_key;
  return api_endpoint;
}

var updateWeather = function(units){
  
  $('.content').hide();
  // get weather using weather api
          $.get(
              constructWeatherURL(lat, long, units),                          
              function(data){
                  var today; 
                  var tomorrow;
                  var todayDate = (new Date()).toISOString().substr(0, 10);
                  var tomorrowDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().substr(0, 10);
                  
                  // extract today and tomorrow data
                  data.list.map(function(weather){
                      if(weather.dt_txt.substr(0, 10) === todayDate)
                        today = weather;
                      if(weather.dt_txt.substr(0, 10) === tomorrowDate)
                        tomorrow = weather;
                  });
                
                console.log(data, today, tomorrow);
                
                  // update fields for today
                  $('.today .max-temp').html(today.main.temp_max.toFixed(1) + getUnitSymbol(units));
                  $('.today .min-temp').html(today.main.temp_min.toFixed(1) + getUnitSymbol(units));
                  $('.today .icon').css(
                      { 'background-image':   constructImageURL(today.weather[0].icon)
                      })
                  $('.today .note').html(today.weather[0].description);
 
                  // update for tomorrow
                  $('.tomorrow .max-temp').html(tomorrow.main.temp_max.toFixed(1) + getUnitSymbol(units));
                  $('.tomorrow .min-temp').html(tomorrow.main.temp_min.toFixed(1) + getUnitSymbol(units));
                  $('.tomorrow .icon').css(
                      { 'background-image':   constructImageURL(tomorrow.weather[0].icon)
                      })
                  $('.tomorrow .note').html(tomorrow.weather[0].description);

                  $('.content').show();
                  
         });

}

$(document).ready(function(){
  
  $('.max-temp').click(function(){
    units = (units == 'metric') ? 'imperial' : 'metric';
    updateWeather(units);
  })
  
  $('#cel').click(function(evt){
    $('#cel').addClass('selected');
    $('#fah').removeClass('selected');
    units = 'metric';
    updateWeather(units);
  })

  $('#fah').click(function(evt){
    $('#fah').addClass('selected');
    $('#cel').removeClass('selected');
    units = 'imperial';
    updateWeather(units);
  })
  
  // get the user's location
  $.get("http://ipinfo.io",       
      function(response) {
    
          //console.log(response.city + ", " +  response.loc);
          response.loc = response.loc.split(",");

          $('.today .title').html(response.city);

          // update location fields
          $('.location').html(
              "Latitude: " + 
              parseFloat(response.loc[0]).toFixed(2) +
              "<br>Longitude: " +
              parseFloat(response.loc[1]).toFixed(2)
          );

          lat = response.loc[0];
          long = response.loc[1];
          updateWeather('metric');
 
      }, "jsonp");

});