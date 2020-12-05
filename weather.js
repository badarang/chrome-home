const API_KEY = "8c6478dafc66870958c0b0546321d14e";
const CORDS = "cords";
const weather = document.querySelector(".js-weather");

function getWeather(lat, lng) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
        .then(function (response) {
            return response.json();
        })
        .then(function name(json) {
            const temperature = json.main.temp;
            const place = json.name;
            weather.innerText = `${temperature} @ ${place}`;
        });
}
function saveCords(cordsObj) {
    localStorage.setItem(CORDS, JSON.stringify(cordsObj));
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const cordsObj = {
        latitude,
        longitude,
    };
    saveCords(cordsObj);
    getWeather(latitude, longitude);
}
function handleGeoError() {
    console.log("fxxk");
}
function askForCords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}
function loadCords() {
    const loadedCords = localStorage.getItem(CORDS);
    if (loadedCords === null) {
        askForCords();
    } else {
        const parsedCords = JSON.parse(loadedCords);
        getWeather(parsedCords.latitude, parsedCords.longitude);
    }
}
function init() {
    loadCords();
}
init();
