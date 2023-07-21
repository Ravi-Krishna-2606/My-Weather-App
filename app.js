const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");

const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){

    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res)
{
    const query=req.body.cityName;
    const appKey="2c302a3d22b027c4f08c1ddfa50ad7a5";
    const unit="metric";

    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appKey+"&units="+unit;

     https.get(url,function(response)
     {
        console.log(response.statusCode);

        response.on("data",function(data)
        {
            const weatherData=JSON.parse(data);
            console.log(weatherData);
            const temp=weatherData.main.temp;
            console.log(temp);
            const weatherDesc=weatherData.weather[0].description;
            const icon=weatherData.weather[0].icon;
            const imgURL=" https://openweathermap.org/img/wn/"+icon+"@2x.png ";
            console.log(weatherDesc);
            res.write("<p> The weather is currently"+weatherDesc+"<p>");
            res.write("<h1> The temperature in "+query+"is"+temp+"degrees celcius <h1>");
            res.write("<img src="+imgURL+">");
            res.send();
        })
     })
})



app.listen(3000,function(){
    console.log("Server is on port 3000");
});