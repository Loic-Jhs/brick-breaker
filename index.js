let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

//position de la balle 
let x = canvas.width/2;
let y = canvas.height-30;
let dx = 2;
let dy = -2;
let ballRadius = 10;

//Hauteaur & largeur + point départ de la raquette 
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width-paddleWidth)/2;

let rightPressed = false;
let leftPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//Lorsque la touche est enfoncée 
function keyDownHandler(e) {
  if(e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true;
  }
  else if(e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true;
  }
}

//Lorsque la touche cesse d'être enfoncée 
function keyUpHandler(e) {
  if(e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
  }
  else if(e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false;
  }
}

//fonction qui dessine la balle
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

//fonction qui dessine la raquette
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
} 

//fonction appelée toutes les 10mlsec pour redessiner la balle 
//la balle est dessiné, effacer puis redessiné 
//afin de donner l'impression d'un mouvement. 
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();

  //Conditions qui fait rebondir la balle de gauche à droite
  if(x + dx > canvas.width || x + dx < ballRadius) {
    dx = -dx;
  }

  //Conditions qui fait rebondir la balle de haut en bas
  if(y + dy > canvas.height || y + dy < ballRadius) {
    dy = -dy;
  }

  x += dx;
  y += dy;

  //Si la touche droite est enfoncée, 
  //la raquette se déplacera de sept pixels vers la droite
  if(rightPressed) {
    paddleX += 7;
    //Condition pour ne pas que la raquette dépasse du canva sur la droite 
    if (paddleX + paddleWidth > canvas.width){
      paddleX = canvas.width - paddleWidth;
    }
  }
  //Si la touche gauche est enfoncée, 
  //la raquette se déplacera de sept pixels vers la gauche
  else if(leftPressed) {
    paddleX -= 7;
    //Condition pour ne pas que la raquette dépasse du canva sur la gauche
    if (paddleX < 0){
      paddleX = 0;
    }
  }
}

setInterval(draw, 10);