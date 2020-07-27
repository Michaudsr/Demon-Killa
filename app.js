// variable
let movementDisplay;
let ctx
let game;
let killa;
let demon;
let bullet;
let demonBullet;
// empty array to push bullets to
let bullets = []
//empty array to push demons to
let demonArray = []
// empty array to push demonBullets
let demonBullets = []
let canvas = document.getElementById('game')
let gw = canvas.width; //800;
let gh = canvas.height; //400;
let timePassed = 0;
let randX = Math.floor(Math.random() * (720));
let randY = Math.floor(Math.random() * (300));

function time() {
    timePassed += 250;
    demonMovement();
}
// game time updated every 250ms
setInterval(time, 250);

// Crawler Constructor function
function Crawler(x, y, width, height, color) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.color = color;
  this.alive = true;
  this.xDirection = true;
  this.yDirection = true;
  this.render = function() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  // created render method to pass in x and y of bullet, could be other objects.
  this.renderCoords = function(x, y){
    ctx.fillStyle = this.color;
    ctx.fillRect(x, y, this.width, this.height);
  }
}

const detectHit = () => {
  // check for collision on x axis
  // if the killa's bottom value is > demon's top value
  // loop through bullet array to check if hitting target
    for (let i = 0; i < bullets.length; i++){
        if (bullets[i].x + bullet.width > demon.x &&
            bullets[i].x < demon.x + demon.width &&
            bullets[i].y + bullet.height > demon.y &&
            bullets[i].y < demon.y + demon.height) {
              demon.alive = false;
        }
    }
      
 if (demon.x + demon.width > killa.x &&
    demon.x < killa.x + killa.width &&
    demon.y + demon.height > killa.y &&
    demon.y < killa.y + killa.height) {
      killa.alive = false;
    }
}
const gameLoop = () => {
  // clear the cavas
  ctx.clearRect(0, 0, game.width, game.height);
  // display the x, y coordinates of our killa onto the DOM
  movementDisplay.textContent = `X:${killa.x}\nY:${killa.y}`;
  // check if the demon is alive and 
  if (demon.alive) {
    // render the demon
    demon.render()
    // bullet.render()
    for (let i = 0; i < bullets.length; i++){
        bullets[i].y -=25
        bullet.renderCoords(bullets[i].x, bullets[i].y);
    }
    // demonBullet.render()
    for (let i = 0; i < demonBullets.length; i++){
        demonBullets[i].y +=25
        demonBullet.renderCoords(demonBullets[i].x, demonBullets[i].y);
    }
    // check for collision
    detectHit()
  }
  // render the killa
  killa.render()
}

// making new bullet object at x and y coordinates 
function fireBullet(){
    bullets.push({
        x: bullet.x, 
        y: bullet.y
    })

}
// making new demonBullet object at x and y coordinates
function fireDemonBullet(){
    demonBullets.push({
        x: demonBullet.x, 
        y: demonBullet.y
    })

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
        
    case (90): // z down
        if (demon.x < game.width) {
            // demonBullet.y +=25
            fireDemonBullet()
        }
        break;   
        
        
    }  
  
}

  document.addEventListener('DOMContentLoaded', () => {
  console.log('Dom loaded')
  // DOM REFS
  movementDisplay = document.getElementById('movement');
  game = document.getElementById('game');
  // CANVAS CONFIG
  game.setAttribute('height', 400);
  game.setAttribute('width', 800);
  ctx = game.getContext('2d');
  // CHARACTER REFS
  killa = new Crawler(320, 355, 50, 50, 'purple');
  bullet = new Crawler(killa.x, killa.y, 10, 30, 'green');
  demonBullet = new Crawler (demon.x, demon.y, 10, 10, 'blue');
  document.addEventListener('keydown', movementHandler);
  let runGame = setInterval(gameLoop, 60);
})

for (let i=0; i <= 2; i++) {
    // make a new demon object
    let randX = Math.floor(Math.random() * (720));
    let randY = Math.floor(Math.random() * (300));
    demon = new Crawler(randX, randY, 80, 20, 'red');
    // push the new demon object into the demons array
    demonArray.push(demon);
}
console.log(demon.x)
console.log(demon.y)

function demonMovement(){
// a function to update the demons position with every frame.
  for (let i = 0; i < demonArray.length; i++) {
      if (timePassed % 2000 == 0){
          demon.xDirection = !demon.xDirection
          demon.yDirection = !demon.yDirection
        }
        // defining movement for demon.y axis
        if(demon.y >= 0 && demon.y <= 300 ) {
            if (demon.yDirection == true){
                demon.y +=1
                 
            } else {
                demon.y -=1
                
            }
        }
        // defining movement for demon.x axis
        if (demon.x >= 0 && demon.x <= 720) {
            if (demon.xDirection == true){
                demon.x +=3
                
                
            } else {
                demon.x -=3
                
            }          
        }
    }
}


























