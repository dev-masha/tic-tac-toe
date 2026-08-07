let board = ['', '', ''];
let player = 'X';
let gameOver = false;

let boxes = document.querySelectorAll('.cell');
let turnMsg = document.getElementById('turn');

function playGame(boxNumber) {
    boxNumber = parseInt(boxNumber);
    if (board[boxNumber] === '' && gameOver === false) {
        board[boxNumber] = player;
        boxes[boxNumber].innerText = player;

        if (checkWinner() === true) {
            turnMsg.innerText = "Player " + player + " Win! 🎉";
            gameOver = true;
        } else if (checkDraw() === true) {
            turnMsg.innerText = "Match Draw!";
            gameOver = true;
        } else {
            player = player === 'X'? 'O' : 'X';
            turnMsg.innerText = "Player " + player + " Turn";
        }
    }
}

boxes.forEach(function(box) {
    box.addEventListener('click', function() {
        let boxNumber = box.getAttribute('data-index');
        playGame(boxNumber);
    });
    box.addEventListener('touchend', function(e) {
        e.preventDefault();
        let boxNumber = box.getAttribute('data-index');
        playGame(boxNumber);
    });
});

function checkWinner() {
    let winLines = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];

    for (let i = 0; i < winLines.length; i++) {
        let box1 = winLines[i][0];
        let box2 = winLines[i][1];
        let box3 = winLines[i][2];

        if (board[box1] === player && board[box2] === player && board[box3] === player) {
            return true;
        }
    }
    return false;
}

function checkDraw() {
    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            return false;
        }
    }
    return true;
}

function resetGame() {
    board = ['', '', ''];
    player = 'X';
    gameOver = false;
    turnMsg.innerText = "Player " + player + " Turn";

    for (let i = 0; i < boxes.length; i++) {
        boxes[i].innerText = '';
    }
}
