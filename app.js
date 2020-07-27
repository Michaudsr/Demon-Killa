// variable
let movementDisplay;
let ctx
let game;
let killa;
let demon;
let bullet;
// empty array to push bullets to
let bullets = []
//empty array to push demons to
let demonArray = []
let canvas = document.getElementById('game')
let gw = canvas.width; //800;
let gh = canvas.height; //400;
let timePassed = 0;
let randX = Math.floor(Math.random() * (720));
let randY = Math.floor(Math.random() * (300));
function time(){
    timePassed += 250;
    demonMovement();
}
// game time updated every 500ms
setInterval(time, 250);
// Crawler Constructor function
function Crawler(x, y, width, height, color) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.color = color;
  this.alive = true;
  this.direction = true;
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
    // render bullet
    
    demon.render()
    
    // bullet.render()
    for (let i = 0; i < bullets.length; i++){
        bullets[i].y -=25
        bullet.renderCoords(bullets[i].x, bullets[i].y);
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
    default:
      
  }
}

// document.addEventListener('DOMContentLoaded', () => {
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
//   demon = new Crawler(300, 10, 80, 20, 'red');
  killa = new Crawler(320, 355, 50, 50, 'purple');
  bullet = new Crawler(killa.x, killa.y, 10, 30, 'green')
  document.addEventListener('keydown', movementHandler);
  let runGame = setInterval(gameLoop, 60);
})





for (let i=0; i <= 2; i++) {
    // make a new demon object
    let randX = Math.floor(Math.random() * (720));
    let randY = Math.floor(Math.random() * (300));
    demon = new Crawler(randX, randY, 80, 20, 'red');
    // console.log(demon)
    // demon.x = randX;
    // console.log(randX)
    // demon.y = randY;
    // console.log(randY)
    // push the new demon object into the demons array
    demonArray.push(demon);
}
console.log(demon.x)
console.log(demon.y)

// function draw(){
//     ctx.fillStyle = "red";
//     ctx.fillRect(0,0,game.width,game.height);
//     for (let i=0; i < demonArray.length; i++) {
//         let demon = demonArray[i];
//         ctx.beginPath();
//         ctx.rect(demon.x, demon.y, demon.width, demon.height);   
//         ctx.fillStyle = 'red';
//         ctx.fill();
//         ctx.strokeStyle = "red";
//         ctx.stroke();
//         ctx.closePath();
//     }
// }
// draw();

function demonMovement(){
// a function to update the demons position with every frame.

  for (let i = 0; i < demonArray.length; i++) {
      if (timePassed % 2000 == 0){
          demon.direction = !demon.direction
      }

       
        // defining movement for demon.y axis
        if(demon.y >= 0 && demon.y <= 300 ) {
            if(demon.direction == true)
            demon.y +=1  
        } else {
            demon.y -=1
        }
        
        // defining movement for demon.x axis
        if (demon.x >= 0 && demon.x <= 720){
            if (demon.direction == true){
                demon.x +=1

            } else {
                demon.x -=1
            }

                
                    
        }

    
}
}















// let start = Date.now(); // remember start time

// let timer = setInterval(function() {
//   // how much time passed from the start?
//   let timePassed = Date.now() - start;

//   if (timePassed >= 2000) {
//     clearInterval(timer); // finish the animation after 2 seconds
//     return;
//   }

//   // draw the animation at the moment timePassed
//   draw(timePassed);

// }, 20);

// // as timePassed goes from 0 to 2000
// // left gets values from 0px to 400px
// function draw(timePassed) {
// demon.style.left = timePassed / 5 + 'px';
// }










