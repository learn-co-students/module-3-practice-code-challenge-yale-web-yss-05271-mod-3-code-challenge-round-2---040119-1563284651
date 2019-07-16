document.addEventListener('DOMContentLoaded', function(){
    fetch(`http://localhost:3000/beers`)
    .then(resp => resp.json())
    .then(beers => {
        ulTag = document.querySelector('.list-group')
        beers.forEach(beer => {
            ulTag.innerHTML += `<li class="list-group-item" id="${beer.id}">${beer.name}</li>`
        })
    })

    document.addEventListener('click', function(e){
        if(e.target.tagName === "LI"){
        console.log(e.target)
        fetch(`http://localhost:3000/beers/${e.target.id}`)
        .then(resp => resp.json())
        .then(beer => {
            divTag = document.querySelector(`#beer-detail`)
            divTag.innerHTML = ""
            divTag.innerHTML += `<h1>${beer.name}</h1>
            <img src="${beer.image_url}">
            <h3>${beer.tagline}</h3>
            <textarea>${beer.description}</textarea>
            <button id="${e.target.id}" class="btn btn-info">
              Save
            </button>`
        })
        } else if(e.target.className === "btn btn-info"){
            
            text = document.querySelector('textarea').value
            console.log(text)
            fetch(`http://localhost:3000/beers/${e.target.id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                
                    "description": text
                })
            })
            .then(resp => resp.json())
            .then(beer => {
                `<h1>${beer.name}</h1>
                <img src="${beer.image_url}">
                <h3>${beer.tagline}</h3>
                <textarea>"description"</textarea>
                <button id=${beer.id} class="btn btn-info">
                Save
                </button>`
            })
        }


    })


})