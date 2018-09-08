//Recebendo Canvas HTML
const csv = document.getElementById('snake');
const ctx = csv.getContext('2d');

const box = 32;

//Controlar a snake
document.addEventListener("keydown", direction);

let d;

function direction(event){
    if(event.keyCode == 37){
        d = "LEFT";
    }else if(event.keyCode == 38){
        d = "UP";
    }else if(event.keyCode == 39){
        d = "RIGTH";
    }else if(event.keyCode == 40){
        d = "DOWN";
    }
}

const ground = new Image();
ground.src = "./img/ground.jpg"

const foodImg = new Image();
foodImg.src = "./img/apple.png";

//Criando a cobra
let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
}

//Criando a maça
let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
}

let score = 0;

//Quando bate
function collision(head, array){
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
         return true; 
     }
 }
 return false;
}

function draw(){
    ctx.drawImage(ground, 0, 0);   
    for(let i = 0; i < snake.length; i++){
        ctx.fillStyle = (i == 0) ? "green" : "green";
        ctx.fillRect(snake[i].x, snake[i].y, box, box );

        ctx.strokeStyle = "black";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box );
    } 

    ctx.drawImage(foodImg, food.x, food.y);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box;
    if( d == "RIGTH") snakeX += box;
    if( d == "DOWN") snakeY += box;

    if(snakeX == food.x && snakeY == food.y){
       score++;
       food = {
        x: Math.floor(Math.random() * 17 + 1) * box,
        y: Math.floor(Math.random() * 15 + 3) * box
    }
}else{
    snake.pop();
}

let newHead = {
    x: snakeX,
    y: snakeY
}

if(snakeX < (box - 50)|| snakeX > 18 * box || snakeY < 0 * box || snakeY > 18 * box || collision(newHead, snake)){
    document.getElementById("over").style.display = "block";
    document.getElementById("recomecar").style.display = "block";
    clearInterval(game);
}

snake.unshift(newHead);

ctx.fillStyle = "white";
ctx.font = "45px Changa One";
ctx.fillText(score, 1*box, 1.5*box);
}

let game = setInterval(draw, 100);