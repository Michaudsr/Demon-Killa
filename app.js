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
//   demon = new Crawler(300, 10, 80, 20, 'red');
  killa = new Crawler(320, 355, 50, 50, 'purple');
  bullet = new Crawler(killa.x, killa.y, 10, 30, 'green')
  document.addEventListener('keydown', movementHandler);
  let runGame = setInterval(gameLoop, 60);
})





for (let i=0; i <= 5; i++) {
  // make a new demon object
  demon = new Crawler(300, 10, 80, 20, 'red');
        let randX = Math.floor(Math.random() * (gw - demon.width));
        demon.x = randX;
        let randY = Math.floor(Math.random() * (gh - demon.width));
        demon.y = randY;
        
        // push the new demon object into the demons array
        demonArray.push(demon);
    }


function draw(){
    ctx.fillStyle = "red";
    ctx.fillRect(0,0,game.width,game.height);
    for (let i=0; i < demonArray.length; i++) {
        let demon = demonArray[i];
        ctx.beginPath();
        ctx.rect(demon.x, demon.y, w, w);   
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.strokeStyle = "red";
        ctx.stroke();
        ctx.closePath();
    }
}
draw();
// function update(){
// // a function to update the demons position with every frame.
//   for (let i = 0; i < demonArray.length; i++) {
//         let demon = demon[i];
//         if(demons.Y >= gh - w || demons.Y <= 0){demons.speed *= -1;}
//         demons.Y += demons.speed;

// }
// }










