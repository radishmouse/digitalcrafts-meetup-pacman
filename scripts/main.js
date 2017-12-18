//-------------------------------------------------------------
// Game configuration data
//-------------------------------------------------------------

// This is the variable that holds our game loop, should we need
// to ever end it (an endgame scenario, for example).
let GAME_LOOP;
let score = 0;
const HOW_MANY_GHOSTS = 3;
const POWERUP_DURATION = 4;


// This is a numerical representation of the pacman game.
// It uses numbers to represent walls, coins, empty space, and pacman.
let gameData = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,6,2,2,2,2,1,2,2,2,2,6,1],
  [1,2,1,1,1,2,1,2,1,1,1,2,1],
  [1,2,1,2,2,2,2,2,2,2,1,2,1],
  [1,2,2,2,1,1,3,1,1,2,2,2,1],
  [1,2,1,2,2,2,2,2,2,2,1,2,1],
  [1,2,1,1,2,2,1,2,2,1,1,2,1],
  [1,6,2,2,2,2,1,2,2,2,2,6,1],
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
  POWERUP: {
    objId: 6,
    className: 'powerup'
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
  direction: 'right',
  powerUp: false,
  powerUpStart: 0,
};

// This will be an array of objects
let ghosts = [];


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

          if (pacman.powerUp) {
            tile.classList.add(`powerup-${pacman.direction}`);
          }
          break;
        case GAME_PIECES.POWERUP.objId:
          tile.classList.add(GAME_PIECES.POWERUP.className);
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


function placeObj(id, x, y) {
  gameData[y][x] = id;
}


function isPiece(x, y, id) {
  // Oy, we have to check [y] then [x]
  return gameData[y][x] === id;

}

function isWall(x, y) {
  return isPiece(x, y, GAME_PIECES.WALL.objId);
}

function isGhost(x, y) {
  return isPiece(x, y, GAME_PIECES.GHOST.objId);
}

function isCoin(x, y) {
  return isPiece(x, y, GAME_PIECES.COIN.objId);
}

function isPowerup(x, y) {
  return isPiece(x, y, GAME_PIECES.POWERUP.objId);
}

function findCoinCoords() {
  let coins = [];
  let rowCount = 0;
  for (let row of gameData) {
    let colCount = 0;
    for (let col of row) {
      if (isCoin(colCount, rowCount)) {
        console.log(`found a coin at ${rowCount} and ${colCount}`);

        coins.push([colCount, rowCount]);
      }
      colCount++;
    }
    rowCount++;
  }
  console.log(coins);
  return coins;
}

function placeGhosts(howMany) {
  var coinCoords = findCoinCoords();
  var numGhosts = 0;
  while (numGhosts < howMany) {
    let idx = getRandomInt(0, coinCoords.length);
    let coord = coinCoords.splice(idx, 1)[0];
    ghosts.push(coord);
    console.log('placing ghost at ' + coord);
    placeObj(GAME_PIECES.GHOST.objId, coord[0], coord[1]);
    numGhosts++;
  }

}

function updateGameData(character, newX, newY, objId1, objId2) {
  placeObj(objId1, character.x, character.y);

  // The following 3 lines are kinda redundant...
  // Why am I keeping up with them separately?
  character.y = newY;
  character.x = newX;
  placeObj(objId2, character.x, character.y);

}



// Ghosts move without nabbing coins
// or changing the ground
// whatever was there, the ghost leaves it there.

function movePacman(isWall, isGhost, isCoin, isPowerup, newX, newY) {
  if (!isWall) {
    if (!pacman.powerUp && isGhost){
      loseGame();
    } else {

      if (isGhost) {
        score = score + 50;
      } else if (isCoin) {
        score = score + 10;
      } else if (isPowerup) {
        score = score + 25;
        pacman.powerUp = true;
        pacman.powerUpStart = (new Date()).getTime();
      }
      updateGameData(pacman,
                    newX,
                    newY,
                    GAME_PIECES.GROUND.objId,
                    GAME_PIECES.PACMAN.objId);
    }
  }
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
  let isWallNext = isWall(newX, newY);
  let isGhostNext = isGhost(newX, newY);
  let isCoinNext = isCoin(newX, newY);
  let isPowerupNext = isPowerup(newX, newY);

  movePacman(isWallNext, isGhostNext, isCoinNext, isPowerupNext, newX, newY);
}

