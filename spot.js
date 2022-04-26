class Spot {
    constructor(i, j) {
        this.i = i;
        this.j = j;
        this.neighbors = [];
        this.previous = undefined;
        this.wall = false;
        if (random(1) < 0.3) this.wall = true;

        this.f = 0;
        this.g = 0;
        this.h = 0;
    }

    show(col) {
        fill(col);
        if (this.wall) fill(0);
        noStroke();
        rect(this.i * w, this.j * h, w - 1, h - 1);
    }

    addNeighbors(grid) {
        let i = this.i;
        let j = this.j;

        if (i < cols - 1) this.neighbors.push(grid[i + 1][j]);
        if (i > 0)        this.neighbors.push(grid[i - 1][j]);
        if (j < rows - 1) this.neighbors.push(grid[i][j + 1]);
        if (j > 0)        this.neighbors.push(grid[i][j - 1]);
    }
}