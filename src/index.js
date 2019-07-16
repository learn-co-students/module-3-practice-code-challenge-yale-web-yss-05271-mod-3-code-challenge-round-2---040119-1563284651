document.addEventListener('DOMContentLoaded', function(){

// display all beer names
  fetch('http://localhost:3000/beers').then(res => res.json()).then(data => {
    console.log(data)

    data.forEach(function(data){
      const beerList = document.getElementById("list-group")
      beerList.innerHTML += `<li>${data.name}</li>`
    })

   // displaying a sngle beer
    document.addEventListener('click', function(event){
    const beerDetail = document.getElementById("beer-detail")

    beerDetail.innerHTML += `<h1>${data.name}</h1>
    <img src=${data.img_url}>
    <h3>${data.tagline}</h3>
    <textarea>${data.description}</textarea>
    <button id="${data.id}" class="btn btn-info">Save</button>`
    })
  })

  // edit beer detail
  


  })
