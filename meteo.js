// Fonction qui va me permettre de récupérer la ville dans le fichier config et sortir le json
async function fetchConfig() {
  const response = await fetch("Config/conf.json");
  return response.json();
}

//Fonction qui permet de faire appel à l'API
async function fetchWeather(city) {
  const apiKey = "7dda1cb9ae5754fcd457dfcc40b4cbb2"
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=fr&appid=${apiKey}&units=metric`
  
  const response = await fetch(url);
  const data = await response.json();
  // Debug console
  console.log("Données météo :", data); 

  //appel de la fonction displayWeather pour l'afficher
  displayWeather(data);
    }

//Fonction me permettant de modifier mon html et donc ma page en fonction des informations demandées
function displayWeather(data) {
  // Déclaration de toutes mes constantes
  const name = data.name
  const { description,icon } = data.weather[0]
  const humidity = data.main.humidity
  const temp = data.main.temp
  const speed = data.wind.speed
  const tempMax = data.main.temp_max
  const tempMin = data.main.temp_min

  //Script pour modifier le HTML
  document.querySelector("#city").innerText = name
  document.querySelector("#icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
  document.querySelector("#description").innerText = description
  document.querySelector("#temp").innerText = temp + "°C"
  document.querySelector("#humidity").innerText = "Humidité: " + humidity + "%"
  document.querySelector("#wind").innerText = "Vitesse du vent: " + speed + " km/h"
  document.querySelector("#tempExt").innerText = "Maxi : " + tempMax + "°C / Mini : " + tempMin + "°C"
  document.querySelector(".weather").classList.remove("loading");
    }

// Fonction qui permet de mettre à jour la Météo
async function updateMeteo() {
  const conf = await fetchConfig();
  await fetchWeather(conf.ville);
}

// Appel de la fonction pour lancer l'application
updateMeteo()

// Mise en place d'un refresh des informations toutes les heures
setInterval(updateMeteo, 3600000)