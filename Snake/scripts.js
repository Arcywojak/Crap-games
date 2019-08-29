
const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");
const pointsDiv = document.querySelector(".pointsDiv");
const LOSS = document.querySelector("#LOSS");

const box = 30;

const foodImg = new Image();
foodImg.src = "img/food.png";

//control snake 

let d;
let score = 0;

document.addEventListener("keydown", (e) => {
	if(e.keyCode == 37 && d!="RIGHT") {
		d = "LEFT";
	}
	else if(e.keyCode == 38 && d!="DOWN") {
		d = "UP";
	}
	else if(e.keyCode == 39 && d!="LEFT") {
		d = "RIGHT";
	}
	else if(e.keyCode == 40 && d!="UP") {
		d = "DOWN";
	}
})

//create snake
let snake = [];
snake[0] = {
	x: 9 * box,
	y: 9 * box
}

//create food

let food = {
	x: Math.floor(Math.random()*19) * box,
	y: Math.floor(Math.random()*19) * box
}

function collision(head, body) {
	for(let i=0; i<body.length; i++) {
		if(head.x == body[i].x && head.y == body[i].y){
			return true;
		}
	}
	return false;
}

function draw() {	

	pointsDiv.innerText = score;
   ctx.fillStyle = "lightblue";
   ctx.fillRect(0, 0,608, 608);

	for( let i = 0; i < snake.length ; i++){
        ctx.fillStyle = ( i == 0 )? "green" : "white";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }

    ctx.drawImage(foodImg, food.x, food.y);

    // head position 
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //which direction
    if(d == "LEFT") snakeX -= box;
    if(d == "UP") snakeY -= box;
    if(d == "RIGHT") snakeX += box;
    if(d == "DOWN") snakeY += box;

    // if the snake eats food
    if(snakeX == food.x && snakeY == food.y)
    {
    	score ++;
    	food = {
    		x: Math.floor(Math.random()*19) * box,
			y: Math.floor(Math.random()*19) * box
    	}
    }
    else {
    	//remove the tail	
    	snake.pop();
    }

    //add new head
    let newHead = {
    	x : snakeX,
    	y : snakeY
    }

    //LOST GAME
    if(snakeX > 19 * box || snakeX < 0 || snakeY > 19 * box
     || snakeY < 0  || collision(newHead, snake)) {   
    	LOSS.innerText = "YOU LOST"; 
    	clearInterval(game);
    	
    }

    
       
    snake.unshift(newHead);

}

let game = setInterval(draw,100);

//draw();




