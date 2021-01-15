/* Global Variables */

//const { error } = require("console");

// Create a new date instance dynamically with JS
var currentdate = new Date();
var datetime = "Last Sync: " + currentdate.getDate() + "/"
 + (currentdate.getMonth() + 1) + "/"
 + currentdate.getFullYear() + " @ "
 + currentdate.getHours() + ":"
 + currentdate.getMinutes() + ":"
 + currentdate.getSeconds();

let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear() + " Time:" + d.getHours() + ":"
 + d.getMinutes();
let zipField = document.querySelector('#zip');
const API_Key = '4964517d2628ee5cfcffcfe8021efd92';
let feelingsField = document.querySelector('#feelings');
let allData = [{ 'SAMER': 15 }];
const cards = document.querySelector('.entry');
const generateBtn = document.querySelector('#generate');
generateBtn.addEventListener('click', function (e) {
 if (zipField.value) {
  console.log(zipField.value);
  console.log(feelingsField.value);
  getWeathermapData(zipField.value);
 } else
  console.log("Error");

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



// fetch the data from Weathermap website
const getWeathermapData = async (zip) => {

 try {
  const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${API_Key}&units=metric`)
  const data = await res.json();

  if (data.cod == 200) {
   postData('http://localhost:5500/addData', { temperature: data, date: newDate, user_response: feelingsField.value });
   getAlldata()
    .then(data => updateUI(data))
    .then(
     console.log("Everything went fine")
    )
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
 //console.log(data);
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
  console.log(newData);
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
 <h4>Current Weather in ${data[data.length - 1].temperature.name} , ${data[data.length - 1].temperature.sys.country}</h4>
<div id="date:">Date: ${data[data.length - 1].date}</div>
<div id="temp:">Temperatur: ${data[data.length - 1].temperature.main.temp}</div>
<div id="content">Feelings: ${data[data.length - 1].feelingsField}</div>
<img id="openweathermap_icon" src="http://openweathermap.org/img/wn/${data[data.length - 1].temperature.weather[0].icon}@2x.png" alt="openweathermap icon">
</div>`;
 entry.insertBefore(element, entry.firstChild);
 console.log(entry.children[0]);
 console.log(data[data.length - 1].temperature.main.temp);
 console.log(data[data.length - 1]);

}

