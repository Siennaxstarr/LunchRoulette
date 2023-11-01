window.addEventListener('load', function () {
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

    //API Functionality
    async function formatCity(cityName) {
        // Check if the city name includes spaces and replace them with '%20 because of the nature of the API's accepted params
        // If name has a space/whitespace, it will replace it with %20
        if (cityName.includes(' ')) {
            return cityName.replace(/\s/g, '%20');
        } else {
            return cityName;
        }
    }

    async function getRestaurants(cityName, state) {
        const formattedCity = await formatCity(cityName);

        //URL WE'RE FETCHING FROM
        const url = `https://restaurants-near-me-usa.p.rapidapi.com/restaurants/location/state/${state}/city/${formattedCity}/0`;

        //HEADERS
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '2533ec1a1amshf6c5a3c72a4243ap124946jsn68c2d2fed973',
                'X-RapidAPI-Host': 'restaurants-near-me-usa.p.rapidapi.com',
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);
        } catch (err) {
            console.error(err);
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
            //Might have to delete radius since our new API doesn't take ZIP as a param
            var state = localStorage.getItem("state");
    
            await getRestaurants(zipCode, state);
    
            // Redirect to the landing page
            redirectPage();
        });
    }

    if (selectedRestaurantAddBtn) {
        selectedRestaurantAddBtn.addEventListener('click', function () {
            var newLi = document.createElement('li');
            var restaurantNameValue = restaurantNameInput.value; //
            var textNode = document.createTextNode(restaurantNameValue);
            newLi.appendChild(textNode);
            restaurantList.appendChild(newLi);
            selectedRestaurants.push(restaurantNameValue);

            var parsedData = JSON.stringify(selectedRestaurants)
            console.log(parsedData)
        });
    }

    function lunchRandomGenerate() {
        console.log("BUTTON CLICKED")
        if (selectedRestaurants.length > 0) {
          var randomIndex = Math.floor(Math.random() * selectedRestaurants.length);
          var selectedRestaurant = selectedRestaurants[randomIndex];
          randomRestaurantDiv.textContent = selectedRestaurant;
          console.log(selectedRestaurant)
        } else {
          warningModal.style.display = "block";
        }
      }

    selectedLunchBtn.addEventListener("click", lunchRandomGenerate);

    spanModalClose.onclick = function () {
        warningModal.style.display = "none";
        console.log("Clicked")
    }; // need to make this work 

    window.onclick = function (event) {
        if (event.target == warningModal) {
            warningModal.style.display = "none"
        }
    };
});
