let cols = 50;
let rows = 50;
let grid = new Array(cols);

let openSet = [];
let closedSet = [];
let start;
let end;

let w, h;

let path = [];

function setup() {
    createCanvas(800, 800);
    w = width / cols;
    h = height / rows;

    for (let i = 0; i < cols; i++) {
        grid[i] = new Array(rows);
    }

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = new Spot(i, j);
        }
    }

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].addNeighbors(grid);
        }
    }

    start = grid[0][0];
    end = grid[cols - 1][rows -1];
    start.wall = false;
    end.wall = false;

    openSet.push(start);
}

function draw() {
    background(0);
    //frameRate(5);

    if (openSet.length > 0) {
        // we can keep going;
        let winner = 0;
        for (let i = 0; i < openSet.length; i++) {
            if (openSet[i].f < openSet[winner].f) {
                winner = i;
            }
        }
        var current = openSet[winner];

        if (current === end) {
            noLoop();
            console.log("done!");
        }

        removeFromArray(openSet, current);
        closedSet.push(current);

        let neighbors = current.neighbors;
        for (let i in neighbors) {
            let neighbor = neighbors[i];

            let newPath = false;

            if (!closedSet.includes(neighbor) && !neighbor.wall) {
                let tempG = current.g + 1;//heuristic(neighbor, end);

                if (openSet.includes(neighbor)) {
                    if (tempG < neighbor.g) {
                        neighbor.g = tempG;
                        newPath = true;
                    }
                }
                else {
                    neighbor.g = tempG;
                    newPath = true;
                    openSet.push(neighbor);
                }
                
                if (newPath) {
                    neighbor.h = heuristic(neighbor, end);
                    neighbor.f = neighbor.g + neighbor.h;
    
                    neighbor.previous = current;
                }
            }
        }
    }
    else {
        // no solution
        noLoop();
        //return;
    }

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            if (grid[i][j].wall == true) {
                grid[i][j].show(color(0));
            }
            
        }
    }
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            if (grid[i][j].wall == false) {
                grid[i][j].show(color(255));
            }
            
        }
    }

    for (let i = 0; i < closedSet.length; i++) {
        closedSet[i].show(color(255, 0, 0));
    }

    for (let i = 0; i < openSet.length; i++) {
        openSet[i].show(color(0, 255, 0));
    }

    path = [];
    let temp = current;
    path.push(temp);
    while (temp.previous) {
        path.push(temp.previous);
        temp = temp.previous;
    }

    noFill();
    stroke(color(0, 0, 255));
    strokeWeight(w / 2);
    beginShape();
    for (let i = 0; i < path.length; i++) {
        vertex(path[i].i * w + w / 2, path[i].j * h + h / 2);
    }
    endShape();
}

function removeFromArray(arr, val) {
    for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i] == val) {
            arr.splice(i, 1);
        }
    }
}

function heuristic(a, b) {
    return dist(a.i, a.j, b.i, b.j);
    //return abs(a.i - b.i) + abs(a.j - b.j);
}