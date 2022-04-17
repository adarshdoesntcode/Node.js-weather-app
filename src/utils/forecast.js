const request = require('request');

const forecast = (latitude,longitude,callback)=>{

  const url =`http://api.weatherstack.com/current?access_key=44bbc6ac20596e6bcc3f96a4397ec575&query=${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}`;

   request({url,json:true},(error,{body})=>{
     if(error)
     {
       callback("Could not connect to the api server!!",undefined);
     }
     else if(body.error)
     {
       callback({
         type:body.error.type,
         info:body.error.info
       },undefined);
     }
     else
     {
       callback(undefined,{
         description:body.current.weather_descriptions[0],
         temperature:body.current.temperature,
         feelslike:body.current.feelslike
       })
     }
   }) 
}

module.exports = forecast;