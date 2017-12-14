//-------------------------------------------------------------
// Game configuration data
//-------------------------------------------------------------

// This is the variable that holds our game loop, should we need
// to ever end it (an endgame scenario, for example).
let GAME_LOOP;

// This is a numerical representation of the pacman game.
// It uses numbers to represent walls, coins, empty space, and pacman.
let gameData = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,4,2,2,2,2,1,2,2,2,2,4,1],
  [1,2,1,1,1,2,1,2,1,1,1,2,1],
  [1,2,1,2,2,2,2,2,2,2,1,2,1],
  [1,2,2,2,1,1,5,1,1,2,2,2,1],
  [1,2,1,2,2,2,2,2,2,2,1,2,1],
  [1,2,1,1,2,2,1,2,2,1,1,2,1],
  [1,4,2,2,2,2,1,2,2,2,2,4,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1]
];

// Specifically, a wall is represented by the number 1,
// a coin is the number 2, empty ground is the number 3,
// and Pacman is the number 5.


// In our code below, we want to be able to refer to names of things,
// and not numbers. To make that possible, we set up a few labels.
// We'll keep these labels in an object, along with the CSS class names
//
const GAME_PIECES = {
  WALL: {
    objId: 1,
    className: 'wall'
  },
  COIN: {
    objId: 2,
    className: 'coin'
  },
  GROUND: {
    objId: 3,
    className: 'ground'
  },
  GHOST: {
    objId: 4,
    className: 'ghost'
  },
  PACMAN: {
    objId: 5,
    className: 'pacman'
  },
}

const KEYS = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
}


// We will use the identifier "map" to refer to the game map.
// We won't assign this until later on, when we generate it
// using the gameData.
let map;

// We need to keep track of Pacman's location on the game board.
// That is done through a pair of coordinates.
// And, we will keep track of what direction she is facing.
let pacman = {
  x: 6,
  y: 4,
  direction: 'right'
};


//-------------------------------------------------------------
// Game map creation functions
//-------------------------------------------------------------
// This function converts gameData into DOM elements.
function createTiles(data) {

  // We'll keep the DOM elements in an array.
  let tilesArray = [];

  // Let's take one row at a time...
  for (let row of data) {

    // Then look at each column in that row.
    for (let col of row) {

      // We create a game tile as a div element.
      let tile = document.createElement('div');

      // We assign every tile the class name tile.
      tile.classList.add('tile');

      // Now, depending on the numerical value,
      // we need to add a more specific class.
      switch(col) {
        case GAME_PIECES.WALL.objId:
          tile.classList.add(GAME_PIECES.WALL.className);
          break;
        case GAME_PIECES.GROUND.objId:
          tile.classList.add(GAME_PIECES.GROUND.className);
          break;
        case GAME_PIECES.COIN.objId:
          tile.classList.add(GAME_PIECES.COIN.className);
          break;
        case GAME_PIECES.GHOST.objId:
          tile.classList.add(GAME_PIECES.GHOST.className);
          break;
        case GAME_PIECES.PACMAN.objId:
          tile.classList.add(GAME_PIECES.PACMAN.className);

          // For Pacman, we will add yet another
          // class for the direction pacman is facing.
          tile.classList.add(pacman.direction);
          break;
        default:
          break;
      }

      // Now that our individual tile is configured,
      // we add it to the tilesArray.
      tilesArray.push(tile);
    }

    // Once we reach the end of a row, we create a br element,
    // which tells the browser to create a line break on the page.
    let brTile = document.createElement('br');

    // We then add that br element to the tilesArray.
    tilesArray.push(brTile);
  }

  // At the end of our function, we return the array
  // of configured tiles.
  return tilesArray;
}

// This function creates a map element, fills it with tiles,
// and adds it to the page.
function drawMap() {
  map = document.createElement('div');

  let tiles = createTiles(gameData);
  for (let tile of tiles) {
    map.appendChild(tile);
  }

  document.body.appendChild(map);
}

// This function removes the map element from the page.
function eraseMap() {
  if (map) {
    document.body.removeChild(map);
  }
}

//-------------------------------------------------------------
// Movement functions
//-------------------------------------------------------------

function isWall(x, y) {
  // Oy, we have to check [y] then [x]
  return gameData[y][x] === GAME_PIECES.WALL.objId;
}

function updateGameData(data, character, oldX, oldY, newX, newY, objId1, objId2) {
  data[oldY][oldX] = objId1;

  // The following 3 lines are kinda redundant...
  // Why am I keeping up with them separately?
  character.y = newY;
  character.x = newX;
  data[newY][newX] = objId2;

}

