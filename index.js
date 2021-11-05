let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

//pour info ctx = contexte

//position de la balle 
let ballRadius = 10;
let x = canvas.width/2;
let y = canvas.height-30;
let dx = 2;
let dy = -2;

//Hauteur & largeur + point départ de la raquette 
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width-paddleWidth)/2;

//Variables des touches du clavier
let rightPressed = false;
let leftPressed = false;
let spacePressed = false;

//Variable des briques
let brickRowCount = 5;
let brickColumnCount = 3;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;

//On parcours un tableau à 2 dimensions, qui contient les colonnes de briques (c)
//et qui à leur tour contiendront les lignes de briques (r)
//qui chacune contiendront un objet défini par une position x et y pour afficher chaque brique sur l'écran
let bricks = [];
for(let c=0; c<brickColumnCount; c++) {
  bricks[c] = [];
  for(let r=0; r<brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0 };
  }
}

//écouteur d'évenement sur les fonctions des touches (keyDownHandler & keyUpHandler)
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//Lorsque la touche est enfoncée 
function keyDownHandler(e) {
  if(e.keyCode == 39) {
    rightPressed = true;
  }
  else if(e.keyCode == 37) {
    leftPressed = true;
  }
  //Mettre le jeu en pause
  if(e.keyCode == 32) {
    spacePressed = true;
    alert("PAUSE");
  }
}

//Lorsque la touche cesse d'être enfoncée
function keyUpHandler(e) {
  if(e.keyCode == 39) {
    rightPressed = false;
  }
  else if(e.keyCode == 37) {
    leftPressed = false;
  }
  if(e.keyCode == 32) {
    spacePressed = false;
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

//On parcour toutes les briques dans le tableau et on les dessine sur l'écran
function drawBricks() {
  for(let c=1; c<brickColumnCount; c++) {
    for(let r=1; r<brickRowCount; r++) {
      //calculs qui définissent la position x et y de chaque brique à chaque passage dans la boucle
      let brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
      let brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
      bricks[c][r].x = brickX;
      bricks[c][r].y = brickY;
      ctx.beginPath();
      ctx.rect(brickX, brickY, brickWidth, brickHeight);
      ctx.fillStyle = "#0095DD";
      ctx.fill();
      ctx.closePath();
    }
  }
}

//fonction appelée toutes les 10mlsec pour redessiner la balle 
//la balle est dessiné, effacer puis redessiné 
//afin de donner l'impression d'un mouvement. 
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();

  //Conditions qui fait rebondir la balle de gauche à droite
  if(x + dx > canvas.width || x + dx < ballRadius) {
    dx = -dx;
  }

  //Conditions qui fait rebondir la balle de haut en bas
  if(y + dy < ballRadius) {
    dy = -dy;
  } 

  //Détecte si la balle arrive bien entre les 2 bords de la raquette
  else if(y + dy > canvas.height-ballRadius) {
    if(x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    }

    //Sinon game over (en dehors de la raquette)
    else {
      alert("GAME OVER");
      document.location.reload();
      clearInterval(interval);
    }
  }

  //Si la touche droite est enfoncée, 
  //la raquette se déplacera de 7 pixels vers la droite
  if(rightPressed && paddleX < canvas.width-paddleWidth) {
    paddleX += 7;
  }

  //Si la touche gauche est enfoncée, 
  //la raquette se déplacera de 7 pixels vers la gauche
  else if(leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  x += dx;
  y += dy;
}

let interval = setInterval(draw, 10);