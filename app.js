const arregloPais = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "American Samoa",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antarctica",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Åland Islands",
  "Bhutan",
  "Bolivia",
  "Bonaire, Sint Eustatius and Saba",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei Darussalam",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cayman Islands",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Christmas Island",
  "Colombia",
  "Comoros",
  "Congo",
  "Cook Islands",
  "Costa Rica ",
  "Croatia",
  "Cuba",
  "Curaçao",
  "Cyprus",
  "Czechia",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Falkland Islands",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "French Guiana",
  "French Polynesia",
  "French Southern Territories",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guadeloupe",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kuwait",
  "Kyrgyzstan",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macao", ///
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Martinique",
  "Mauritania",
  "Mauritius",
  "Mayotte",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Niue",
  "Norfolk Island",
  "North Macedonia",
  "Northern Mariana Islands",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine, State of",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Pitcairn",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Romania",
  "Russian Federation",
  "Rwanda",
  "Réunion",
  "Saint Barthélemy",
  "Saint Helena, Ascension and Tristan da Cunha",
  "Saint Lucia",
  "Saint Martin",
  "Saint Pierre and Miquelon",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Sint Maarten",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Georgia and the South Sandwich Islands",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syrian Arab Republic",
  "Taiwan",
  "Tajikistan",
  "Tanzania, the United Republic of",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks and Caicos Islands",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom of Great Britain and Northern Ireland",
  "United States of America",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];
const seleccionado = document.querySelector("#seleccion");
const contenedor = document.querySelector("#contenedor");
const apiKey = "e757c714ad1e01ed3d496d3183b66272";
let nombrePais, tipoClima, imagen;
const cargarPais = () => {
  for (var i in arregloPais) {
    seleccionado.innerHTML +=
      "<option value='" + arregloPais[i] + "'>" + arregloPais[i] + "</option>";
  }
};
cargarPais();
const obtenerPais = () => {
  nombrePais = seleccionado.value;
  if (nombrePais != "") {
    obtenerClima(nombrePais);
  }
};
const obtenerClima = async (nombrePais) => {
  const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${nombrePais}&appid=${apiKey}&lang=es`;
  const respuesta = await fetch(endpoint);
  const datosClima = await respuesta.json();
  mostrarClima(datosClima);
};
const mostrarClima = ({ name, coord, main, weather, wind }) => {
  obtenerTipoClimaIcono(weather);
  let estructuraClima = `
    <div class="tarjeta">
      <h2 class="titulo">${name}</h2>
      <h3 class="subtitulo">Coordenada</h3>
      <ul class="lista">
        <li>Latitud: ${coord.lat}</li>
        <li>Longitud: ${coord.lon}</li>
      </ul>
      <img class="imagen" src="${imagen}" alt="${
        tipoClima.charAt(0).toUpperCase() + tipoClima.slice(1)
      }">
      <h3 class="subtitulo">Tipo de clima: ${
        tipoClima.charAt(0).toUpperCase() + tipoClima.slice(1)
      }</h3>
      <h3 class="subtitulo">Sensación térmica: ${(
        main.feels_like - 273.15
      ).toFixed(0)}°C</h3>
      <h3 class="subtitulo">Humedad: ${main.humidity}%</h3>
      <h3 class="subtitulo">Temperatura</h3>
      <ul class="lista">
        <li>Máxima: ${main.temp_max}</li>
        <li>Mínima: ${main.temp_min}</li>
      </ul>
      <h3 class="subtitulo">Velocidad del viento: ${wind.speed} km/h.</h3>
    </div>`;
  contenedor.innerHTML = estructuraClima;
};
const obtenerTipoClimaIcono = (weather) => {
  const [clima] = weather;
  const { description: descripcion } = clima;
  tipoClima = descripcion;
  const { icon: icono } = clima;
  imagen = `https://openweathermap.org/img/wn/${icono}.png`;
};
obtenerPais();
