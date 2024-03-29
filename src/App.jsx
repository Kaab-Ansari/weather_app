import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [weather, setWeather] = useState([]);
  const [location, setLocation] = useState("Bhiwandi");
  const [locationName, setLocationName] = useState("Bhiwandi");
  const [bgGif, setBGGif] = useState("");
  // console.log(weather)

  const map = weather.map((time) => time.currentConditions.sunrise);
  const map2 = weather.map((samay) => samay.currentConditions.datetime);
  const map3 = weather.map((waqt) => waqt.currentConditions.sunset);
  console.log("currenttime", map2);
  console.log("sunset", map3);
  console.log("sunrise", map);

  const styles = {
    backgroundColor: map2 > map3 ? "white" : "black",
  };

  useEffect(() => {
    fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationName}?unitGroup=metric&key=2H7FVANY3ZR6A8TGWNG688B6P&contentType=json`
    )
      .then((res) => res.json())
      .then((data) => {
        setWeather([data]);
        const main = data.currentConditions.icon;

        switch (main) {
          case "snow":
            setBGGif(
              "url('https://www.icegif.com/wp-content/uploads/2022/01/icegif-1007.gif')"
            );
            break;
          case "partly-cloudy-day":
            setBGGif(
              "url('https://mdbgo.io/ascensus/mdb-advanced/img/clouds.gif')"
            );
            break;
          case "partly-cloudy-night":
            setBGGif(
              "url('https://thumbs.gfycat.com/MajesticIcyKronosaurus-max-1mb.gif')"
            );
            break;
          case "clear-night":
            setBGGif(
              "url('https://thumbs.gfycat.com/UnhealthyDimwittedGonolek-size_restricted.gif')"
            );
            break;
          case "Fog":
            setBGGif(
              "url('https://mdbgo.io/ascensus/mdb-advanced/img/fog.gif')"
            );
            break;
          case "Rain":
            setBGGif(
              "url('https://mdbgo.io/ascensus/mdb-advanced/img/rain.gif')"
            );
            break;
          case "clear-day":
            setBGGif(
              "url('https://mdbgo.io/ascensus/mdb-advanced/img/clear.gif')"
            );
            break;
          case "Thunderstorm":
            setBGGif(
              "url('https://mdbgo.io/ascensus/mdb-advanced/img/thunderstorm.gif')"
            );
            break;
          default:
            setBGGif(
              "url('https://mdbgo.io/ascensus/mdb-advanced/img/clear.gif')"
            );
            break;
        }
      });
  }, [locationName]);

  function handleChange(e) {
    setLocation(e.target.value);
  }

  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const d = new Date();
  let day = weekday[d.getDay()];

  const d2 = new Date();
  let day2 = weekday[d2.getDay() + 2];

  const d3 = new Date();
  let day3 = weekday[d3.getDay() + 3];

  const d4 = new Date();
  let day4 = weekday[d4.getDay() + 4];

  const d5 = new Date();
  let day5 = weekday[d5.getDay() + 5];

  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const m = new Date();
  let name = month[m.getMonth()];

  const date = new Date();
  let daate = date.getDate();

  return (
    <div>
      <div style={styles}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <input
            className="input"
            type="text"
            onChange={handleChange}
            value={location}
          ></input>
          <button
            className="search-button 	fa fa-search"
            onClick={() => setLocationName(location)}
          ></button>
        </div>
        <div className="details-main" style={{ height: "630px" }}>
          {weather.map((w) => (
            <div
              className="details"
              style={{
                backgroundImage:
                  bgGif ??
                  "url(https://mdbgo.io/ascensus/mdb-advanced/img/main.gif)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
                color: map2 > map3 ? "white" : "black",
              }}
            >
              
                <div>
                  <h1>📍{w.address}</h1>
                  <h3>
                    {" "}
                    {w.currentConditions.temp} <sup>℃</sup>{" "}
                    <span>{w.currentConditions.icon}</span>
                  </h3>
                  <h4>
                    {" "}
                    {name} {daate} {day} &nbsp;&nbsp;&nbsp; {w.days[0].tempmax}℃
                    / {w.days[0].tempmin}℃
                  </h4>
                </div>
                <p>
                  Today {w.days[0].tempmax} / {w.days[0].tempmin}℃
                </p>
                <p>
                  Tomorrow {w.days[1].tempmax} / {w.days[1].tempmin}℃
                </p>
                <p>
                  {day2} {w.days[2].tempmax} / {w.days[2].tempmin}℃
                </p>
                <p>
                  {day3} {w.days[3].tempmax} / {w.days[3].tempmin}℃
                </p>
                <p>
                  {day4} {w.days[4].tempmax} / {w.days[4].tempmin}℃
                </p>
                <p>
                  {day5} {w.days[5].tempmax} / {w.days[5].tempmin}℃
                </p>
                {/* <p>{w.days[10].sunrise}</p> */}
              </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
