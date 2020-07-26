// variable
let movementDisplay;
let ctx
let game;
let killa;
let demon;
let bullet;

// Crawler Constructor function
function Crawler(x, y, width, height, color) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.color = color;
  this.alive = true;
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
// empty array to push bullets to
const bullets = []

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
  // console.log('looping in 💩')
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
  demon = new Crawler(300, 10, 80, 20, 'red');
  killa = new Crawler(320, 355, 50, 50, 'purple');
  bullet = new Crawler(killa.x, killa.y, 10, 30, 'green')
  document.addEventListener('keydown', movementHandler);
  let runGame = setInterval(gameLoop, 60);
})
















// game.addEventListener('keystroke', (e) => {
//     bullet.x = killa.x;
// })

// let bullet = {
//     x: killa.x,
//     y: killa.y,
//     color: green,
//     width: 10,
//     height: 30,
//     alive: true,
//     render: function () {
//         ctx.fillStyle = this.color;
//         ctx.fillRect(this.x, this.y, this.width, this.height);
//     }
// }