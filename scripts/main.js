
// This is a numerical representation of the pacman game.
// It uses numbers to represent walls, coins, empty space, and pacman.
let layout = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,2,2,2,2,2,1,2,2,2,2,2,1],
  [1,2,1,1,1,2,1,2,1,1,1,2,1],
  [1,2,1,2,2,2,2,2,2,2,1,2,1],
  [1,2,2,2,1,1,5,1,1,2,2,2,1],
  [1,2,1,2,2,2,2,2,2,2,1,2,1],
  [1,2,1,1,2,2,1,2,2,1,1,2,1],
  [1,2,2,2,2,2,1,2,2,2,2,2,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1]
];

// Specifically, a wall is represented by the number 1,
// a coin is the number 2, empty ground is the number 3,
// and Pacman is the number 5.


// In our code below, we want to be able to refer to names of things,
// and not numbers. To make that possible, we set up a few labels.
const WALL   = 1;
const COIN   = 2;
const GROUND = 3;
const PACMAN = 5;


// We will use the identifier "map" to refer to the game map.
let map;

// We need to keep track of Pacman's location on the game board.
// That is done through a pair of coordinates.
// And, we will keep track of what direction he is facing.
let pacman = {
  x: 6,
  y: 4,
  direction: 'right'
};

function createTiles(layoutInfo) {
  let tilesArray = [];

  for (let row of layoutInfo) {
    for (let col of row) {
      let tile = document.createElement('div');
      tile.classList.add('tile');

      if (col === WALL) {
        tile.classList.add('wall');

      } else if (col === COIN) {
        tile.classList.add('coin');

      } else if (col === GROUND) {
        tile.classList.add('ground');

      } else if (col === PACMAN) {
        tile.classList.add('pacman');
        tile.classList.add(pacman.direction);

      }

      tilesArray.push(tile);
    }
    let brTile = document.createElement('br');
    tilesArray.push(brTile);
  }

  return tilesArray;
}

function drawMap() {
  map = document.createElement('div');

  let tiles = createTiles(layout);
  for (let tile of tiles) {
    map.appendChild(tile);
  }

  document.body.appendChild(map);
}

function eraseMap() {
  document.body.removeChild(map);
}

function moveDown() {
  pacman.direction = 'down';
  if (layout[pacman.y+1][pacman.x] !== WALL) {
    layout[pacman.y][pacman.x] = GROUND;
    pacman.y = pacman.y + 1 ;
    layout[pacman.y][pacman.x] = PACMAN;
  }
}

function moveUp() {
  pacman.direction = 'up';
  if (layout[pacman.y-1][pacman.x] !== WALL) {
    layout[pacman.y][pacman.x] = GROUND;
    pacman.y = pacman.y - 1;
    layout[pacman.y][pacman.x] = PACMAN;
  }
}

function moveLeft() {
  pacman.direction = 'left';
  if (layout[pacman.y][pacman.x-1] !== WALL) {
    layout[pacman.y][pacman.x] = GROUND;
    pacman.x = pacman.x - 1 ;
    layout[pacman.y][pacman.x] = PACMAN;
  }
}

function moveRight() {
  pacman.direction = 'right';
  if (layout[pacman.y][pacman.x+1] !== WALL) {
    layout[pacman.y][pacman.x] = GROUND;
    pacman.x = pacman.x + 1 ;
    layout[pacman.y][pacman.x] = PACMAN;
  }
}

function setupControls() {
  document.addEventListener('keydown', function (e) {
    if (e.keyCode === 37) {
      moveLeft();
    } else if (e.keyCode === 38) {
      moveUp();
    } else if (e.keyCode === 39){
      moveRight();
    } else if (e.keyCode === 40){
      moveDown();
    }
    eraseMap();
    drawMap();
  });
}

function main() {
  drawMap();
  setupControls();
}

main();
