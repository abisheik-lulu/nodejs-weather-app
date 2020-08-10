const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//define paths
const public_dir_path = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../templates/views')
const partialspath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialspath)

//setup static location to serve
app.use(express.static(public_dir_path))


//route handler

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: "Abhi"

    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        name: "Abhi",
        title: "About me"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        help_msg: "send your queries",
        name: "Abisheik"
    })
})

//endpoint 

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send({
            error: "enter a address"
        })
    } else {

        geocode(req.query.address, (error, geocode_data) => {
            if (error) {
                return res.send({ error })
            }
            forecast(geocode_data.latitude, geocode_data.longitude, (error, forecast_data) => {
                if (error) {
                    return res.send({ error })
                }

                res.send({
                    forecast: forecast_data,
                    location: geocode_data.location,
                    address: req.query.address
                })
            })

        })
    }
})



app.get("/help/*", (req, res) => {
    res.render('404', {
        message: "Help article not found",
        name: "Abhi"
    })
})

//should come last always
app.get('*', (req, res) => {
    res.render('404', {
        message: "page not found",
        name: "Abhi"
    })
})


app.listen(port, () => {
    console.log('server is up on '+ port)
})