function moveUp() {
  pacman.direction = 'up';
  let newY = pacman.y-1;
  let newX = pacman.x;
  let isWallNext = isWall(newX, newY);
  let isGhostNext = isGhost(newX, newY);
  let isCoinNext = isCoin(newX, newY);
  let isPowerupNext = isPowerup(newX, newY);

  movePacman(isWallNext, isGhostNext, isCoinNext, isPowerupNext, newX, newY);
}

function moveLeft() {
  pacman.direction = 'left';
  let newY = pacman.y;
  let newX = pacman.x-1;
  let isWallNext = isWall(newX, newY);
  let isGhostNext = isGhost(newX, newY);
  let isCoinNext = isCoin(newX, newY);
  let isPowerupNext = isPowerup(newX, newY);

  movePacman(isWallNext, isGhostNext, isCoinNext, isPowerupNext, newX, newY);}

function moveRight() {
  pacman.direction = 'right';
  let newY = pacman.y;
  let newX = pacman.x+1;
  let isWallNext = isWall(newX, newY);
  let isGhostNext = isGhost(newX, newY);
  let isCoinNext = isCoin(newX, newY);
  let isPowerupNext = isPowerup(newX, newY);

  movePacman(isWallNext, isGhostNext, isCoinNext, isPowerupNext, newX, newY);
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
    if (e.keyCode === KEYS.LEFT) {
      moveLeft();
      e.preventDefault();
    } else if (e.keyCode === KEYS.UP) {
      moveUp();
      e.preventDefault();
    } else if (e.keyCode === KEYS.RIGHT){
      moveRight();
      e.preventDefault();
    } else if (e.keyCode === KEYS.DOWN){
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
  placeGhosts(HOW_MANY_GHOSTS);
  // place pacman initially
  placeObj(GAME_PIECES.PACMAN.objId, pacman.x, pacman.y);

  render();
}

function render() {
  eraseMap();
  drawMap();

  let scoreBoard = document.querySelector('#score');
  scoreBoard.innerHTML = `${score} pts`;

  if (pacman.powerUp) {
    // see if we're inside the powerup time
    if (isTimeWithin(pacman.powerUpStart, (new Date()).getTime(), POWERUP_DURATION)) {
      console.log('we are within the timeframe!');
    } else {
      pacman.powerUp = false;
    }
  }

  if (hasStuffLeftToEat()) {
    GAME_LOOP = requestAnimationFrame(render);
  } else {
    winGame();
  }
}

function hasStuffLeftToEat() {
  return gameData.reduce((arr, a) => arr.concat(a), [])
                 .filter((item) => [GAME_PIECES.COIN.objId,
                                    GAME_PIECES.GHOST.objId,
                                    GAME_PIECES.POWERUP.objId].includes(item))
                 .length > 0;
}

function loseGame() {
  document.querySelector('#poster').classList.add('lose');
  document.querySelector('#poster').textContent = 'oh noes';
  pacman.direction = 'dead';
  eraseMap();
  drawMap();
  _endGame();
}

function winGame() {
  document.querySelector('#poster').classList.add('win');
  document.querySelector('#poster').textContent = 'yay';
  _endGame();
}

function _endGame() {
  document.querySelector('#poster').classList.add('end');
  cancelAnimationFrame(GAME_LOOP);
}

// Finally, after we define all of our functions, we need to start
// the game.
setup();


//-------------------------------------------------------------
// Utils
//-------------------------------------------------------------
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function isTimeWithin(timestamp, start, duration) {
  return (start - timestamp) < (duration * 1000);
}