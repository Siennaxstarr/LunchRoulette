
// document.addEventListener('DOMContentLoaded')
    var zipCodeEl = document.querySelector("#zip");
    var radiusEl = document.querySelector("#radius");
    var landingPageBtn = document.querySelector('#landingBtn');
    var selectedRestaurantAddBtn = document.querySelector('#add-restaurant');
    var restaurantNameInput = document.querySelector('#restaurant-name');
    var selectedRestaurants = [];
    var selectedLunchBtn = document.querySelector("#select-lunch");
    var randomRestaurantDiv = document.querySelector("#random-restaurant");
    var restaurantList = document.querySelector('#selected-restaurants');
    var spanModalClose = document.getElementsByClassName("close")[0];
    var warningModal = document.querySelector("#warningModal");

    //We can probably change this to either zip code OR city as YELP API takes both inputs in a single param
    var zipCode = localStorage.getItem("zip");

    //Might need to scrap radius since it doesnt appear like yelp takes radius as a param
    var radius = localStorage.getItem("radius");

    //API Functionality

    function getRestaurants() {
        var apiKey = "45tfPm96CvqZsW-ts-INSRMufGdVHo4g6f64M9NvsbbBNiVAj0Nw8Vv8sJGDpJdQvLuhQ9quIS4Uvav_fYLM9K3dd1qWGaaBKDX28EEZ2Ii33mxtKikiqijcX11AZXYx";
        var requestedLocationZipCode = "91733";
        var requestedLocation = `https://api.yelp.com/v3/businesses/search?location=${requestedLocationZipCode}`;

        try {
            const response = fetch(requestedLocation, {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": '*',
                    mode: 'no-cors'
                    // Connection: 'keep-alive',
                    // Server: 'envoy'
                }
            });

            if (response.ok) {
                const data = response.json();
                console.log(data);
            } else {
                console.error(`ERROR: ${response.status}`);
            }
        } catch(error) {
            console.log(error);
        }
    }

    getRestaurants()

    function redirectPage() {
                    location.replace("./landing.html");
                }

    if (landingPageBtn) {
            landingPageBtn.addEventListener('click', function () {
                var zipCodeElValue = zipCodeEl.value;
                var radiusElValue = radiusEl.value;

                localStorage.setItem("zip", zipCodeElValue);
                localStorage.setItem("radius", radiusElValue);

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

            if (selectedRestaurants.length > 0) {
                var randomIndex = Math.floor(Math.random() * selectedRestaurants.length);
                var selectedRestaurant = selectedRestaurants[randomIndex];
                randomRestaurantDiv.textContent = selectedRestaurant;
            } else {
                warningModal.style.display = "block";
            }
        }

        if (selectedLunchBtn) {
            selectedLunchBtn.addEventListener("click", lunchRandomGenerate)
        };

        spanModalClose.onclick = function () {
            warningModal.style.display = "none";
            console.log("Clicked")
        }; // need to make this work 

        window.onclick = function (event) {
            if (event.target == warningModal) {
                warningModal.style.display = "none"
            }
        };
    