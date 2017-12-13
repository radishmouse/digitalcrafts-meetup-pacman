
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

const WALL   = 1;
const COIN   = 2;
const GROUND = 3;
const PACMAN = 5;

let map;

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
