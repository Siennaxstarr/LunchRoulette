var zipCodeEl = document.querySelector("#zip");
var radiusEl = document.querySelector("#radius");
var landingPageBtn = document.querySelector('#landing-btn')

var zipCode = localStorage.getItem("zip");
var radius = localStorage.getItem("radius");

landingPageBtn.addEventListener('click', function() {
    var zipCodeElValue = zipCodeEl.value;
    var radiusElValue = radiusEl.value;

    localStorage.setItem("zip", zipCodeElValue);
    localStorage.setItem("radius", radiusElValue);
})

