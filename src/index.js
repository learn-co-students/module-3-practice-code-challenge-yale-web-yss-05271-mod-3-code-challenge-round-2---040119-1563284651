// page loads using this..
document.eventListener('DOMLoadedContent', function(){
  fetch(http://localhost:3000/beers)
  .then(response => response.json())
  .then()
  })

  function getAll(beerNames) {
    // make our fetch request
    return fetch ("http://localhost:3000/beers")
    .then((response) => response.json())
    .then(beers => {
      console.log(beers)
//
      const beerNames = query.Selector('beerNames')
      beerNames.forEach((beerNames) => {

        beer.innerHTML = createBeerName(beer)
      })
      console.log(JSON.stringify(obj))

  }
