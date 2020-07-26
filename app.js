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
}











const detectHit = () => {
  // check for collision on x axis
  // if the killa's bottom value is > demon's top value
  if (bullet.x + bullet.width > demon.x &&
    bullet.x < demon.x + demon.width &&
    bullet.y + bullet.height > demon.y &&
    bullet.y < demon.y + demon.height) {
      demon.alive = false;
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
    bullet.render()
    // check for collision
    detectHit()
  }
  // render the killa
  killa.render()
}
const movementHandler = e => {
  //  a:65, d:68
  switch (e.keyCode) {
    case (37): // < left
     if (killa.x > 0){
        killa.x -=15 
        bullet.x -=15
    } 
      break;
    case (39): // > right
      if (killa.x + killa.width < game.width) {
        killa.x +=15
        bullet.x +=15
      }   
      break;
    case (32): // space up
        if (killa.x < game.width) {
            bullet.y -=15
        }
        break;   
    default:
      console.log('invalid keystroke');
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
  demon = new Crawler(300, 10, 50, 50, 'red');
  killa = new Crawler(320, 355, 50, 50, 'purple');
  bullet = new Crawler(killa.x, killa.y, 10, 30, 'green')
  document.addEventListener('keydown', movementHandler);
  let runGame = setInterval(gameLoop, 60);
})

function bullet