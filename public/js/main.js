getWeather = async city => {
    const resp = await fetch(`/weather?city=${city}`)
    if (!resp.ok) {
        // console.log(resp.statusText)
        throw Error(resp.statusText)
    }
    const data = await resp.json()

    return data
}

const manageWeather = (forecast = {}) => {
    console.log(forecast)
    const { alerts = [], currently = {}, dayli = {} } = forecast
    const { apparentTemperature = '', summary = '' } = currently
    document.getElementById('temperature').innerHTML = apparentTemperature
        ? `Temperature: ${((apparentTemperature - 32) / 1.8).toFixed(2)} °C`
        : ''
    document.getElementById('summary').textContent = summary || ''

    if (alerts[0]) {
        const { description } = alerts[0]
        document.getElementById('alert').textContent = `${description}` || ''
    }
}

// fetch('/weather?city=montreal')
//     .then(response => {
//         return response.json()
//     })
//     .then(data => {
//         const { apparentTemperature, summary } = data
//         document.getElementById(
//             'temperature'
//         ).innerHTML = `Temperature: ${apparentTemperature}`
//         document.getElementById('summary').textContent = summary
//     })
document.getElementById('form-search-weather').addEventListener('submit', e => {
    e.preventDefault()
    const errorContent = document.getElementById('error')
    const city = document.getElementById('city-weather-input').value
    errorContent.textContent = ''
    manageWeather()
    getWeather(city)
        .then(data => manageWeather(data))
        .catch(error => {
            errorContent.textContent = error.message
        })
})
