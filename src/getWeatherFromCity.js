const axios = require('axios')
// const chalk = require('chalk')
// const fs = require('fs')

const getGeolocalisation = city => {
    const urlGeoCoding = `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=pk.eyJ1IjoiY2hyaXN0b3BoZWRoIiwiYSI6ImNrNnBxazN0OTBhbXYza3J1NDI3NGM1OG4ifQ.CxniSV6KD6EO1LUDSvRbig&limit=1`

    return axios.get(urlGeoCoding)
}

const getWeather = ([longitude = 0, latitude = 0]) => {
    const urlWeather = `https://api.darksky.net/forecast/77b2648fc258f1c26f3cc40fd45bfc0b/${latitude},${longitude}`
    // console.log(urlWeather)
    return axios.get(urlWeather)
}

const getWeatherFromCity = async city => {
    let positions
    const { data } = await getGeolocalisation(city)

    const { features = [] } = data

    if (features[0]) {
        positions = features[0].center
    } else {
        throw Error('You need to provide a valid city')
        positions = []
    }

    const weather = await getWeather(positions)
    return weather
}

module.exports = { getWeatherFromCity }
