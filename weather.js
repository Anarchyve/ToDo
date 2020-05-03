const weather = document.querySelector(".js-weather");
const API_KEY="e8f299ca19f08a4a9ef76ed3b66aac47";
const COORDS='coords';

function getWeather(lat, lng){
 fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
 )
 .then(function(response){
   return response.json();
 })
 .then(function(json){
   const temperature =json.main.temp;
   const city =json.name;
   const temp = Math.ceil(temperature)
   weather.innerText =`${city} ${temp}C`
 })

}

function saveCoords(coordsObj){
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoError(){
  console.log("cant get any info");
}

function handleGeoSucces(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude)
}

function askForCoords(){
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords(){
    const loadedCoords=localStorage.getItem(COORDS);
    if (loadedCoords===null) {
      askForCoords();
    } else {
      const parsedCoords = JSON.parse(loadedCoords);
      getWeather(parsedCoords.latitude , parsedCoords.longitude);
        //get weather
    }
}

function init(){
  loadCoords();
}

init();
