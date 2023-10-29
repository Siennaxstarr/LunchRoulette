
var zipCodeEl = document.querySelector("#zip");
var radiusEl = document.querySelector("#radius");
var landingPageBtn = document.querySelector('#landingBtn');
var selectedRestaurantAddBtn = document.querySelector('#add-restaurant')

var zipCode = localStorage.getItem("zip");
var radius = localStorage.getItem("radius");


function redirectPage() {
    location.replace("./landing.html")
};

if (landingPageBtn) {
    landingPageBtn.addEventListener('click', function () {
        zipData = ""
        radiusData = ""
        var zipCodeElValue = zipCodeEl.value
        var radiusElValue = radiusEl.value
    
        localStorage.setItem("zip", zipCodeElValue);
        localStorage.setItem("radius", radiusElValue);
    
        redirectPage()
    });
}

document.addEventListener('DOMContentLoaded', function() {
    var selectedRestaurantAddBtn = document.querySelector('#add-restaurant')
    var restaurantNameInput = document.querySelector('#restaurant-name');
    var restaurantList = document.querySelector('#selected-restaurants');

    selectedRestaurantAddBtn.addEventListener('click', function() {
        var restaurantName = restaurantNameInput.value;

        var newLi = document.createElement('li')
        newLi.textContent = restaurantName
        restaurantList.appendChild(newLi)
        restaurantNameInput.value = ""
    })
})
