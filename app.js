// jshint esversion:6

const express =require("express");
const https = require("https");
const bodyparser = require("body-parser");
const app =express();


app.use(bodyparser.urlencoded({extended: true}));

app.get("/", function(req, res){

res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res){
  const query=req.body.cityName;
  const id =" ";
  const unit ="metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+id+"&units="+unit;

  https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData= JSON.parse(data);


      const temp =weatherData.main.temp;
      console.log(temp);

      const feels=weatherData.weather[0].description;
      console.log(feels);

      const icon=weatherData.weather[0].icon;
      const image ="http://openweathermap.org/img/wn/"+ icon + "@2x.png";

      res.write("<p>It feel like "+ feels+ " right now</p>");
      res.write("<h1> The Tempereature in "+query+" is "+ temp+ " degree "+unit+" </h1>");
      res.write("<img src=" + image +" />");
      res.send();
    });
  });

});







app.listen(3000, function(){
  console.log("Server is running at port 3000");
});
