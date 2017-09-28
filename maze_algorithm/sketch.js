//Athreya Anand

var cols, rows;
var w = 40; //change the width of each square to change the number of cells in the grid
var grid = []; //grid array

var current; //current cell

var stack = []; //stack of all cells for maze to recall to find other openings

function setup(){
  createCanvas(400,400);
  cols = floor(width/w); //generate # of cols based on cell width/height
  rows = floor(height/w); //generate # of rows...

  for (var j = 0; j < rows; j++){ //nested loop in order to access each location in grid
    for (var i = 0; i< cols; i++){
      var cell = new Cell(i,j); //generates new cell with coordinates as parameters
      grid.push(cell); //adds newly generated cell to global grid array variable
    }
  }

  current = grid[0]; //initial starting point of maze generation

}

function draw(){
  background(51);
  for (var i = 0; i < grid.length; i++){ //for every element within the grid array...
    grid[i].show(); //grid function called where the elemnts side-lines are drawn
  }
  current.visited = true; //sets the current item to visited
  current.highlight(); //highlights current cell so viewer can see the head of where the maze is being generated
  var next = current.checkNeighbors(); //checks if there are unvisited cells around current cell and returns a random one | else returns undefined
  if (next){ //if the cell is defined/exists...
    next.visited = true; //change the visited boolean of the new cell to T
    stack.push(current); //adds current cel to "visited" cells
    removeWalls(current, next); //sends previous cell and new cell to remove walls between the two
    current = next; //sets the current cell to the new found cell
  } else if (stack.length > 0) { //if the checkNeighbors function returns undefined...
    current = stack.pop(); //pops the top value off the stack-array and sets it to the current (travels backwards)
  }

}

function index(i, j){
  if (i < 0 || j < 0 || i > cols-1 || j > rows-1) //edge cases returns -1
    return -1
  return i + j * cols; //returns index of i,j in 1-D column
}

function removeWalls(a, b){
  var iVal = a.i-b.i; //row of a - row of b

  if (iVal===-1){ //if b is to the right of a...
    a.walls[1] = false; //removes right wall of a
    b.walls[3] = false; //removes left wall of b
  } else if (iVal===1){ //if a is to the right of b...
    a.walls[3] = false; //removes left wall of a
    b.walls[1] = false; //removes right wall of b
  }

  var jVal = a.j-b.j //col of a - col of b

  if (jVal===-1){ //if a is above b...
    a.walls[2] = false; //removes bottom wall of a
    b.walls[0] = false; //removes top wall of b
  } else if (jVal===1){ //if b is above a...
    a.walls[0] = false; //removes top wall of a
    b.walls[2] = false; //removes bottom wall of b
  }

}
