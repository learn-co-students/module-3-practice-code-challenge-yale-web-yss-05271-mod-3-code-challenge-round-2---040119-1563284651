document.addEventListener('DOMContentLoaded', () => {

    // Display all beer names
    fetch('http://localhost:3000/beers', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(resp => resp.json()).then(data => {
        let list = document.getElementById('list-group')
        data.forEach(beer => {
            list.innerHTML += `<li class="list-group-item" data-id=${beer.id}>${beer.name}</li>`
        })
    })

    document.addEventListener('click', event => {
        if (event.target.classList.contains('list-group-item')) {
            fetch(`http://localhost:3000/beers/${event.target.dataset.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(resp => resp.json()).then(data => {
                let detail = document.getElementById('beer-detail')
                detail.innerHTML = `<h1>${data.name}</h1>
                <img src=${data.image_url}>
                <h3>${data.tagline}</h3>
                <textarea>${data.description}</textarea>
                <button id="edit-beer" class="btn btn-info" data-id=${data.id}>Save</button`
            })
        }

        else if (event.target.className === "btn btn-info") {
            debugger
            fetch(`http://localhost:3000/beers/${event.target.dataset.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    "description": event.target.parentElement.children[3].value
                })
             })
        }
    })
})