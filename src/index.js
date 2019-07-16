document.addEventListener("DOMContentLoaded", function() {
    fetch("http://localhost:3000/beers")
    .then(res => res.json())
    .then(beers => {
        const ulTag = document.querySelector("ul#list-group")
        beers.forEach(beer => {
            ulTag.innerHTML += `<li class="list-group-item" data-id=${beer.id}>${beer.name}</li>`
        });
    })

    document.addEventListener("click", function(e) {
        if (e.target.tagName === "LI") {
            fetch(`http://localhost:3000/beers/${e.target.dataset.id}`)
            .then(res => res.json())
            .then(beer => {
                const divTag = document.querySelector("div#beer-detail")
                divTag.innerHTML = `<h1>${beer.name}</h1>
                <img src=${beer.image_url}>
                <h3>${beer.tagline}</h3>
                <textarea>${beer.description}</textarea>
                <button id="edit-beer" class="btn btn-info" data-id=${beer.id}>
                  Save
                </button>`
            })
        } else if (e.target.tagName === "BUTTON" && e.target.id === "edit-beer") {
            const new_description = e.target.previousElementSibling.value
            fetch(`http://localhost:3000/beers/${e.target.dataset.id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    description: new_description
                })
            })
        }
    })
})