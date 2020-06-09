class Forecast {

    constructor() {
        this.key = 'fX4k7ZjImzeZFJ0caojMIpRGal2novGH'; //our api key
        this.cityURI = 'http://dataservice.accuweather.com/locations/v1/cities/search';
        this.weatherURI = 'http://dataservice.accuweather.com/currentconditions/v1/';
    }

    async updateCity(city) {

        const cityInfo = await this.getCityInfo(city);
        const weather = await this.getCityWeather(cityInfo.Key);

        return { cityInfo, weather };
    }

    //get city information
    async getCityInfo(city) {

        const query = `?apikey=${this.key}&q=${city}`;
        const response = await fetch(this.cityURI + query);
        const data = await response.json();

        return data[0];
    }

    //get city weather  information
    async getCityWeather(cityCode) {

        const query = `${cityCode}?apikey=${this.key}`;
        const response = await fetch(this.weatherURI + query);
        const data = await response.json();

        return data[0];
    }
}