// Each function does the following:
// - set pacman's direction so that we show the correct image
// - check to see if we hit a wall
// - if we didn't hit a wall, set pacman's old location to empty space
// - update pacman's location
// - draw pacman in the new location

function moveDown() {
  pacman.direction = 'down';

  let newY = pacman.y+1;
  let newX = pacman.x;
  let oldY = pacman.y;
  let oldX = pacman.x;

  if (!isWall(newX, newY)) {
    updateGameData(gameData,
                   pacman,
                   oldX,
                   oldY,
                   newX,
                   newY,
                   GAME_PIECES.GROUND.objId,
                   GAME_PIECES.PACMAN.objId);
  }
}

function moveUp() {
  pacman.direction = 'up';
  // if (gameData[pacman.y-1][pacman.x] !== GAME_PIECES.WALL.objId) {
  //   gameData[pacman.y][pacman.x] = GAME_PIECES.GROUND.objId;
  //   pacman.y = pacman.y - 1;
  //   gameData[pacman.y][pacman.x] = GAME_PIECES.PACMAN.objId;
  // }

  let newY = pacman.y-1;
  let newX = pacman.x;
  let oldY = pacman.y;
  let oldX = pacman.x;
  console.log('yes, you are trying to move up');
  if (!isWall(newX, newY)) {
    updateGameData(gameData,
                   pacman,
                   oldX,
                   oldY,
                   newX,
                   newY,
                   GAME_PIECES.GROUND.objId,
                   GAME_PIECES.PACMAN.objId);
  }
}

function moveLeft() {
  pacman.direction = 'left';
  // if (gameData[pacman.y][pacman.x-1] !== GAME_PIECES.WALL.objId) {
  //   gameData[pacman.y][pacman.x] = GAME_PIECES.GROUND.objId;
  //   pacman.x = pacman.x - 1 ;
  //   gameData[pacman.y][pacman.x] = GAME_PIECES.PACMAN.objId;
  // }
  let newY = pacman.y;
  let newX = pacman.x-1;
  let oldY = pacman.y;
  let oldX = pacman.x;

  if (!isWall(newX, newY)) {
    updateGameData(gameData,
                   pacman,
                   oldX,
                   oldY,
                   newX,
                   newY,
                   GAME_PIECES.GROUND.objId,
                   GAME_PIECES.PACMAN.objId);
  }
}

function moveRight() {
  pacman.direction = 'right';
  // if (gameData[pacman.y][pacman.x+1] !== GAME_PIECES.WALL.objId) {
  //   gameData[pacman.y][pacman.x] = GAME_PIECES.GROUND.objId;
  //   pacman.x = pacman.x + 1 ;
  //   gameData[pacman.y][pacman.x] = GAME_PIECES.PACMAN.objId;
  // }
  let newY = pacman.y;
  let newX = pacman.x+1;
  let oldY = pacman.y;
  let oldX = pacman.x;

  if (!isWall(newX, newY)) {
    updateGameData(gameData,
                   pacman,
                   oldX,
                   oldY,
                   newX,
                   newY,
                   GAME_PIECES.GROUND.objId,
                   GAME_PIECES.PACMAN.objId);
  }
}

// This function sets up the listener for the whole page.
// Specifically, when the user presses a key, we run a function
// that handles that key press.
function setupKeyboardControls() {
  document.addEventListener('keydown', function (e) {

    // As far as the browser is concerned, each key on the keyboard
    // is associated with a numeric value.
    // After some experimenting, you can discover which numeric values
    // correspond to the arrow keys.

    // Each time the user moves, we recalculate Pacman's location,
    // update the
    if (e.key === "Meta") {
      return;
    } else if (e.keyCode === KEYS.LEFT) {   // left arrow is 37
      moveLeft();
      e.preventDefault();
    } else if (e.keyCode === KEYS.UP) {     // up arrow is 38
      moveUp();
      e.preventDefault();
    } else if (e.keyCode === KEYS.RIGHT){   // right arrow is 39
      moveRight();
      e.preventDefault();
    } else if (e.keyCode === KEYS.DOWN){    // down arrow is 40
      moveDown();
      e.preventDefault();
    }
  });
}

//-------------------------------------------------------------
// Main game setup function
//-------------------------------------------------------------

function setup() {
  // Initialize the game by drawing the map and setting up the
  // keyboard controls.
  setupKeyboardControls();
  render();
}

function render() {
  eraseMap();
  drawMap();
  // updateEnemies();
  GAME_LOOP = requestAnimationFrame(render);
}


// Finally, after we define all of our functions, we need to start
// the game.
setup();
