
document.addEventListener('DOMContentLoaded', function () {
    var zipCodeEl = document.querySelector("#zip");
    var radiusEl = document.querySelector("#radius");
    var landingPageBtn = document.querySelector('#landingBtn');
    var selectedRestaurantAddBtn = document.querySelector('#add-restaurant');
    var restaurantNameInput = document.querySelector('#restaurant-name'); //
    var selectedRestaurants= [];
    var selectedLunchBtn = document.querySelector("#select-lunch");
    var randomRestaurantDiv = document.querySelector("#random-restaurant");
    var restaurantList = document.querySelector('#selected-restaurants');
    
    var zipCode = localStorage.getItem("zip");
    var radius = localStorage.getItem("radius");

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
        var warningModal = document.querySelector("#warningModal");

        if(selectedRestaurants.length > 0) {
        var randomIndex = Math.floor(Math.random() * selectedRestaurants.length);
        var selectedRestaurant = selectedRestaurants[randomIndex];
        randomRestaurantDiv.textContent = selectedRestaurant;
        } else {
            return warningModal;
        }
    }

    if(selectedLunchBtn) {
        selectedLunchBtn.addEventListener("click", lunchRandomGenerate)
    }
});

