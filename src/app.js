const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
const publicDrirectoryPath = path.join(__dirname,"../public");
console.log(publicDrirectoryPath)

const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()
const port = process.env.PORT || 3000

app.use(express.static(publicDrirectoryPath))
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res)=>{
    res.render('index',{
        title:'Weather',
        name:'Anil Burra'
    })
})

app.get('/help', (req, res)=>{
    res.render('help',{helpText:'Help something ', title:'Help',name:'Anil'})
})

app.get('/products',(req, res)=>{
    if(!req.query.search){
       return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        prodducts:[]
    })
})
app.get('/about',(req, res)=>{
    res.render('about',{
        title: 'About me',
        name: 'Anil Burra'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location}={})=>{
        if(error){
            return res.send({error})
        }
        
       
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            return res.send({ forecast: forecastData, location, address:req.query.address});
          })
        })
   // res.send({forecast:'It is raining', location:'Philadelphia', address: req.query.address})
})

app.get('*',(req, res)=>{
    res.render('404',{
        title:'Error',
        errorMessage:'Page Not found',
        name:'Anil'
    })
})
app.get('/help/*',(req, res)=>{
    res.render('404',{
        title:'Error',
        errorMessage:'Help article not found',
        name:'Anil'
    })
  
})

app.listen(port,()=>{
    console.log('Server is up on port '+port)
})