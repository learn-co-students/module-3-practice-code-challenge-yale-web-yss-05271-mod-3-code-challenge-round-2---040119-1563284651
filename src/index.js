document.addEventListener('DOMContentLoaded', (e)=> {

    function addBeer(beer) {
        document.querySelector('ul').innerHTML += `<li data-beer-id="${beer.id}" class="list-group-item">${beer.name}</li>`
        }
    function displayBeer(beer){
        document.getElementById('beer-detail').innerHTML = 
        document.getElementById('beer-detail').innerHTML = 
        `<h1>${beer.name}</h1>
        <img src= ${beer.image_url}>
        <h3>${beer.tagline}</h3>
        <textarea>${beer.description}</textarea>
        <button data-beer-id="${beer.id}" id="edit-beer" class="btn btn-info">
          Save
        </button>`
    }
    
    fetch('http://localhost:3000/beers', (event) =>{
        return event     
    }).then(resp => resp.json()).then(data => data.forEach(addBeer))
    
    document.addEventListener('click', (event) =>{
        if (event.target.className === 'list-group-item')
        {
            fetch('http://localhost:3000/beers', (event) =>{
                return event     
            }).then(resp => resp.json())
            .then(data => { 
                let beer_id = parseInt(event.target.dataset.beerId) - 1
                displayBeer(data[beer_id])
})}})

document.addEventListener(`click`, (event) =>{
    if (event.target.id === `edit-beer`) {
        let beer_id = parseInt(event.target.dataset.beerId)
        let beer_description = document.querySelector('textarea').value 
        
        fetch(`http://localhost:3000/beers/${beer_id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    description: beer_description
                })
            })
    }
})






})