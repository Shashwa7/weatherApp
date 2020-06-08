//we are using acuweather api, so when we make request to any api, we typically get a api key inorder to make authentic requests, inorder to get the data from the api

const key = 'fX4k7ZjImzeZFJ0caojMIpRGal2novGH'; //our api key

//get city weather  information
const getCityWeather = async (cityCode) => {

    const baseURL = 'http://dataservice.accuweather.com/currentconditions/v1/'; // + {locationKey}/{cityCode};
    const query = `${cityCode}?apikey=${key}`;

    //wait till promise is resolved and then initialize
    const response = await fetch(baseURL + query);
    const data = await response.json();
    return data[0];
    //very very very important to return data[0] because if we don't specify that we cannot access the weather object properties.
};


//get city information ~ api call ~ we'll refer locations api 

const getCityInfo = async (city) => {

    const baseURL = 'http://dataservice.accuweather.com/locations/v1/cities/search';

    const query = `?apikey=${key}&q=${city}`;

    //wkt '?' means appending some extra info with the url know as query parameter and '&' helps sepearting such query parameters. 'apikey' and 'q' is not userdefines vars but instead api variables that we are using and obviously these are case sensitive 

    const response = await fetch(baseURL + query) //this returns a promise
    const data = await response.json();
    //the received data consist of all results that has something related with our search string, in-order to fetch the very first and the accurate result we are specifying the data array as data[0].
    return data[0];  //fetches the very first object
};

//wkt getCity is an async() which mean it will return anything as promise, inorder to fetch the received data we  must use .then;

/*

//we are calling this func asynchronously in app.js file
getCityInfo(city)
    .then(data => {
        //fetching data here and using its citycode/"Key" as aparameter for the func getCityWeather(key) inorder to get the current weather of the city.

        return getCityWeather(data.Key); //Key is data obj property
    }).then(WeatherData => {
        //retriveing the data returned from the getCityWeather < getCityInfo

        console.log(WeatherData);
    })
    .catch(err => console.log(err));

//note: we have to use the value of 'Key'(city code )property of the searched object/city object, inorder to know/fetch the current weather of the city. Consider this Key as a parameter that we will append to the url while making a weather api call.
*/
