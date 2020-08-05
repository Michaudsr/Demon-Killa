// variable
let playerHealthDisplay;
let demonHealthDisplay;
let demonHealthDisplay2;
let ctx;
let game;
let killa;
let demon;
let bullet;
let demonBullet;
// empty array to push bullets to
let bullets = []
//empty array to push demons to
let demonArray = []
let demonArrayTwo = []
// empty array to push demonBullets
let demonBullets = []
let canvas = document.getElementById('game')
let gw = canvas.width; //800;
let gh = canvas.height; //400;
let timePassed = 0;
let timePassedTwo = 0;
let randX = Math.floor(Math.random() * (720));
let randY = Math.floor(Math.random() * (300));
let srcX;
let srcY;
let spriteWidth = 60;
let spriteHeight = 30;   
let demonImage = document.createElement('img')
let bulletImage = document.createElement('img')
let demonImage2 = document.createElement('img')
let demonBulletImage = document.createElement('img')
let killaImage = document.createElement('img')
let winner = false;

demonImage.src = 'assets/demonArray.png'
bulletImage.src = 'assets/bullet.png'
demonImage2.src = 'assets/demonArrayTwo.png'
demonBulletImage.src = 'assets/demonBullet.png'
killaImage.src = 'assets/killa.png'

setInterval(fireDemonBullet, 1000);

function time() {
    timePassed += 250;
    demonMovement();
}
// game time updated every 250ms
setInterval(time, 250);

function timeTwo() {
    timePassedTwo += 200;
    demonMovementTwo();
}
// game time updated every 200ms
setInterval(timeTwo, 200);

// Crawler Constructor function
function Crawler(x, y, width, height, color, img, health = 0) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.color = color;
  this.health = health;
  this.img = img;
  this.alive = true;
  this.xDirection = true;
  this.yDirection = true;
  this.xDirectionTwo = true;
  this.yDirection = true;
  this.render = function() {
   ctx.drawImage(this.img, this.x, this.y) 
  }
  // created render method to pass in x and y of bullet, could be other objects.
  this.renderCoords = function(x, y) {
    ctx.drawImage(this.img, x, y)
  }
}

const gameOver = () => {
    //stop rendering the killa once game over
    // demonArray = [];
    console.log('game over')
    winner = true;
    document.getElementById('container').style.display = 'none';
    document.getElementById('gameover').style.display = 'block';
    killa = new Crawler(320, 355, 60, 30, 'purple', killaImage, 50);
}
function winningFunction(){
    if (demonArray[0].health <= 0 && demonArray[1].health <= 0 && demonArrayTwo[0].health <= 0 && demonArrayTwo[1].health <= 0 && killa.health > 0){
        console.log('game won')
        let winGame = document.createElement('h2')
        winGame.innerText = 'You Won'
        document.getElementById('gameover').appendChild(winGame)
        gameOver();

    }
       
    
    
}

    
const detectHit = () => {
  // check for collision on x axis
  // if the killa's bottom value is > demon's top value
  // loop through bullet array to check if hitting target
    for (let i = 0; i < bullets.length; i++){
        for (let j = 0; j < demonArray.length; j++){
            if (bullets[i].x + bullet.width > demonArray[j].x &&
                bullets[i].x < demonArray[j].x + demonArray[j].width &&
                bullets[i].y + bullet.height > demonArray[j].y &&
                bullets[i].y < demonArray[j].y + demonArray[j].height) {
                if (demonArray[j].health > 1) {
                    demonArray[j].health -= 2
                } else{
                    demonArray[j].health = 0
                }
                console.log('demon health is now', demonArray[j].health)
                if (demonArray[j].health <= 0){
                        demonArray[j].alive = false;
                        

                    }
            }
        }
    }
    for (let i = 0; i < bullets.length; i++){
        for (let j = 0; j < demonArrayTwo.length; j++){
            if (bullets[i].x + bullet.width > demonArrayTwo[j].x &&
                bullets[i].x < demonArrayTwo[j].x + demonArrayTwo[j].width &&
                bullets[i].y + bullet.height > demonArrayTwo[j].y &&
                bullets[i].y < demonArrayTwo[j].y + demonArrayTwo[j].height) {
                if (demonArrayTwo[j].health > 1) {
                    demonArrayTwo[j].health -= 2
                } else {
                    demonArrayTwo[j].health = 0
                }
                console.log('demonTwo health is now', demonArrayTwo[j].health)
                if (demonArrayTwo[j].health <= 0){
                    demonArrayTwo[j].alive = false;
                    
                }
            }
        }
    }  
    for (let i = 0; i < demonBullets.length; i++) {
        // console.log(demonBullets[i])
        // console.log(killa.x, killa.y)
        if (demonBullets[i].x + demonBullet.width > killa.x &&
            demonBullets[i].x < killa.x + killa.width &&
            demonBullets[i].y + demonBullet.height >= killa.y - killa.height) {
            demonBullets.pop(demonBullets[i]);
            if (killa.health > 1) {
                killa.health -= 2
            } else {
                demonArrayTwo[j].health = 0
            }
            console.log('player health is now: ', killa.health)
            if (killa.health <= 0){
                killa.alive = false;
                gameOver();
               
            }
        }
    } 
    // for(let i = 0; i < demonArray.length; i++){
    //     for(let j = 0; j < demonArrayTwo; j++){
    //         if(demonArray[i].health <= 0 && demonArrayTwo[j].health <= 0)
    //         winningFunction();
    //     }
    // }
}

