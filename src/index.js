document.addEventListener('DOMContentLoaded', function(){
	fetch('http://localhost:3000/beers', {
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		}
	}).then(response => response.json())
	.then(beers => {
		const ulEl = document.querySelector("ul")
		console.log(ulEl)
		for (let beer of beers) {
			ulEl.innerHTML += `<li class= "list-group-item" data-id=${beer.id}>${beer.name}</li>`
		}
	})

	document.addEventListener('click', function(e){
		if (e.target.tagName === "LI") {
			const beerId = e.target.dataset.id
			
			fetch(`http://localhost:3000/beers/${beerId}`, {
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				}
			}).then(response => response.json())
			.then(beer => {
				const divEl = document.getElementById('beer-detail')
				divEl.innerHTML = `<h1>${beer.name}</h1>
									<img src="${beer.image_url}">
									<h3>${beer.tagline}</h3>
									<textarea>${beer.description}</textarea>
									<button id="edit-beer" class="btn btn-info" data-id=${beer.id}>
									Save
									</button>`
			}).then(response => {
				const refreshRate = 1000 / 60;
				const maxXPosition = 400;
				let rect = document.querySelector("img")
				console.log(rect)
				let speedX = 1;
				let positionX = 0;
				function step() {
				  positionX = positionX + speedX;
				  if (positionX > maxXPosition || positionX < 0) {
				    speedX = speedX * (-1);
				  }
				  rect.style.left = positionX + 'px';
				  window.requestAnimationFrame(step);
				}
				window.requestAnimationFrame(step);
			})
		} else if (e.target.tagName === "BUTTON") {
			const beerId = e.target.dataset.id
			const text = e.target.previousElementSibling.value
			console.log(text)

			fetch(`http://localhost:3000/beers/${beerId}`, {
				method: "PATCH",
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				},
				body:  JSON.stringify({
					"description": text
				})
			})
		}
	})
})

function step() {
    // UpdateUI();
    window.requestAnimationFrame(step);
  }
  window.requestAnimationFrame(step);