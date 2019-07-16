const URL = "http://localhost:3000/beers"
const ulTag = document.querySelector('ul#list-group')
const beerDetail = document.querySelector('div#beer-detail')

document.addEventListener('DOMContentLoaded', function(){
    fetch(URL)
    .then(res => res.json())
    .then(data =>
        data.forEach(function(beer) {
            ulTag.innerHTML += `<li class="list-group-item" data-id=${beer.id}>${beer.name}</li>`
        })
    )
    
    document.addEventListener('click', function(e){
        // console.log(e)
        let beerId = e.target.dataset.id
        if (e.target.className === 'list-group-item') {
            fetch(`http://localhost:3000/beers/${beerId}`, {
                method: "GET"
            })
            .then(res => res.json())
            .then(function(beer){
                beerDetail.innerHTML = 
                `<h1>${beer.name}</h1>
                <img src="${beer.image_url}">
                <h3>${beer.tagline}</h3>
                <textarea>${beer.description}</textarea>
                <button id="edit-beer" class="btn btn-info" data-id="${beer.id}">Save</button>`
            })   
        } else if (e.target.className === "btn btn-info") {
            let beerId = e.target.dataset.id
            fetch(`http://localhost:3000/beers/${beerId}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    description: `${e.target.previousElementSibling.value}`
                })
            })
            .then(res => res.json())
        }
    })
})
