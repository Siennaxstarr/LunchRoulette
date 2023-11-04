var zipCodeEl = document.querySelector("#zip");
var stateEl = document.querySelector("#state");
var landingPageBtn = document.querySelector('#landingBtn');
var selectedRestaurantAddBtn = document.querySelector('#add-restaurant');
var restaurantNameInput = document.querySelector('#restaurant-name');
var selectedRestaurants = [];
var selectedLunchBtn = document.querySelector("#select-lunch");
var randomRestaurantDiv = document.querySelector("#random-restaurant");
var restaurantList = document.querySelector('#selected-restaurants');
var spanModalClose = document.getElementsByClassName("close")[0];
var warningModal = document.querySelector("#warningModal");
var restaurantSearchList = document.querySelector('#restaurantSearchList');
var randomlySelectedLunchList = document.querySelector('#random-restaurant')

async function formatCity(cityName) {
  if (cityName.includes(' ')) {
    return cityName.replace(/\s/g, '%20');
  } else {
    return cityName;
  }
}

var fetchedRestaurantNames = [];

async function getRestaurants(cityName, state) {
  const formattedCity = await formatCity(cityName);
  const url = `https://restaurants-near-me-usa.p.rapidapi.com/restaurants/location/state/${state}/city/${formattedCity}/0`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'b7633d815emsh3230d09d00cd30bp130f8fjsnd43c8fffa537',
      'X-RapidAPI-Host': 'restaurants-near-me-usa.p.rapidapi.com',
    }
  };
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    result.restaurants.forEach(restaurant => {
      const restaurantName = restaurant.restaurantName;
      fetchedRestaurantNames.push(restaurantName);
    });
    localStorage.setItem('fetchedRestaurant', fetchedRestaurantNames.join(','));
    console.log(fetchedRestaurantNames);
  } catch (err) {
    console.error(err);
  }
}

function createRestaurantList() {
  var restaurantData = localStorage.getItem('fetchedRestaurant');
  var restaurantNames = restaurantData ? restaurantData.split(',') : [];

  for (let i = 0; i < restaurantNames.length; i++) {
    var newLi = document.createElement('li');
    newLi.textContent = restaurantNames[i];
    restaurantSearchList.appendChild(newLi);
  }
}

function redirectPage() {
  location.replace("./landing.html");
}

if (landingPageBtn) {
  landingPageBtn.addEventListener('click', async function () {
    var zipCodeElValue = zipCodeEl.value;
    var stateElValue = stateEl.value;

    localStorage.setItem("zip", zipCodeElValue);
    localStorage.setItem("state", stateElValue);
    var zipCode = localStorage.getItem("zip");
    var state = localStorage.getItem("state");

    await getRestaurants(zipCode, state);
    redirectPage();
  });
}

if (selectedRestaurantAddBtn) {
  selectedRestaurantAddBtn.addEventListener('click', function () {
    var newLi = document.createElement('li');
    var restaurantNameValue = restaurantNameInput.value;
    var textNode = document.createTextNode(restaurantNameValue);
    newLi.appendChild(textNode);
    randomlySelectedLunchList.appendChild(newLi);
    selectedRestaurants.push(restaurantNameValue);
    var parsedData = JSON.stringify(selectedRestaurants);
    console.log(parsedData);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  createRestaurantList();
});

function lunchRandomGenerate() {
  console.log("BUTTON CLICKED");
  if (selectedRestaurants.length > 0) {
    var randomIndex = Math.floor(Math.random() * selectedRestaurants.length);
    var selectedRestaurant = selectedRestaurants[randomIndex];
    randomRestaurantDiv.textContent = selectedRestaurant;
    console.log(selectedRestaurant);
  } else {
    warningModal.style.display = "block";
  }
}

selectedLunchBtn.addEventListener('click', lunchRandomGenerate)