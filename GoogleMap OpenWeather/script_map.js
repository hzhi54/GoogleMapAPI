
var map;
var directionsRenderer;
var directionsService;
var markerArray = [];
var usableMarkerArray = [];
var geocodeArray = [];
var weatherArray = [];
var usableWeatherArray = [];
var usableDataArray = [];

function initMap(){
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsService = new google.maps.DirectionsService();
    map = new google.maps.Map(document.getElementById('map'),{
        zoom: 12,
        center: {lat: 42.8864,lng: -78.8784}
    });
    directionsRenderer.setMap(map);                
}

function showRoute(){

    initMap();
        
    if(markerArray.length > 0){
        markerArray = [];
        usableMarkerArray = [];
        usableWeatherArray = [];
        weatherArray = [];
        geocodeArray = [];
    }
    directionsService.route({
        origin: document.getElementById('loc').value,
        destination: document.getElementById('des').value,
        travelMode: 'DRIVING'
    },function(response,status){
        if (status === 'OK'){
            directionsRenderer.setDirections(response);
            showMarker(response);
        }
        else{
            alert("error");
        }
    });
}

function showMarker(response){
    var steps = response.routes[0].legs[0].steps;
    for (var i = 0; i < steps.length; i++){
        var paths = steps[i].path;
        var markerStart = new google.maps.Marker({
            position: paths[0],
            map: map
        });
        markerArray.push(markerStart);
    }
    getGeocode();
    editMarker();
    getWeather();
    inputWeather();
    createMarkerInfo();
    storeToDatabase();
    lookUpDatabase();
}

function lookUpDatabase(){
    $.ajax({
        type: 'GET',
        url: "data_get.php",
        async: false,
        success: function (data) {
            var parse_json = data.split("\n");
            for (var i = 0; i < parse_json.length-1; i++){
                var json_ob = JSON.parse(parse_json[i]);
                usableDataArray.push(json_ob);
            }
            console.log(usableDataArray);
        }
    });
}

function storeToDatabase(){
    for (var i = 0; i < usableWeatherArray.length; i++){
        $.ajax({
            type: "POST",
            url: "phptest.php",
            data: {'city': usableWeatherArray[i].name,
                'lat': usableWeatherArray[i].coord.lat,
                'lng': usableWeatherArray[i].coord.lon,
                'temp': usableWeatherArray[i].main.temp},
            success: function (data) {
                // console.log(data);
            }
        });
    }
}

function editMarker(){
    for (var i = 0; i < geocodeArray.length; i++) {
        var cityName = geocodeArray[i].results[geocodeArray[i].results.length-5].address_components[0].long_name;
        var counter = i+1;
        while(counter < geocodeArray.length-1){
            if(cityName == geocodeArray[counter].results[geocodeArray[counter].results.length-5].address_components[0].long_name){
                // console.log(counter);
                if(counter < markerArray.length) {
                    markerArray[counter].setMap(null);
                }
            }
            counter += 1;
        }
    }

    for(var i = 0; i < markerArray.length; i++){
        if (markerArray[i].map != null){
            var marker = new google.maps.Marker({
                position: markerArray[i].position
            });
            usableMarkerArray.push(marker);
        }
        else{
            // console.log(markerArray[i]);
        }
    }
}

function inputWeather(){

    for(var i = 0; i < usableWeatherArray.length; i++){
        var humidity = usableWeatherArray[i].main.humidity;
        var currentTemp = usableWeatherArray[i].main.temp;
        var tempMax = usableWeatherArray[i].main.temp_max;
        var tempMin = usableWeatherArray[i].main.temp_min;
        var infoWindow = new google.maps.InfoWindow({
            content: '<div id="h">' + 'Humidity: ' + humidity + ' C' +'</div>'+
                '<div id="c">' + 'Current Temperture: ' + currentTemp + ' C' + '</div>'+
                '<div id="ma">' + 'Max: ' + tempMax + ' C' + '</div>' +
                'Min: ' + tempMin + ' C'
        });
        weatherArray.push(infoWindow);

    }
}

function createMarkerInfo(){


    for (var i = 0; i < markerArray.length; i++){
        markerArray[i].setMap(null);
    }
    for(var i = 0; i < weatherArray.length; i++) {
        var info = weatherArray[i];
        var marker = new google.maps.Marker({
            position: usableMarkerArray[i].position,
            clickable: true
        });
        marker.addListener('click', clickFunction(info,marker));
        marker.setMap(map);
        marker.addListener('click', function(){
            info.close(map,marker);
        });
    }

}

function clickFunction(info,marker){
    info.open(map,marker);
}


function geocodeData(data){
    geocodeArray.push(data);
}

function weatherData(data){
    usableWeatherArray.push(data);
}

function getGeocode(){
    for(var i = 0; i < markerArray.length; i++) {
        $.ajax({
            type: 'GET',
            url: "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + markerArray[i].position.lat() + "," + markerArray[i].position.lng() + "&key=AIzaSyAazhyLfdNoz0M06ObW8XRi1RbYETRNn6w",
            dataType: "json",
            async: false,
            success: function (data) {
                 geocodeData(data);
            },
            error: function () {
                console.log("Error");
            }
        });
    }
}

function getWeather() {
    for (var i = 0; i < usableMarkerArray.length; i++) {
         $.ajax({
            type: 'GET',
            url: "http://api.openweathermap.org/data/2.5/weather?lat=" + usableMarkerArray[i].position.lat() + "&lon=" + usableMarkerArray[i].position.lng() + "&units=metric&appid=3090ecca0f9472002c4fb40568723c37",
            dataType: "json",
            async: false,
            success: function (data) {
                weatherData(data);
            },
            error: function () {
                console.log("Error");
            }
        });
    }

}

