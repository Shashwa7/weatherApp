//here we will do all sorts of DOM manipulations and event handling

const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img'); 
const body = document.querySelector('body');

const forecast = new Forecast();
//updating card

const updateUI = (data) => {
    
    const {cityInfo, weather} = data;

    //update detail templte
    details.innerHTML = `
         <h5 class="my-3">${cityInfo.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    //update icons
    const iconImgSrc = `images/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconImgSrc);

    //updating night/day  images
    let timeImgSrc = weather.IsDayTime ? 'images/day.svg': 'images/night.svg';

    time.setAttribute('src', timeImgSrc);
    body.style.backgroundImage = 'url("timeImgSrc")';


    //remove the d-none class if presesnt for the div card
    if(card.classList.contains('d-none'))
        card.classList.remove('d-none');
};

cityForm.addEventListener('submit', event => {
    //prevent default action like page refresh after every form submission
    event.preventDefault();

    // get city value, trim() to remove spaces
    const cityName = cityForm.city.value.trim();
    cityForm.reset(); //reset form after submission

    //update the ui with new city & final data fetch
    forecast.updateCity(cityName)
        .then(data => updateUI(data))
        .catch(err => console.log(err));


    //set local storage
    
    localStorage.setItem('city', cityName);
    //every new entered value will overwrite previously stored value.


});

//automatically updating ui data from localstorage
//the last city entry will be displayed while opening our weather app

let lastUserTypedLocation =  localStorage.getItem('city');
// if there is any key name 'city' stored in the localstorage then execute the following code.
if(lastUserTypedLocation){
   forecast.updateCity(lastUserTypedLocation)
        .then(data => updateUI(data))
        .catch(err => console.log(err));
}