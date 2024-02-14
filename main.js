//html den aktarılanlar
const cityInput = document.querySelector(".inputText");
const btn = document.querySelector(".btn");

//btn izleme
btn.addEventListener("click", () => {
  const cityName = cityInput.value;

  getData(cityInput.value);
});

//veri çekme fonks.(api,apikey)
function getData(name) {
  //apiKey
  const API = "c2f0e2b105ff3173c90ed9acb7ab35f2";

  //baseURL
  const baseURL = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${API}&units=metric&lang=tr`;

  //console.log(baseURL, API);

  //fetch ile promise döndür ve json a çevir
  fetch(baseURL)
    .then((res) => res.json())
    .then((data) => {
      const {
        name,
        sys: { country },
        main: { temp, feels_like, humidity },
        wind: { speed },
        weather: [{ description }],
      } = data;

      /* console.log(
        name,
        country,
        temp,
        feels_like,
        humidity %,
        description,
        speed km/s
      ); */

      //verileri js e çekme
      const city = document.querySelector("#sehir");
      const temperature = document.querySelector("#sicaklik");
      const weatherDesc = document.querySelector("#havaDurumu");
      const feel = document.querySelector("#hissedilen");
      const hum = document.querySelector("#humidity");
      const wind = document.querySelector("#wind");
      console.log(city, temperature, weatherDesc, feel, hum, wind);

      //js e çekilen elemanları html elemanları yerine yerleştirme
      city.textContent = `${name}, ${country}`;
      temperature.innerText = `${temp.toFixed(1)}°`;
      hum.textContent = `Nem:% ${humidity}`;
      wind.innerText = `Rüzgar: ${speed}km/s`;
      weatherDesc.innerText = `${description}`;
      feel.innerText = `Hissedilen Sıcaklık: ${feels_like}`;
    })
    .catch((err) => console.log(err));

  cityInput.value = "";
  cityInput.focus();
}
