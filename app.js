const input = document.querySelector("input");
const bTn = document.querySelector("#search");
let box2 = document.querySelector(".box2");
bTn.addEventListener("click",()=>{
    getWeather(input.value);
    box2.innerHTML=`<div class="loader">
        <div class="circle">

        </div>
        <div class="text">Loading . . .</div>
      </div>`;
});

let image = document.querySelector("img");
let temp = document.querySelector(".temp .tmp");
let weather = document.querySelector(".weather");
let feels = document.querySelector(".feels .data");
let humidity = document.querySelector(".humidity .data");

let getWeather = async(city)=>{
  try {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2c04ce6afb9a6358f6df9e8678f71be4&units=metric`;
    let response = await fetch(url);
    let data = await response.json();
    box2.innerHTML=`<div class="cityName">${data.name}</div>
      <div class="min-cont">
        <div class="min">
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" alt="">
        
        </div>
        <div class="min">
          <div class="temp"><span class="tmp">${Math.round(data.main.temp)}</span><sup>o</sup></div>
          <div class="weather">${data.weather[0].main}</div>
        </div>
      </div>
      <div class="mini">
        <div class="feels">
          <img src="wind.png" alt="" srcset="">
          <div class="inner">
            <p class="data">${data.wind.speed}km/h</p><p>Wind Speed</p>
          </div>
        </div>
        <div class="humidity">
          <img src="humudity.png" alt="" srcset="">
          <div class="inner">
            <p class="data">${data.main.humidity}%</p><p>Humidity</p>
          </div>
        </div>
      </div>`;
    console.log(data);
  } catch (error) {
    box2.innerHTML=`<h1>City Not Found</h1>`;
    console.log(error)
  }
    
}


if(navigator.geolocation){
    navigator.geolocation.watchPosition(
      (loc)=>{
        lat = loc.coords.latitude;
        long = loc.coords.longitude;
        getWeatherUsingLocation(lat,long);
        
      },
      (err)=>{
        console.log(err);
      }
    )
}

let getWeatherUsingLocation = async(lat,long)=>{
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=2c04ce6afb9a6358f6df9e8678f71be4&}`;
  let response = await fetch(url);
  let data = await response.json();
  box2.innerHTML=`<div class="cityName">${data.name}</div>
      <div class="min-cont">
        <div class="min">
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" alt="">
        
        </div>
        <div class="min">
          <div class="temp"><span class="tmp">${Math.round(data.main.temp-273.15)}</span><sup>o</sup></div>
          <div class="weather">${data.weather[0].main}</div>
        </div>
      </div>
      <div class="mini">
        <div class="feels">
          <img src="wind.png" alt="" srcset="">
          <div class="inner">
            <p class="data">${data.wind.speed}km/h</p><p>Wind Speed</p>
          </div>
        </div>
        <div class="humidity">
          <img src="humudity.png" alt="" srcset="">
          <div class="inner">
            <p class="data">${data.main.humidity}%</p><p>Humidity</p>
          </div>
        </div>
      </div>`;
}

