const BASE_URL = "http://localhost:3000/beers"



function createBeerLi(beer) {
    return `<li class="list-group-item" id=${beer.id}>${beer.name}</li>`
}

function createBeerDetail(beer) {
    return `
    <h1 id=${beer.id}>${beer.name}</h1>
    <img src=${beer.image_url}>
    <h3>${beer.tagline}</h3>
    <textarea>${beer.description}</textarea>
    <button id="edit-beer" class="btn btn-info">
        Save
    </button>
    `
}
document.addEventListener('DOMContentLoaded', function () {

    const beersUl = document.querySelector("ul.list-group")

    fetch(BASE_URL)
        .then(res => res.json())
        .then(beers => {
            beers.forEach(function (beer) {
                beersUl.innerHTML += createBeerLi(beer)
            })
        })

    const beerDetail = document.querySelector("div#beer-detail")

    beersUl.addEventListener('click', function (e) {
        let id = e.target.id

        fetch(`${BASE_URL}/${id}`)
            .then(res => res.json())
            .then(beer => {
                beerDetail.innerHTML = createBeerDetail(beer);
            })
    })

    beerDetail.addEventListener('click', function (e) {
        let editBeer = document.querySelector("#edit-beer")
        if (e.target === editBeer) {

            let id = beerDetail.querySelector("h1").id
            let description = beerDetail.querySelector("textarea").value
            //console.log(description)
            let url = `${BASE_URL}/${id}`

            fetch(url, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        "description": description
                    })
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                })
        }
    })


})