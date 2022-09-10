let cellSize=10;
let state = [];
let Direction = 'UP';
let length = 3;
let currentPos = {x:0,y:0};
let applePos = {x:0,y:0};
let scl;
let status = 1;
let score = document.querySelector('#score');
function setup(){
	createCanvas(400,400);
	scl = width/10;
	background(0);
	frameRate(10);
	stroke(255);
	create2DArray();
	spawnSnake();
	spawnApple();
}
function draw(){
	background(0);
	fill(0,255,0);
	//showGrid();
	showState();
	movNGrow();
	fill(255);
	score.innerHTML = status==1?'score '+(length-3):'Game Over<br> &nbsp press R';
	//move(10,10);
}
function spawnSnake(){
	currentPos.x = parseInt(random(scl));
	currentPos.y = parseInt(random(scl));
	state[currentPos.x][currentPos.y] = 1;
}
function reset(){
	for(let i = 0;i < state.length;i++){
		for(let j = 0;j < state.length;j++){
			state[i][j] = 0;
		}
	}
	spawnSnake();
	spawnApple();
	status = 1;
	loop();
}
//initializing a 2d array
function create2DArray(){
for(let i = 0;i < scl;i++){
	state[i] = [];
	for(let j = 0;j < scl;j++){
		state[i][j] = 0;
	}
}
}
function movNGrow(){
	for(let i = 0;i < state.length;i++){
		for(let j = 0;j < state.length;j++){
			if(state[i][j] > 0&&state[i][j] !== -1){
				fill(0,255,0);
				state[i][j]++;
				rect(i*10,j*10,cellSize,cellSize);
			}
		}
	}
	if(currentPos.x == applePos.x && currentPos.y == applePos.y){
		length++;
		console.log("apple eaten")
		spawnApple();
	}
	move(currentPos.x,currentPos.y);
}
function showState(){
	for(let i = 0;i < state.length;i++){
		for(let j = 0;j < state.length;j++){
			if(state[i][j] > 0 && state[i][j] <= length){
				fill(0,255,0);
				rect(i*10,j*10,cellSize,cellSize);
			}else if(state[i][j] > length){
				state[i][j] = 0;
			}
			if(state[i][j] == -1){
				fill(255,0,0);
				rect(i*10,j*10,cellSize,cellSize);
			}
		}
	}
}

function showGrid(){
	stroke(255);
	for(let i = 0;i < state.length;i++){
		for(let j = 0;j < state.length;j++){
				noFill();
				rect(i*10,j*10,cellSize,cellSize);
		}
	}
	
}

function move(x,y){
	let NewX = x;
	let NewY = y;
	try{
	if(Direction == 'UP'){
		NewY = y==0?NewY=39:(Math.abs(y)-1);
	}else if (Direction == 'DOWN') {
		NewY = (Math.abs(y)+1)%scl;
	}
	else if (Direction == 'LEFT') {
		NewX = x==0?NewX=39:(Math.abs(x)-1);
	}
	else if (Direction == 'RIGHT') {
		NewX = (Math.abs(x)+1)%scl;
	}
	if(state[NewX][NewY] > 1 && state[NewX][NewY] != -1){
		console.log("game over");
		status = -1;
		noLoop();
	}
	state[NewX][NewY] = 1;
	currentPos.x = NewX;
	currentPos.y = NewY;
}catch(err){
	
}
}
function spawnApple(){
	applePos.x = parseInt(random(scl));
	applePos.y = parseInt(random(scl));
	state[applePos.x][applePos.y] = -1;
}
function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    Direction = "LEFT";
  } else if (keyCode === RIGHT_ARROW) {
    Direction = "RIGHT";
  }
  else if (keyCode === UP_ARROW) {
    Direction = "UP";
  }
  else if (keyCode === DOWN_ARROW) {
    Direction = "DOWN";
  }else if(keyCode === 82){
  	reset();
  }else if(keyCode === 81){
  	noLoop();
  }
}