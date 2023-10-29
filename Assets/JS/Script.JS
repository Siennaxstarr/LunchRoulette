
document.addEventListener('DOMContentLoaded', function () {
    var zipCodeEl = document.querySelector("#zip");
    var radiusEl = document.querySelector("#radius");
    var landingPageBtn = document.querySelector('#landingBtn');
    var selectedRestaurantAddBtn = document.querySelector('#add-restaurant');
    var restaurantNameInput = document.querySelector('#restaurant-name'); //
    var zipCode = localStorage.getItem("zip");
    var radius = localStorage.getItem("radius");

    var restaurantList = document.querySelector('#selected-restaurants');

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
        selectedRestaurantAddBtn.addEventListener('click', function() {
            var newLi = document.createElement('li');
            var restaurantNameValue = restaurantNameInput.value; //
            var textNode = document.createTextNode(restaurantNameValue);
            newLi.appendChild(textNode);
            restaurantList.appendChild(newLi);
        });
    }

    function lunchRandomGenerate() {
        var selectedRestaurant = [];
        var warningModal = document.querySelector("#warningModal");
        restaurantList[(Math.floor(Math.random() * restaurantList.length))];
        if(selectedRestaurant === null) {
            
        }
    }
    function lunchRandomButton() {
        var lunchRandomButtonEl = document.querySelector("#select-lunch");
    }
});

