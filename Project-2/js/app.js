/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/



/**
 * Define Global Variables
 * 
*/


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav


// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 


// Set sections as active
const topLink = document.querySelector(".top-link");
const navbar__list = document.getElementById('navbar__list');
// Build menu 
const sectionList = document.querySelectorAll('section');
const element = document.createElement('div');
let liElement = '';
for (let i = 0; i < sectionList.length; i++) {
 liElement = liElement + `<li><a class="menu__link" href="#${sectionList[i].id}">${sectionList[i].dataset.nav}</a></li>`;
}
element.innerHTML = `<ul id="navbar__list">${liElement}</ul>`;
navbar__list.appendChild(element.firstChild);

// Build menu End
//*************************************************//
// Scroll to section on link click
const scrollLinks = document.querySelectorAll('.menu__link');
//console.log(scrollLinks);
scrollLinks.forEach(function (link) {
 link.addEventListener('click', function (e) {
  e.preventDefault();
  // navigate to specifc 
  const id = e.currentTarget.getAttribute("href").slice(1);
  let scrollDiv = document.getElementById(id).offsetTop;
  window.scrollTo({ top: scrollDiv + 40, behavior: 'smooth' });
  updateCSS(id);
  //link.classList.remove("menu__link_active");
  console.log(e.currentTarget.classList);
 });
});



function updateCSS(id) {
 sectionList.forEach(function (section) {
  if (section.id === id) {
   section.classList.add("your-active-class");
  } else {
   section.classList.remove("your-active-class");
  }
 })
}

let timeout = null;
document.addEventListener('scroll', function (e) {
 // clear any previously queued up timeout
 clearTimeout(timeout);
 // then create a fresh, new timeout
 timeout = setTimeout(function (e) {
  // navigate to specifc 
  console.log(window.pageYOffset);
  if (window.pageYOffset > 750) {
   topLink.classList.add('show-link');
  }
  else {
   topLink.classList.remove('show-link');
  }
 }, 250);


});

topLink.addEventListener('click', function (e) {
 // navigate to top 
 window.scrollTo({ top: 0, behavior: 'smooth' });
});

/*     accordion    */
let acc = document.getElementsByClassName("accordion");


for (let i = 0; i < acc.length; i++) {
 acc[i].addEventListener("click", function () {
  this.classList.toggle("active");
  let panel = this.nextElementSibling;
  if (panel.style.maxHeight) {
   panel.style.maxHeight = null;
  } else {
   panel.style.maxHeight = panel.scrollHeight + "px";
  }
 });
}


(function (d, m) {
 var kommunicateSettings =
  { "appId": "e37c337240cf460b2d79ddafee541516", "popupWidget": true, "automaticChatOpenOnNavigation": true };
 var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
 s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
 var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
 window.kommunicate = m; m._globals = kommunicateSettings;
})(document, window.kommunicate || {});
/* NOTE : Use web server to view HTML files as real-time update will not work if you directly open the HTML file in the browser. */

