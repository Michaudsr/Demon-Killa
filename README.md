# Demon Killa

Demon killa is a fixed shooter arcade style action game, developed with HTML Canvas, CSS, and JavaScript by Steven Michaud in 2020.

## About the Game

The player controles a futureistic war ship at the bottom of the screen which can be moved from left to right. In the upper portions of the screen render demons that need to be shot by the player. The demons will attack the player with fireballs, and be moving to various positions on the screen. Once all demons on the screen are shot until their health level reaches zero you have won the game.

## HTML

The HTML was developed using a simple HTML boilerplate linked to the CSS and JavaScript. Within the boilerplate contains a div with an ID of "container" which was used to create the canvas, along with various other div's containing buttons and other HTML element tags.

```
  <div class="menu" id="menu">
    <h1>Demon Killa</h1>
    <button class="instructions" id="instructions">Instructions</button>
    <button class="start" id="start">Start Game</button>
  </div>
  <div id="container">
    <aside id="top-left"><h2>Demon Killa</h2></aside>
    <aside id="top-right"><h2 id="playerHealth"></h2></aside>
    <main>
        <canvas id="game"><!-- play it, a game --></canvas>
    </main>
    <aside id="btm-right"><h2 id='demonHealth2'></h2><h2 id="demonHealth"></h2></aside>
```

## CSS

The CSS  is used to stylize the canvas, creating the columns, and using grid template areas to establish the cells in the grid and name each area.

```
  #container {
  max-width: 58em;
  max-height: 90vh;
  /* height: 70vh; */
  background-color: black;
  margin: 0 auto;
  padding: .5em;
  display: none;
  grid-template-columns: .50fr .50fr .50fr;
  
  grid-template-areas: "top-left top-left top-right"
                        "game game game"
                        "btm-right btm-right btm-right";
  }
  
  #top-left, #top-right, #btm-left, #btm-right {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: black;
    height: 100px;
    
  }
  ```

  ## JavaScript

  The JavaScript code is where all the characters are created using Crawler constructor function, including the bullets that are shot at the enemy and at the player.
  ```
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
```
The player's movement is controlled by a switch statement, by using the key codes to move along the x-axis of the screen, as well as fireing the bullets along the y axis.
```
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
```
After being created using the Crawler constructor the enemy('demon') is pushed to an array, so that multiple demons can be rendered from the array.
```
for (let i=0; i <= 1; i++) {
    // make a new demon object
    let randX = Math.floor(Math.random() * (720));
    let randY = Math.floor(Math.random() * (300));
    demon = new Crawler(randX, randY, 80, 40, 'red', demonImage, 25);
    // push the new demon object into the demons array
    demonArray.push(demon);
}
```
The bullet x and y coordinate that the main player use as well as the demon are also pushed to an array, so that the same object can be fired repeatively, instead of making multiple bullets by rendering the same bullet at different coordinates.
```
function fireBullet(){
    bullets.push({
        x: bullet.x + killa.width/2 - bullet.width/2,
        y: bullet.y + killa.height/2 - bullet.height/2

    })
}
```
```
for (let i = 0; i < bullets.length; i++){
      bullets[i].y -=25
      bullet.renderCoords(bullets[i].x, bullets[i].y);
```
```
 this.renderCoords = function(x, y) {
    ctx.drawImage(this.img, x, y)
  }
}
```
The demons movement is excuted by using a set interval for the demons position to update for every frame.
```
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
```