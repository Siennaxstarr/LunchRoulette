var getImageBtn = document.getElementById("getImage")

function giphyApiRequest() {
    var giphyApiKey = "Xfa4ZJscRqngOMt0VYXq2Lzajnm1JEFR"
    var giphyApiUrl = `https://api.giphy.com/v1/gifs/translate?s=food&api_key=${giphyApiKey}`

    fetch(giphyApiUrl).then(function (data) {
        console.log(data.json)
        return data.json()
    })
        .then(function (json) {
            var imgPath = json.data.images.fixed_height.url
            var imgContainer = document.getElementById('giphy-image');
            var imgEl = document.createElement('img')
            imgEl.setAttribute("src", imgPath)
            imgContainer.appendChild(imgEl)
        })

};

document.addEventListener("DOMContentLoaded", giphyApiRequest());