const gameLoop = () => {
  // clear the cavas
  ctx.clearRect(0, 0, game.width, game.height);
  function Crawler(x, y, width, height, color, img, health = 0) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.health = health;
    this.img = img;
    this.alive = true;
    this.xDirection = true;
    this.yDirection = true;
    this.xDirectionTwo = true;
    this.yDirection = true;
    this.render = function() {
     ctx.drawImage(this.img, this.x, this.y) 
    }
    // created render method to pass in x and y of bullet, could be other objects.
    this.renderCoords = function(x, y) {
      ctx.drawImage(this.img, x, y)
    }
  }
  // display the x, y coordinates of our killa onto the DOM
  playerHealthDisplay.textContent = `Player Health: ${killa.health}`;
  demonHealthDisplay2.textContent = `Demon Health1: ${demonArray[0].health} Demon Health2: ${demonArray[1].health}`
  demonHealthDisplay.textContent = `Demon Health3: ${demonArrayTwo[0].health} Demon Health4: ${demonArrayTwo[1].health}`
  
  for (let i = 0; i < bullets.length; i++){
      bullets[i].y -=25
      bullet.renderCoords(bullets[i].x, bullets[i].y);

      
  }
  for (let i = 0; i < demonArray.length; i++){
      if (demonArray[i].alive) {
        // render the demon
        demonArray[i].render()
        // demonBullet.render()
        for (let j = 0; j < demonBullets.length; j++){
            if (demonArray[i].alive){
                demonBullets[j].y +=10
                demonBullet.renderCoords(demonBullets[j].x, demonBullets[j].y);
                // demonBullets[j].renderCoords();
                
            }
            
        }
        // check for collision
        
      }
  }
  for (let i = 0; i < demonArrayTwo.length; i++){
        if (demonArrayTwo[i].alive) {
          // render the demon
          demonArrayTwo[i].render()
         }
  }
  // render the killa
  if (killa.alive){
      killa.render()
  }
  if(winner === false){
      detectHit();
      winningFunction();

  }
  
}
// making new bullet object at x and y coordinates 
function fireBullet(){
    bullets.push({
        x: bullet.x + killa.width/2 - bullet.width/2,
        y: bullet.y + killa.height/2 - bullet.height/2

    })
}
// making new demonBullet object at x and y coordinates
function fireDemonBullet(){
    for (let i = 0; i < demonArray.length; i++){
        if (demonArray[i].alive){
            demonBullets.push({
                x: demonArray[i].x + demonArray[i].width/2 - demonBullet.width/2,
                y: demonArray[i].y + demonArray[i].height/2 - demonBullet.height/2
            })
        }
    }   
}

const movementHandler = e => {
   
  //  a:65, d:68
  switch (e.keyCode) {
    case (37): // < left
     if (killa.x > 0){
        killa.x -=25
        bullet.x -=25
     } 
      break;
    case (39): // > right
      if (killa.x + killa.width < game.width) {
        killa.x +=25
        bullet.x +=25
      }   
      break;
    case (32): // space up
        if (killa.x < game.width) {
            // bullet.y -=25
            fireBullet()
        }
        break;        
    }  
  
}
// for (let i=0; i <= 1; i++) {
//     // make a new demon object
//     let randX = Math.floor(Math.random() * (720));
//     let randY = Math.floor(Math.random() * (300));
//     demon = new Crawler(randX, randY, 80, 40, 'red', demonImage, 25);
//     // push the new demon object into the demons array
//     demonArray.push(demon);
// }

