var textL = $("#city")
var inCity = $("#cityLabel");
var apiNew ="";

function getTemp(){
    event.preventDefault()
    if (textL.val()) {
      var place = textL.val().trim()
      getDir(place);
      textL.val('')
    }
    else {
        inCity.text("WRONG!");
        resetVal();
    } 
}

function getDir(place) {
    var sRoute = geoAPI + "?q=" + city + "&limit=1&appid=" + apiNew;
    fetch(sRoute).then(function(response) {
      if (response.ok) {
        response.json().then(function(data) {
          if (Object.keys(data).length === 0) {
    
            inCity.text("WRONG! YOU LOSE!");
            resetVal();
          }
          else {
            inCity.text(data[0].name + ", " + data[0].state + ", " + data[0].country);
            lat = data[0].lat;
            lon = data[0].lon; 
            getWeather(place);
          
          }
        })
      }
      else alert("Unable to connect, please try again later.");
    })
    .catch(function(error) {
      alert("Unable to connect, please try again later.");
    })
  

}

function getWeather() {
  

    
}

function newSearches() {
 
}

function deleteAll() {
  
}

function setSearch() {
 
}

function getCity() {

}

function newVal() {
 
}

function setForecast() {

 
}