var player = {
		lives:5,
		points:0,
	};

	var X;
	var Y;
	var odejmijX = 0;
	var odejmijY = 0;
	var gameStarted = false;
	var loss = false;

	var pole = document.getElementById('pole');
	var btnStart = document.getElementById('btnStart');
	var points = document.getElementById('points');
	var lives = document.getElementById('lives');
	var menu = document.getElementById('menu');
	var rand = document.getElementsByClassName('rand');
	var timer1 = 0;

btnStart.addEventListener('click', function() {

	player.lives = 5;
	player.points = 0;
	gameStarted = true;
	loss = false;
	showLives();
	showPoints();
	random1();
	btnStart.style.display = "none";
})

rand[0].addEventListener('click', function() { 

		increasePoints(player);
		showPoints();
		clearTimeout(timer1);
		rand[0].style.display = "none";
		random1();
		
	})

function zmniejsz(kolo, r ) {
	console.log("SZEROKOSC",r);
	kolo.style.width=(r+"px");
	kolo.style.height=(r+"px");
	if(r == 0 ) {

		decreaseLives(player);
		if(player.lives == 0)
		{
			kolo.style.display = "none";
			gameOver(loss);
			return;
		}
		else {
			showPoints();
			showLives();
			kolo.style.display = "none";
			random1();
			return;
		}
	}
	if(!loss) {
		
		if(kolo.style.display == "none") {
			return;
		} else {	
	     var minus = 1;
	     if(player.points){minus=player.points;}
		 timer1 = setTimeout(zmniejsz,10-Math.log2(minus),kolo, r-1);
			return;
		}
	}
}

function random1() {
		
	X = Math.random()*689+1;
	Y = Math.random()*998+1;

	rand[0].style.top= (X+"px");
	rand[0].style.left= (Y+"px");
	rand[0].style.display = "block";

	zmniejsz(rand[0], 100);
}

function showPoints(){

	points.innerHTML='<h2>Points:</br>'+player.points+'</h2></br>'
}

function showLives() {
	var yes="";
	for(let i=0; i<player.lives; i++ ){
		yes+="@ ";
	}
	 lives.innerHTML='<h2>Lives:</br>'+yes+'</h2></br>';
}

function decreaseLives(player) {
	return --player.lives;
}
function increasePoints(player) {
	return ++player.points;
}

function gameOver(loss) {

	btnStart.style.display = "block";
	lives.innerHTML="";
	points.innerHTML ='<h2>YOU LOST!</br>Score:</br>'+player.points+'</h2>';
	loss = true;
	return loss;
}
