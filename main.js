
var layout = [
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

const WALL = 1;
const COIN = 2;
const GROUND = 3;
const PACMAN = 5;

let map;

let pacman = {
  x: 6,
  y: 4
};

function createTiles(layoutInfo) {
  let tilesArray = [];
  for (let row of layoutInfo) {
    for (let col of row) {
      let piece = document.createElement('div');
      piece.classList.add('tile');

      if (col == WALL) {
        piece.classList.add('wall');
      } else if (col == COIN) {
        piece.classList.add('coin');
      } else if (col == GROUND) {
        piece.classList.add('ground');
      } else if (col == PACMAN) {
        piece.classList.add('pacman');
      }

      tilesArray.push(piece);
    }
    let br = document.createElement('br');
    tilesArray.push(br);
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
  if (layout[pacman.y+1][pacman.x] !== 1){
    layout[pacman.y][pacman.x] = 3;
    pacman.y = pacman.y + 1 ;
    layout[pacman.y][pacman.x] = 5;
    eraseMap();
    drawMap();
  }
}

function moveUp() {
  if (layout[pacman.y-1][pacman.x] !== 1){
    layout[pacman.y][pacman.x] = 3;
    pacman.y = pacman.y - 1;
    layout[pacman.y][pacman.x] = 5;
    eraseMap();
    drawMap();
  }
}

function moveLeft() {
  if (layout[pacman.y][pacman.x-1] !== 1){
    layout[pacman.y][pacman.x] = 3;
    pacman.x = pacman.x - 1 ;
    layout[pacman.y][pacman.x] = 5;
    eraseMap();
    drawMap();
  }
}

function moveRight() {
  if (layout[pacman.y][pacman.x+1] !== 1){
    layout[pacman.y][pacman.x] = 3;
    pacman.x = pacman.x + 1 ;
    layout[pacman.y][pacman.x] = 5;
    eraseMap();
    drawMap();
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
  });
}

function main() {
  drawMap();
  setupControls();
}

main();
