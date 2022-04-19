var score = 0

//cooldown for clicking
var cooldown = false
var gameOver = false
//array to store animals and projectiles
const animals = []
const projectiles = []

//setting up canvas
const canvas = document.
	querySelector('canvas')
const c = canvas.getContext('2d')
//static canvas size
canvas.width = 1000;
canvas.height = 1000;

var imgPig = new Image()
imgPig.src = "public/uglyPig.png"

var imgFrog = new Image()
imgFrog.src = "public/uglyFrog.png"

var imgDog = new Image()
imgDog.src = "public/cuteDog.png"

var imgCat = new Image()
imgCat.src = "public/cuteCat.png"
//player class for the playable character

class Player{
	//constructor
	constructor(x, y, radius, colour){
		this.x = x
		this.y = y

		this.radius = radius
		this.colour = colour
	}
	//draw function to show the player on screen
	draw(){
		c.beginPath()
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
		c.fillStyle = this.colour
		c.fill()
	}
}

//projectile class for player's projectiles
class Projectile{
	//constructor
	constructor(x, y, radius, colour, velocity)
	{
		this.x = x
		this.y = y
		this.radius = radius
		this.colour = colour
		this.velocity = velocity
	}
	//draw function to show the projectile on screen
	draw(){
		//begin drawing a path
		c.beginPath()
		//create an arc with radius pi squared (a full circle)
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
		//fill colour
		c.fillStyle = this.colour
		//fill the circle
		c.fill()
	}
	//when called, update moves the projectile using it's velocity
	update() {
		//draw the projectile
		this.draw()
		//new x/y position is x/y position plus velocity
		this.x = this.x + this.velocity.x
		this.y = this.y + this.velocity.y
	}
}


class Animal{
	constructor(x, y, ugly, radiusOrbit, speed, angle)
	{
		this.x = x
		this.y = y
		this.ugly = ugly
		this.radiusOrbit = radiusOrbit

		this.speed = speed
		this.angle = angle
	}

	//draw function to show the projectile on screen
	draw(){
		//begin drawing a path
		c.beginPath()
		//create an arc with radius pi squared (a full circle)
		c.arc(this.x, this.y, 20, 0, Math.PI * 2, false)
		//fill colour
		c.fillStyle = 'blue'
		//fill the circle
		c.fill()
		if (this.ugly == true){
			c.drawImage(imgPig, this.x - 30, this.y- 30, 60, 60)
		}
		else{
			c.drawImage(imgDog, this.x -30, this.y - 30, 60, 60)
		}
		



	}
	//when called, update moves the projectile using it's velocity
	update() {
		//draw the projectile
		this.draw()
		//new x/y position is x/y position plus velocity
		this.x = (canvas.width/2) + Math.cos(this.angle) * this.radiusOrbit
		this.y = (canvas.height/2) + Math.sin(this.angle) * this.radiusOrbit
		this.angle = this.angle + this.speed
		
		//increase radius of cute animals to leave eventually
		if (this.ugly == false){
			this.radiusOrbit = this.radiusOrbit + 0.1
		}
	}
}

//create a player object in the middle of the screen (canvas/2)
player = new Player(canvas.width /2, canvas.height / 2, 30, 'black')

//function to get a random number between min and max
function randomIntFromInterval(min, max) {
	return Math.floor(
		Math.random() * (max - min + 1) + min
	)
}


//function to spawn animals
function spawnAnimal(){
	animals.push(new Animal(
		//initial x/y doesnt matter
		0, 0,
		//getting random boolean for ugly 2/5
		Math.random() <= 0.5,
		//random radius between min and 500
		randomIntFromInterval(200, 500),
		//random speed (direction is decided by negatives or positives)
		randomIntFromInterval(-5, 5)/1000,
		//random starting angle
		randomIntFromInterval(0, 360)
	))
}

function animalTimer(){
	setInterval(() =>{
		if (gameOver == true){
			return
		}
		spawnAnimal()
	}, 2000)
}



