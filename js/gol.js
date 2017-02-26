function setup (canvasId) {
    canvas = document.getElementById(canvasId);
    ctx = canvas.getContext("2d");
    BOARD_H = 125;
    BOARD_W = 250;
    BOARD_S = 4;
    board = [];
    for(i = 0; i < BOARD_H * BOARD_W; i++)
        board[i] = 0;

// Glider
    board[flatten(10,10)] = 1;
    board[flatten(10,11)] = 1;
    board[flatten(10,12)] = 1;
    board[flatten(9,12)] = 1;
    board[flatten(8, 11)] = 1;

    canvas.width = BOARD_W * BOARD_S;
    canvas.height = BOARD_H * BOARD_S;
    updateBoard();
}

function updateBoard() {
    drawBoard();
    var boardX = [];
    for (i = 0; BOARD_W > i; i++) {
        for(j = 0; BOARD_H > j; j++) {
            boardX[flatten(i, j)] = willLive(i,j);
        }
    }
    for (i = 0; i < BOARD_W * BOARD_H; i++) {
        board[i] = boardX[i];
    }
    requestAnimationFrame(updateBoard);
}

function drawBoard () {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    for (i = 0; BOARD_W > i; i++) {
        for (j = 0; BOARD_H > j; j++) {
            if(isAlive(i,j))
                ctx.fillRect(i*BOARD_S, j*BOARD_S, BOARD_S, BOARD_S);
        }
    }
}

function willLive (x, y) {
    switch (sumNeighbours(x, y)) {
    case 2:
        return isAlive(x, y);
    case 3:
        return 1;
    default:
        return 0;
    }
}

function flatten (x, y) {
    return x + y * BOARD_W;
}

function isAlive (x, y) {
    if (0 == x || 0 == y || BOARD_W - 1 <= x || BOARD_H - 1 <= y)
        return 0;
    var i = flatten(x, y);
    return board[i];
}

function sumNeighbours (x, y) {
    var sum = 0;
    sum += isAlive(x-1, y-1);
    sum += isAlive(x-1, y);
    sum += isAlive(x-1, y+1);
    sum += isAlive(x, y-1);
    sum += isAlive(x, y+1);
    sum += isAlive(x+1, y-1);
    sum += isAlive(x+1, y);
    sum += isAlive(x+1, y+1);
    return sum;
}