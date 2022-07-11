var textL = $("#city")
var inCity = $("#cityLabel");

var newIcon = $('<img id="dynamic">');

//Span ID's
var getTemp = $("#getTemp");
var getWind = $("#getWind");
var getHumdty = $("#getHumdty");
var uvSpan = $("#UvIndex");

//API key
var apiNew ="5ee8272113a5ff9365424925e09a0196";


////////////////////////////////////////

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

////////////////////////////////////////

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

///////////////////////////////////////////

function getWeather() {
    var conditionGet = currentCondition + "?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&exclude=hourly,minutely,alerts&units=imperial";
  
    fetch(conditionGet).then(function(response) {
     
        if (response.status === 200) {
       
        response.json().then(function(data) {
          
            inCity.text(inCity.text() + ' (' + moment.unix(data.current.dt).format("MM/DD/YYYY") + ')');
          newIcon.attr('src', iconURL + data.current.weather[0].icon + ".png");
          newIcon.appendTo(inCity);

          set5dayForecast(data);
          getTemp.text(data.current.temp + '\u00B0 F');
          getWind.text(data.current.wind_speed+ ' MPH'); 
          getHumdty.text(data.current.humidity+ '%');
          var uvIndex = parseFloat(data.current.uvi);
          uvSpan.text(uvIndex);
  
          uvSpan.removeClass();
          switch (true) {
            case (uvIndex<3):
              uvSpan.addClass("rounded bg-success text-light");
              break;
            case (uvIndex>=3 && uvIndex<6):
              uvSpan.addClass("rounded bgYellow text-dark")
              break;
            case (uvIndex>=6 && uvIndex<8):
              uvSpan.addClass("rounded bg-warning text-light");
              break;
            case (uvIndex>=8 && uvIndex<11):
              uvSpan.addClass("rounded bg-danger text-light");
              break
            case (uvIndex>=11):
              uvSpan.addClass("rounded bgDarkMagenta text-light");
              break;
          }
          
        })
        saveCity(inCity.text().trim());
        showRecentSearches();
      }
      else alert("Unable to connect");
    })
    .catch(function(error) {
      alert("Unable to connect");
    })
    
}

/////////////////?///////////////

function newSearches() {
        var myDiv = document.getElementById("currentSearch");
        removePost(myDiv);
        if (localStorage.getItem('citySearch')) {
          existing = localStorage.getItem('citySearch').split(';');
          for (var i=0; i<existing.length; i++) {
            var searchClick = document.createElement("button");
            if (existing[i].trim().length>0) {
              searchClick.innerText = existing[i];
              searchClick.addEventListener('click', setCityAndSearch);
              myDiv.appendChild(searchButton);
            }
          }
        }
}

function removePost(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
  }

function deleteAll() {
  
}