//function called recursively to animate elements in the game
function animate() {
	if (gameOver == true) {
		return
	}
	//recursively calls itself
	requestAnimationFrame(animate)
	//clear the canvas
	c.fillStyle = 'rgb(108, 187, 60)'
	c.fillRect(0, 0, canvas.width, canvas.height)
	
	//draw the player
	player.draw()



	//for each projectile object
	projectiles.forEach(
		//update the projectile
		(projectile) => 
		{
			projectile.update()
		}
	)

	//for each animal object
	animals.forEach(
		//update the animal
		(animal, aIndex) => 
		{
			animal.update()
			//if an animals radius is over 550
			if (animal.radiusOrbit > 550){
				//remove animal
				animals.splice(aIndex, 1)
				//console.log('removed animal off screen')
			}
			//for each projectile
			projectiles.forEach(
			(projectile, pIndex) => {
				
				//calculate distance between projectile and animal
				const dist = Math.hypot(
				projectile.x -animal.x, 
				projectile.y -animal.y)
				//if the distance between the two is less than double projectile radius
				if (dist - projectile.radius < 30) {
					//console.log('hit animal')
						//if the animal is cute
						if (animal.ugly == true) {
							//console.log("animal was uggo")
							//remove the animal and projectile from their arrays
							animals.splice(aIndex, 1)
							projectiles.splice(pIndex, 1)
							//increase score by 1
							score = score + 1
							console.log(score)
						}
						else{
							endGame()
						}
				}
			})
		}
	)
}

//On click listener
addEventListener('click', (event) => {
		//variable to get the bounds of the current client
		var rect = event.target.getBoundingClientRect();
		
		//calculating the angle which the projectile must travel at to reach click position
		const angle = Math.atan2(
			//clientY/X gets click position, offset by the position of the client minus the height of canvas
			event.clientY  -rect.top - canvas.height/2,
			event.clientX  -rect.left - canvas.width/2
		)
		//velocity is calculated as a cos or sin of the angle to get between -1 and 1
		const velocity = {
			x: Math.cos(angle) *2,
			y: Math.sin(angle) *2
		}
		

		//if projectile is not on cooldown
		if (cooldown == false){
			//start cooldown
			cooldown = true
				//add a new projectile to the array with the target velocity
				projectiles.push(new Projectile(
				canvas.width/2,
				canvas.width/2,
				10, 
				'Aquamarine', 
				velocity
			))
			//wait for cooldown, then disable
			setTimeout(function(){
				cooldown = false
			}, 1000)

		}
	})

//On mousedown listener
addEventListener('mousedown', function (MDevent) {
	//prevents double clicks from selecting elements while within the game canvas
	//previously, game clicks may cause things to get highlighted
  if (MDevent.detail > 1) {
    MDevent.preventDefault();
  }
}, false);

//function to begin game on click within bounds
function handleEvent(e) {
		var rect = canvas.getBoundingClientRect();
		var evt = e ? e : window.event;
		clickX = evt.clientX - rect.left;
		clickY = evt.clientY - rect.top;
		var dx = canvas.width / 2 - clickX;
		var dy = canvas.height / 2 - clickY;
		if (dx * dx + dy * dy <= 200 * 200) {
			gameOver = false
			startGame();
		}
		return false;
		}


//function to end the game
function endGame(){
	alert("game over! score was: " + score);
	//clear arrays of entries
	animals.splice(0, animals.length)
	projectiles.splice(0, projectiles.length)

	gameOver = true
	mainMenu()
}

//function to start the game
function startGame(){
	canvas.removeEventListener("click", handleEvent)
	animate()
	animalTimer()
	score = 0
}


//function to display a main menu
function mainMenu(){
	//make a circle in the middle
	c.fillStyle = 'rgb(108, 187, 60)'
	c.fillRect(0, 0, canvas.width, canvas.height)
    c.beginPath();
	c.arc(canvas.width / 2, canvas.height / 2, 200, 0, 2 * Math.PI, false);
    c.closePath();
    c.stroke();

	//add font which reads "Play!"
	c.font = "30px Comic Sans MS";
	c.fillStyle = "black";
	c.textAlign = "center";
	c.fillText("Play!", canvas.width/2, canvas.height/2);

	//add event listener of handleEvent
	canvas.addEventListener("click", handleEvent);
}

mainMenu()

//animate is called once, then recurses
//animate()
//Timer which spawns an animal every interval
//