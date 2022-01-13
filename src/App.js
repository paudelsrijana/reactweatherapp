import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCelsius, setIsCelsius] = useState(true);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      const { latitude, longitude } = position.coords;
      //console.log(longitude);
      // console.log(latitude);
      const apiId = "5264779432aa5523b400895723caa06e";
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiId}`
      )
        .then((blob) => blob.json())
        .then((res) => {
          setWeather(res);
          setIsLoading(false);
          //console.log(res);
        });
    });
  }, []);

  if (isLoading) {
  }
  const tempInKelvin = weather?.main?.temp;
  const tempInCelsius = Math.ceil(tempInKelvin - 273.15);
  const typeOfWeather = weather?.weather?.[0].main;
  const weatherIconCode = weather?.weather?.[0].icon;
  const weatherIconUrl = `https://openweathermap.org/img/w/${weatherIconCode}.png`;
  const windSpeed = weather?.wind?.speed;
  const cityName = weather?.name;
  const countryName = weather?.sys?.country;
  const tempInFahrenheit = Math.ceil(tempInCelsius * (9 / 5) + 32);
  const handleTemp = () => {
    setIsCelsius(!isCelsius);
  };
  //console.log(isCelsius);

  //console.log(tempInKelvin);
  return (
    <div className="container">
      <div className="header">
        <h1 className="mt-2 mb-2 ">weather Information</h1>
      </div>
      {isLoading ? (
        <div className="spinner-border" role="status"></div>
      ) : (
        <div className="weather-info">
          <h1 onClick={handleTemp}>
            {isCelsius ? (
              <>{tempInCelsius}&deg;C</>
            ) : (
              <>{tempInFahrenheit}&deg;F</>
            )}
          </h1>
          <div className="weather-more-info">
            <h3>
              {typeOfWeather} <img src={weatherIconUrl} alt="weatherType" />
              {windSpeed}m/s
            </h3>
          </div>
          <h2>
            {cityName},{countryName}
          </h2>
        </div>
      )}
    </div>
  );
}

export default App;
