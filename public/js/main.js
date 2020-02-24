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
    const { apparentTemperature = '', summary = '' } = forecast
    document.getElementById('temperature').innerHTML = apparentTemperature
        ? `Temperature: ${apparentTemperature}`
        : ''
    document.getElementById('summary').textContent = summary || ''
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
