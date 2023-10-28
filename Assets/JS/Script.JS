var zipCodeEl = document.querySelector("#zip");
var radiusEl = document.querySelector("#radius");

var zipCode = localStorage.getItem("zip");
var radius = localStorage.getItem("radius");

var landingPageBtn = document.querySelector('#landing-btn')

landingPageBtn.addEventListener('click', function () {
    var zipCodeElValue = zipCodeEl.value;
    var radiusElValue = radiusEl.value;
    
    localStorage.setItem("zip", zipCodeElValue);
    localStorage.setItem("radius", radiusElValue)
});