function demonMovement(){
// a function to update the demons position with every frame.
  for (let i = 0; i < demonArray.length; i++) {
      if (timePassed % 2000 == 0){
          demonArray[i].xDirection = !demonArray[i].xDirection
          demonArray[i].yDirection = !demonArray[i].yDirection
        }
        // defining movement for demon.y axis
        if(demonArray[i].y >= 0 && demonArray[i].y <= 300 ) {
            if (demonArray[i].yDirection == true){
                demonArray[i].y +=4
                demonBullet.y +=4    
            } else {
                demonArray[i].y -=4
                demonBullet.y -=4
            }
        }
        // defining movement for demon.x axis
        if (demonArray[i].x >= 0 && demonArray[i].x <= 720) {
            if (demonArray[i].xDirection == true){
                demonArray[i].x +=3  
                demonBullet.x +=3 
            } else {
                demonArray[i].x -=3 
                demonBullet.x -=3 
            }          
        }
    }
}
// demonTwo
// for (let i=0; i <= 1; i++) {
//     // make a new demon object
//     let randX = Math.floor(Math.random() * (720));
//     let randY = Math.floor(Math.random() * (300));
//     demonTwo = new Crawler(randX, randY, 80, 40, 'orange', demonImage2, 10);
//     // push the new demon object into the demonsarrayTwo
//     demonArrayTwo.push(demonTwo);
// }


function demonMovementTwo(){
// a function to update the demons position with every frame.
  for (let i = 0; i < demonArrayTwo.length; i++) {
      if (timePassedTwo % 2000 == 0){
          demonArrayTwo[i].xDirectionTwo = !demonArrayTwo[i].xDirectionTwo
          demonArrayTwo[i].yDirectionTwo = !demonArrayTwo[i].yDirectionTwo
        }
        // defining movement for demonTwo.x axis
        if (demonArrayTwo[i].x >= 0 && demonArrayTwo[i].x <= 720) {
            if (demonArrayTwo[i].xDirectionTwo == true){
                demonArrayTwo[i].x +=10
                
            } else {
                demonArrayTwo[i].x -=10
                
            }          
        }
    }
}
function startGame() {
    playerHealthDisplay = document.getElementById('playerHealth');
    demonHealthDisplay = document.getElementById('demonHealth');
    demonHealthDisplay2 = document.getElementById('demonHealth2');
    game = document.getElementById('game');
    document.getElementById('menu').style.display = "none";
    document.getElementById('container').style.display = 'grid';
    for (let i=0; i <= 1; i++) {
        // make a new demon object
        let randX = Math.floor(Math.random() * (720));
        let randY = Math.floor(Math.random() * (300));
        demon = new Crawler(randX, randY, 80, 40, 'red', demonImage, 25);
        // push the new demon object into the demons array
        if(demonArray.length <= 1) {
            demonArray.push(demon);

        }
    }
    for (let i=0; i <= 1; i++) {
        // make a new demon object
        let randX = Math.floor(Math.random() * (720));
        let randY = Math.floor(Math.random() * (300));
        demonTwo = new Crawler(randX, randY, 80, 40, 'orange', demonImage2, 10);
        // push the new demon object into the demonsarrayTwo
        if(demonArrayTwo.length <= 1) {
            demonArrayTwo.push(demonTwo);

        }
        
    }
    killa = new Crawler(320, 355, 60, 30, 'purple', killaImage, 50);
    bullet = new Crawler(killa.x, killa.y, 10, 10, 'green', bulletImage);
    demonBullet = new Crawler (demon.x, demon.y, 10, 10, 'blue', demonBulletImage); 
    // empty array to push bullets to
    bullets = []
    // empty array to push demonBullets
    demonBullets = []
    killa.alive = true;
    
    
  
    
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('Dom loaded')
    // DOM REFS
    playerHealthDisplay = document.getElementById('playerHealth');
    demonHealthDisplay = document.getElementById('demonHealth');
    demonHealthDisplay2 = document.getElementById('demonHealth2')
    game = document.getElementById('game');
    // CANVAS CONFIG
    game.setAttribute('height', 400); 
    game.setAttribute('width', 800);
    ctx = game.getContext('2d');
    // CHARACTER REFS
    killa = new Crawler(320, 355, 60, 30, 'purple', killaImage, 50);
    bullet = new Crawler(killa.x, killa.y, 10, 30, 'green', bulletImage);
    // demonBullet = new Crawler (demon.x, demon.y, 10, 10, 'blue', demonBulletImage);
    document.addEventListener('keydown', movementHandler);
    
    document.getElementById('start').addEventListener('click', () => {
        startGame();
        let runGame = setInterval(gameLoop, 60);
  })
  document.getElementById('mainmenu').addEventListener('click', () => {
      document.getElementById('gameover').style.display = "none";
      document.getElementById('menu').style.display = 'block';
      
  })
  document.getElementById('restart').addEventListener('click', () => {
      location.reload();
      
    
      
  
  } )
  document.getElementById('instructions').addEventListener('click', () => {
      document.getElementById('info').style.display = 'block';
  })
  
  document.getElementById('close').addEventListener('click', () => {
      document.getElementById('info').style.display = 'none';
  })
  
})



