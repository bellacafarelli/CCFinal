let mainText;
let gameStage;
let playing = false;
let font;
let result;
let badresult;

// each video will have a variable and delay
let openingvideo;
let delay1 = 14400;

let choice1X = 100;
let choice1Y = 125;
let choice2X = 250;
let choice2Y = 125;
let choice3X = 400;
let choice3Y = 125;

//only need one of these
let timeStart = 0;


function preload(){
  font = loadFont('./assets/Play-Regular.ttf');
}

function setup() {
  let canvas = createCanvas(550, 400);
  canvas.parent('sketch-holder');
  rectMode(CENTER);
  mainText = new userChoice("Randy's Remarkable Adventure!");
  gameStage = "title";
  openingvideo = createVideo(['./assets/openingscene.mp4']);
  openingvideo.hide();
  
  //save
  let button = createButton('Take Picture');
  button.parent('button-holder');
  button.mousePressed(saveImage);
  
}

function draw() {
  textFont(font);
  background(220);
  switch (gameStage) {
    case "title":
      mainText.titleDisplay();
      break;
    case "choice1":
      mainText.stage1Display();
      break;
    case "choice2":
      mainText.stage2Display();
      break;
    case "gameOver":
      mainText.gameOverDisplay();
      break;
  }
}

function mouseReleased() {
  switch (gameStage) {
    case "title":
      gameStage = "choice1";
      // playing video when scene starts and setting delay
      openingvideo.play();
      timeStart = millis() + delay1;
      console.log(timeStart);
      break;
    case "choice1":
      gameStage = "choice2";
      choice1Click();
      break;
    case "choice2":
      gameStage = "gameOver";
      choice2Click();
      break;
    case "gameOver":
      gameStage = "title";
      gameOver();
      break;
      
  }
}

class userChoice {
  constructor(textContent) {
    this.textContent = textContent;
  }
  titleDisplay() {
  //title screen
    result = null;
    this.textContent = "Randy's Remarkable Adventure!";
    background('#47e3ff');
    noStroke();
    fill(220);
    rect (width/2, height/2, width/1.2, height/2);
    fill(0);
    textAlign(CENTER);
    textSize (30);
    text(this.textContent, width/2, height/2);
    textSize(15);
    text("Click to Start", width/2, height/1.6);
  }
  
  stage1Display() {
  //opening video
    textAlign(CENTER);
    
    //display video and puase at 14 seconds
    image(openingvideo,0,0);
    if(millis() > timeStart) {
      openingvideo.pause();
      //choices here
      fill(240);
      strokeWeight(2);
      stroke(255, 0, 0);
      rect(choice1X, choice1Y, 45, 30);
      rect(choice2X, choice2Y, 45, 30);
      rect (choice3X, choice3Y, 55, 30);
      noStroke();
      textSize(11);
      fill(0);
      text('Formal', choice1X, choice1Y);
      text('Casual', choice2X, choice2Y);
      text('Pajamas', choice3X, choice3Y);
    }
  }
  
  stage2Display() {
    
    textAlign(CENTER);
    openingvideo.stop();
    openingvideo.hide();
    //choices
     if (mouseX > choice1X - 10 && mouseX < choice1X + 10 && mouseY > choice1Y - 10 && mouseY < choice1Y + 10){
      gameStage = "gameOver";  
      result = 'bad';
      badresult = 'formal';
  }
    else if (mouseX > choice3X - 10 && mouseX < choice3X + 10 && mouseY > choice3Y - 10 && mouseY < choice3Y + 10){
      gameStage = "gameOver";
      result = 'bad';
      badresult = 'pajamas';
  }
    else if (mouseX > choice2X - 10 && mouseX < choice2X + 10 && mouseY > choice2Y - 10 && mouseY < choice2Y + 10){
      gameStage = 'gameOver';
      result = 'good';
    }
    
  }
  
  gameOverDisplay(){
    if (result == 'bad'){
    background('#de231d');
    gameStage = "gameOver";
    fill(0);
    textSize(50);
    stroke(0);
    text(this.textContent, width/2, height/2);
    textSize(15);
    text("Click to Restart", width/2, height/1.2);
    this.textContent = 'YOU LOSE';
      if (badresult == 'formal'){
        textSize(15);
        text("You're doing too much :/",width/2, height/1.6);
      } else if (badresult == 'pajamas'){
        textSize(15);
        text("He's gonna fall back asleep!",width/2, height/1.6);
      }
    } else if (result == 'good'){
    background('#2ae830');
    gameStage = "gameOver";
    textSize(50);
    stroke(0);
    text(this.textContent, width/2, height/2);
    textSize(15);
    text("Click to Restart", width/2, height/1.2);
    this.textContent = "YOU WIN";
    text ("Good job!", width/2, height/1.6);
    }
  }
}

function gameOver(){
  gameStage = "title";
}

function choice1Click(){
  gameStage = "choice2";
}

function choice2Click(){
  gameStage = 'choice3';
}

function saveImage(){
   saveCanvas('supercoolscreenshot.jpg');
}
