const fs = require('fs');

const axios = require('axios');

const config = require('../config/config');

class SearchService {

    constructor() {
        this.filePath = './db/data.json'
        this.history = this.loadData();
    }


    loadData() {
        let data = fs.readFileSync(this.filePath).toString();
        
        if(!data) {
            return [];
        }

        data = JSON.parse(data);

        return data.history;
    }

    async find(place) {

        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                params: {
                    access_token: config.mapboxToken,
                    limit: 5,
                }
            })
    
            const response = await instance.get();
    
            const cities = response.data.features.map(place => ({
                id: place.id,
                name: place.place_name,
                lng: place.center[0],
                lat: place.center[1]
            }));
    
            return cities;
        } catch (error) {
            return []
        }
    }

    async findWeather(lon, lat) {

        try {
            const instance = axios.create({

                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {
                    lon,
                    lat,
                    appid: config.openWeatherKey
                }
            })
    
            const response = await instance.get();

            const { weather, main } = response.data;

            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }

        } catch (error) {
            return {}
        }
    }

    async saveHistory(place) {

        if(this.history.includes(place.toLowerCase())) {
            return false;
        }

        if(this.history.length === 5) {
            this.history.pop();
        }

        const payload = {
            history: this.history
        }

        this.history.unshift(place.toLowerCase());
        fs.writeFileSync(this.filePath, JSON.stringify(payload));
    }
}

module.exports = {
    SearchService
}