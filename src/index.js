const BEER_URL = 'http://localhost:3000/beers';
const listGroup = document.querySelector('ul');
const beerDiv = document.getElementById('beer-detail');

document.addEventListener('DOMContentLoaded', function(e) {
    // 1. Display All Beer Names
    fetch(BEER_URL)
    .then(resp => resp.json())
    .then(beers => {
        beers.forEach(function(b) {
            listGroup.innerHTML += `<li class="list-group-item"> ${b.name} </li>`          
            }
        )
    })


    // 2. Display Single Beer Details
    document.addEventListener('click', function(e) {
        e.preventDefault();
        if(e.target.className === "list-group-item") {
            fetch(BEER_URL)
            .then(resp => resp.json())
            .then(beers => {
                beers.forEach(function(b) {
                    if (b.name === e.target.innerText) {
                    beerDiv.innerHTML = `<h1>${b.name}</h1>
                        <img src=${b.image_url}>
                        <h3>${b.tagline}</h3>
                        <textarea>${b.description}</textarea>
                        <button id="edit-beer" class="btn btn-info">
                        Save
                        </button>`
                    beerDiv.setAttribute("id", `${b.id}`)
                    }
                    
                })
            })
        }
        else if (e.target.className === "btn btn-info") {
            fetch(`${BEER_URL}/${e.target.parentElement.id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'},
                body: {description: JSON.stringify(description)}
            })
        }
    })
})