const path = require('path')

const express = require('express')
const hbs = require('hbs')
const { getWeatherFromCity } = require('./src/getWeatherFromCity')

const publicPath = path.join(__dirname, 'public')
const viewsPath = path.join(__dirname, 'templates', 'views')
const partialsPath = path.join(__dirname, 'templates', 'partials')
console.log(partialsPath)
const app = express()

//setup handlebars
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
//serve static files
app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', { title: 'index page' })
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About page' })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        message: 'this is a page to help you'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Article not found',
        message: "sorry the article you're looking for does not exist"
    })
})

app.get('/products', (req, res) => {
    const { search, price } = req.query

    if (!search) {
        res.statusMessage = 'provide a search term please'
        return res.status(404).end()
    }

    return res.send({
        products: []
    })
})

app.get('/weather', async (req, res) => {
    try {
        const { city } = req.query
        if (!city) {
            throw Error('provide a city please')
        }

        const { data: { currently } = {} } = await getWeatherFromCity(city)

        res.send(currently)
    } catch (err) {
        res.statusMessage = err
        res.status(404).end()
    }
})

app.get('*', (req, res) => {
    res.render('404', { title: '404 page', message: 'sorry 404!' })
})

app.listen(3000, () => {
    console.log('server up on port 3000')
})
