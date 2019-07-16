document.addEventListener('DOMContentLoaded', function() {
    const beerListContainer = document.getElementsByClassName('col-md-4')[0]
    const beerDetailContainer = document.getElementsByClassName('col-md-8')[0]
    const beerDetail = beerDetailContainer.getElementsByTagName('div')[0]


    //load all beers to the screen
    fetch('http://localhost:3000/beers')
    .then(resp => resp.json())
    .then(beers => {
        let ulTag = beerListContainer.getElementsByTagName('ul')[0]
        beers.forEach(function(beer) {
            let newBeer = document.createElement('li')
            newBeer.className = 'list-group-item'
            newBeer.dataset.beer_id = beer.id
            newBeer.innerText = `${beer.name}`
            ulTag.appendChild(newBeer)
        })

    })

    //clicking on a beer adds its details to the "beer-detail" div
    beerListContainer.addEventListener('click', function(event) {
        if(event.target.className === "list-group-item") {

            let beer_id = event.target.dataset.beer_id 
            
            fetch(`http://localhost:3000/beers/${beer_id}`)
            .then(resp => resp.json())
            .then(beer => {
            beerDetail.innerHTML = `<h1>${beer.name}</h1>
            <img src=${beer.image_url}>
            <h3>${beer.tagline}</h3>
            <textarea>${beer.description}</textarea>
            <button id="edit-beer" class="btn btn-info" data-beer_id=${beer.id}>
              Save
            </button>`

            })
        }
    })

    // add functionality to save edits to a beer's description

    beerDetailContainer.addEventListener('click', function(event) {
        if(event.target.id === "edit-beer") {
            event.preventDefault()
            let beer_id = event.target.dataset.beer_id
            let beer_description = event.target.parentElement.children[3].value
            
            // create the patch request to the server updating the 'description' field in the beer database
            fetch(`http://localhost:3000/beers/${beer_id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    description: beer_description
                })
            })
            
            // DOM is already updated -- no updates needed. 
        }
    })


})