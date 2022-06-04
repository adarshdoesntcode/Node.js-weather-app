const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

//Define Paths for Express
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsDirectoryPath = path.join(__dirname,'../templates/views');
const partialsDirectoryPath = path.join(__dirname,'../templates/partials');

//Setup  handlebar and views location and partials
app.set('view engine','hbs');
app.set('views',viewsDirectoryPath);
hbs.registerPartials(partialsDirectoryPath);

//Setup static directory 
app.use(express.static(publicDirectoryPath));

app.get('',(req,res)=>{
  res.render('index',{
    title:'Weather',
    headTitle:'Weather App',
    name: 'Adarsh'
    
  });
})

app.get('/about',(req,res)=>{
  res.render('about',{
    title:'About',
    headTitle:'About',
    name: 'Adarsh'
  });
})

app.get('/help',(req,res)=>{
  res.render('help',{
    title:'Help!!',
    headTitle:'Help',
    message: 'This is the help page.Are you consused bro? Im confused too bro.',
    name: 'Adarsh'
  });
})

app.get('/weather',(req,res)=>{
  if(!req.query.address)
    {
      return res.send({
        error:'address not provided.'
      })
    }
  geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
    if(error)
    {
      return res.send({
        error
      });
    }
    forecast(latitude, longitude,(error, {description,temperature,feelslike}={}) => {
      if(error)
      {
       return res.send({
         error
        });
      }
      res.send({
        forecast: description,
        location,
        temperature,
        feelslike
      });
   })
  })

})

app.get('/help/*',(req, res)=>{
  res.render('404',{
    title: '404 page!!',
    headTitle:'Help',
    message: 'Help article not found.',
    name: 'Adarsh'
  })
})
app.get('*',(req, res)=>{
  res.render('404',{
    title: '404 page!!',
    headTitle:'404',
    message: 'Page not found.',
    name: 'Adarsh'
  })
})


app.listen(3000,()=>{
  console.log('Server started on port 3000');
});

