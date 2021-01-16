/* Global Variables */

//const { error } = require("console");

// Create a new date instance dynamically with JS

let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear() + " Time:" + d.getHours() + ":" + d.getMinutes();
let zipField = document.querySelector('#zip');
const API_Key = '4964517d2628ee5cfcffcfe8021efd92';
let feelingsField = document.querySelector('#feelings');
let allData = [{ 'SAMER': 15 }];
const cards = document.querySelector('.entry');
const generateBtn = document.querySelector('#generate');
generateBtn.addEventListener('click', function (e) {
  if (zipField.value) {

    getWeathermapData(zipField.value);
  } else
    alert("Please fill in the zip to get the weather data.");


});


// fetch the data from the server 
const getAlldata = async () => {

  const res = await fetch(`http://localhost:5500/all`)

  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error in getAlldata", error);
    // appropriately handle the error
  }
}

function clearFiled() {
  zipField.value = null;
  feelingsField.value = null;
  console.log('clear is done');
}

// fetch the data from Weathermap website
const getWeathermapData = async (zip) => {

  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${API_Key}&units=metric`)
    const data = await res.json();

    if (data.cod == 200) {
      postData('http://localhost:5500/addData', { temperature: data, date: newDate, user_response: feelingsField.value });
      getAlldata()
        .then(data => updateUI(data))
        .then(clearFiled)
        .catch("Error in then fun");
      return data;
    } else {
      alert(data.message);
      console.log(data.message);
      return data.message;
    }


  } catch (error) {
    console.log("Error in getWeathermapData", error);
  }
};


// Post the data to server side

const postData = async (url = '', data = {}) => {

  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();

    return newData;
  } catch (error) {
    console.log("error", error);
  }
}

const activeCard = document.querySelector('.active');
const entry = document.querySelector('.entry');


function updateUI(data) {
  const element = document.createElement('div');
  if (entry.children.length > 0) {
    const activeCard = document.querySelector('.active');
    activeCard.classList.remove("active");
  }

  element.innerHTML = `  <div class="weatherCard active" id="entryHolder">
 <h4>Current Weather in ${data.temperature.name} , ${data.temperature.sys.country}</h4>
<div id="date:">Date: ${data.date}</div>
<div id="temp:">Temperatur: ${data.temperature.main.temp}</div>
<div id="content">Feelings: ${data.feelingsField}</div>
<img id="openweathermap_icon" src="https://openweathermap.org/img/wn/${data.temperature.weather[0].icon}@2x.png" alt="openweathermap icon">
</div>`;
  entry.insertBefore(element, entry.firstChild);

}

