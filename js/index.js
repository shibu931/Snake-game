//Game Constants
let inputDir = {
    x: 0,
    y: 0
};
const foodSound = new Audio('../music/food.mp3');
const gameOversound = new Audio('../music/gameover.mp3')
const moveSound = new Audio("../music/move.mp3")
const musicSound = new Audio('../music/music.mp3')
let speed = 5;
let lastPaintTime = 0;
let snakeArr = [
    {
        x: 13,
        y: 15
    }
]
let food = {
    x: 6,
    y: 7
}
let score = 0
let currentDir = { x: 0, y: 0 };
let highScoreval=0;


//Game Function
function main(ctime) {
    window.requestAnimationFrame(main)
    if(score>15){
        speed=6
    }else if(score>20){
        speed=8
    }else if(score>25){
        speed=10
    }else if(score>30){
        speed=12
    }else if(score>35){
        speed=14
    }else if(score>40){
        speed=16
    }else if(score>45){
        speed=18
    }else if(score>50){
        speed=20
    }else if(score>55){
        speed=22
    }else if(score>60){
        speed=24
    }else if(score>65){
        speed=26
    }
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake){
    //Bump into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    //Bump into the wall
    if(snake[0].x>=18 || snake[0].x <=0  || snake[0].y>=18 || snake[0].y <=0){
        return true
    }
    return false;
}

function gameEngine() {
    //Part 1: Update the snake array & food
    if(isCollide(snakeArr)){
        gameOversound.play();
        musicSound.pause();
        inputDir = {x:0, y:0};
        alert("Nikal Loru!!!")
        snakeArr = [{x:13,y:15}];
        // musicSound.play()
        score=0;
        speed=0
        scoreBox.innerHTML="Score: " + score
    }

    //If you have eaten the food increment the score and regenrate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play()
        score +=1;
        if(score>highScoreval){
            highScoreval=score
            localStorage.setItem("highScore",JSON.stringify(highScoreval))
            highScoreBox.innerHTML ='High Score: '+highScoreval
        }
        scoreBox.innerHTML="Score: " + score
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a =2;
        let b =16;
        food = {x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
    }

    //Moving the snake
        for (let i = snakeArr.length - 2; i>=0; i--) { 
            snakeArr[i+1] = {...snakeArr[i]};
        }
        snakeArr[0].x += inputDir.x;
        snakeArr[0].y += inputDir.y;
    
    //Part 2: Display the snake and food
    //Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0) {
            snakeElement.classList.add('head')
        } else {
            snakeElement.classList.add('snake')
        }
        board.appendChild(snakeElement)
    });
    //Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement)

}

//Main Logic
let highScore = localStorage.getItem("highScore")
if(highScore===null){
    highScoreval=0;
    localStorage.setItem("highScore",JSON.stringify(highScoreval))
}else{
    highScoreval = JSON.parse(highScore)
    highScoreBox.innerHTML= "High Score : "+highScore
}
window.requestAnimationFrame(main)
function play(key){
    inoutDir = { x: 0, y: 1 }
    moveSound.play();
    console.log(key)
    switch (key) {
        case "up":
            if (currentDir.y !== 1) { // Prevent the snake from going back down
                inputDir.x = 0;
                inputDir.y = -1;
                currentDir.x = inputDir.x;
                currentDir.y = inputDir.y;
            }
            break;
        case "down":
            if (currentDir.y !== -1) { // Prevent the snake from going back up
                inputDir.x = 0;
                inputDir.y = 1;
                currentDir.x = inputDir.x;
                currentDir.y = inputDir.y;
            }
            break;
        case "left":
            if (currentDir.x !== 1) { // Prevent the snake from going back right
                inputDir.x = -1;
                inputDir.y = 0;
                currentDir.x = inputDir.x;
                currentDir.y = inputDir.y;
            }
            break;
        case "right":
            if (currentDir.x !== -1) { // Prevent the snake from going back left
                inputDir.x = 1;
                inputDir.y = 0;
                currentDir.x = inputDir.x;
                currentDir.y = inputDir.y;
            }
            break;
        default:
            break;
    }
}
window.addEventListener('keydown', e => {
    inoutDir = { x: 0, y: 1 }
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            if (currentDir.y !== 1) { // Prevent the snake from going back down
                inputDir.x = 0;
                inputDir.y = -1;
                currentDir.x = inputDir.x;
                currentDir.y = inputDir.y;
            }
            break;
        case "ArrowDown":
            if (currentDir.y !== -1) { // Prevent the snake from going back up
                inputDir.x = 0;
                inputDir.y = 1;
                currentDir.x = inputDir.x;
                currentDir.y = inputDir.y;
            }
            break;
        case "ArrowLeft":
            if (currentDir.x !== 1) { // Prevent the snake from going back right
                inputDir.x = -1;
                inputDir.y = 0;
                currentDir.x = inputDir.x;
                currentDir.y = inputDir.y;
            }
            break;
        case "ArrowRight":
            if (currentDir.x !== -1) { // Prevent the snake from going back left
                inputDir.x = 1;
                inputDir.y = 0;
                currentDir.x = inputDir.x;
                currentDir.y = inputDir.y;
            }
            break;
        default:
            break;
    }
})                
