const MAIN_URL = 'http://localhost:3000/beers'

document.addEventListener('DOMContentLoaded', function(){
    function getBeers(){
        return fetch(MAIN_URL)
        .then(res => res.json())
    }

    function renderBeers(beer){
        let ulTag = document.querySelector("#list-group")
        ulTag.innerHTML += `<li data-id=${beer.id} class="list-group-item">${beer.name}</li>`
    }

    function renderBeerDetail(beer){
        let divTag = document.getElementById('beer-detail')
        divTag.innerHTML = `<h1>${beer.name}</h1>
        <img src=${beer.image_url}>
        <h3>${beer.tagline}</h3>
        <textarea>${beer.description}</textarea>
        <button data-id=${beer.id} id="edit-beer" class="btn btn-info">
          Save
        </button>`
    }

    // render all beers
    getBeers().then(beers => {
        beers.forEach(beer => {
            renderBeers(beer)
        })
    })


    document.addEventListener('click', function(e){
        // display beer details upon click
        if (e.target.nodeName === "LI"){
            fetch(`http://localhost:3000/beers/${e.target.dataset.id}`)
            .then(res => res.json())
            .then(beer => {
                renderBeerDetail(beer)
            })
        }
        // edit beer description upon 'save'
        else if (e.target.nodeName === 'BUTTON') {
            // debugger
            description = document.querySelector('textarea').value
            fetch(`http://localhost:3000/beers/${e.target.dataset.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    description: description
                })
            })
            .then(res => res.json())
            .then(beer => {
                renderBeerDetail(beer)
            })
        }

    })

    
})