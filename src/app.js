const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views locations
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index',{
        title : 'Weather',
        name : 'Nithish Kumar'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title : 'About',
        name : 'Nithish Kumar'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title : 'Help',
        name : 'Nithish Kumar'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error : 'Please provide an Address to get forecast'
        })
    }
    geocode(req.query.address, (error,{latitude,longitude,location} = {})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData) => {
            if(error) {
                return res.send({error})
            }
            res.send({
                location,
                forecast : forecastData
            })
        })    
    })
})

app.get('/products', (req,res) => {
    if(!req.query.search){
        return res.send({
            error : 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products : []
    })
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        title : '404',
        name : 'Nithish Kumar',
        errorMessage : 'Help article not found'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title : '404',
        name : 'Nithish Kumar',
        errorMessage : 'Page not found'
    })
})

// app.com
// app.com/help
// app.com/about

app.listen(port, ()=>{
    console.log('Server is up on port '+ port)
})