// Ensure Page is Loaded
document.addEventListener("DOMContentLoaded", function(){
  fetch("http://localhost:3000/beers")
  .then(resp => resp.json())
  .then(data => {

    for (let i=0; i < data.length; i++){
      let placeBeers = document.querySelector(".list-group")
      placeBeers.innerHTML += `
      <li class="list-group-item" data-id=${data[i].id}>${data[i].name}</li>`
    }
  })

  // Add All Beers to the Page
  document.addEventListener('click', function(e){
    const beerDetails = document.querySelector("#beer-detail")
    if (e.target.tagName === "LI"){
      fetch(`http://localhost:3000/beers/${e.target.dataset.id}`)
      .then(resp => resp.json())
      .then(data => {
        beerDetails.innerHTML = ''
        beerDetails.innerHTML += `<h1 data-id=${data.id}><i><u>${data.name}</i></u></h1>
          <img src="${data.image_url}">
          <h3>${data.tagline}</h3>
          <textarea>${data.description}</textarea>
          <button id="edit-beer" class="btn btn-info">
            Save
          </button>`
      })
    }

    // PATCH - Allow User to Edit Beer Description
    else if (e.target.tagName === "BUTTON"){
      const newText = e.target.parentElement.children[3].value
      fetch(`http://localhost:3000/beers/${e.target.parentElement.children[0].dataset.id}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          "description": newText
        })
      })
    }
  })
})
