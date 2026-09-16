'use strict';

const displayController = (() => {
  // Elements for the UI 
  const boardEl = document.querySelector('.board');
  const headerEl = document.querySelector('.header');
  const playerOneEl = document.querySelector('#playerOne');
  const playerTwoEl = document.querySelector('#playerTwo');
  const playBtn = document.querySelector('#Play');
 

  const cells = [];
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    boardEl.appendChild(cell);
    cells.push(cell);
  }

  const TEXT  = { 0: '', 1: 'X', 2: 'O' };
  const CLASS = { 0: null, 1: 'x', 2: 'o' };

  // Create a container for the board, and render the items that correspond to a playe's value in the gameBoard() 
  // function

  const renderBoard = (board) => {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const value = board[row][col];
        const cell  = cells[row * 3 + col];

        cell.textContent = TEXT[value] ?? '';
        cell.classList.remove('x', 'o');
        if (CLASS[value]) cell.classList.add(CLASS[value]);
      }
    }
  };
  
  // Arrow functions to mutate the text on the page 

  const updateMessage = (msg) => { headerEl.textContent = msg; };
  const updatePlayerNames = (p1, p2) => {
    playerOneEl.textContent = p1;
    playerTwoEl.textContent = p2;
  };
  const setActivePlayer = (marker) => {
    playerOneEl.classList.toggle('active', marker === 1);
    playerTwoEl.classList.toggle('active', marker === 2);
  };

  // Click event handler 

  const onCellClick = (handler) => {
    cells.forEach((cell, i) => {
      cell.addEventListener('click', () => handler(Math.floor(i / 3), i % 3));
    });
  };
  const onPlayClick = (handler) => playBtn.addEventListener('click', handler);

  return {
    renderBoard,
    updateMessage,
    updatePlayerNames,
    setActivePlayer,
    onCellClick,
    onPlayClick,
    cells,
  };
})();


function gameBoard() {
  // set values for the array's size and then push a zero value to it. 

  const columns = 3;
  const rows = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(0);
    }
  }

  const getBoard = () => board;
  
  // check if the board has a value at the selected index and that the value is within the array's 
  // default length, then place the marker and return the new board. 

  const placeMarker = (row, col, marker) => {
    if (row < 0 || row > 2 || col < 0 || col > 2) return "Block not allowed";
    if (board[row][col] !== 0) return "Block not allowed";
    board[row][col] = marker;
    return board;
  };

  const isFull = () => board.every(row => row.every(cell => cell !== 0));

  return { 
    getBoard, 
    placeMarker, 
    isFull 

  };
}

function checkWinner(roundBoard) {
  const currentState = roundBoard;
  let winner;
  let result = false;

  // Player One win conditions
  if (
    // rows
    (currentState[0][0] === 1 && currentState[0][1] === 1 && currentState[0][2] === 1) ||
    (currentState[1][0] === 1 && currentState[1][1] === 1 && currentState[1][2] === 1) ||
    (currentState[2][0] === 1 && currentState[2][1] === 1 && currentState[2][2] === 1) ||
    // columns
    (currentState[0][0] === 1 && currentState[1][0] === 1 && currentState[2][0] === 1) ||
    (currentState[0][1] === 1 && currentState[1][1] === 1 && currentState[2][1] === 1) ||
    (currentState[0][2] === 1 && currentState[1][2] === 1 && currentState[2][2] === 1) ||
    // diagonals
    (currentState[0][0] === 1 && currentState[1][1] === 1 && currentState[2][2] === 1) ||
    (currentState[0][2] === 1 && currentState[1][1] === 1 && currentState[2][0] === 1)
  ) {
    winner = 'Player One';
    console.log(`${winner} wins!`);
    result = true;
  }

  // Player Two win conditions
  else if (
    // rows
    (currentState[0][0] === 2 && currentState[0][1] === 2 && currentState[0][2] === 2) ||
    (currentState[1][0] === 2 && currentState[1][1] === 2 && currentState[1][2] === 2) ||
    (currentState[2][0] === 2 && currentState[2][1] === 2 && currentState[2][2] === 2) ||
    // columns
    (currentState[0][0] === 2 && currentState[1][0] === 2 && currentState[2][0] === 2) ||
    (currentState[0][1] === 2 && currentState[1][1] === 2 && currentState[2][1] === 2) ||
    (currentState[0][2] === 2 && currentState[1][2] === 2 && currentState[2][2] === 2) ||
    // diagonals
    (currentState[0][0] === 2 && currentState[1][1] === 2 && currentState[2][2] === 2) ||
    (currentState[0][2] === 2 && currentState[1][1] === 2 && currentState[2][0] === 2)
  ) {
    winner = 'Player Two';
    console.log(`${winner} wins!`);
    result = true;
  }

  return result;
}

function gameController(
  playerOneName = "Player One",
  playerTwoName = "Player Two"
) {

  let roundBoard = gameBoard();

  const players = [
    { name: playerOneName, marker: 1 },
    { name: playerTwoName, marker: 2 },
  ];

  let activePlayer = players[0];
  let gameOver = false;

  displayController.updatePlayerNames(players[0].name, players[1].name);
  displayController.renderBoard(roundBoard.getBoard());
  displayController.setActivePlayer(activePlayer.marker);

  const switchTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  console.log(`${getActivePlayer().name}'s turn.`);

  const playRound = (row, col) => {
    if (gameOver) return;

    console.log(`Placing ${getActivePlayer().name}'s marker`);

    const mark = getActivePlayer().marker;

    if (roundBoard.placeMarker(row, col, mark) === "Block not allowed") {
      console.log("Invalid Block");
      return;
    }

    displayController.renderBoard(roundBoard.getBoard());

    if (checkWinner(roundBoard.getBoard()) === true) {
      const winnerName = getActivePlayer().name;
      console.log(`${winnerName} wins!`);
      displayController.updateMessage(`${winnerName} wins!`);
      gameOver = true;
      return;
    }

    if (roundBoard.isFull()) {
      console.log("It's a draw!");
      displayController.updateMessage("It's a draw!");
      gameOver = true;
      return;
    }

    switchTurn();

    console.log(roundBoard.getBoard());
    console.log(`${getActivePlayer().name}'s turn`);

    displayController.setActivePlayer(activePlayer.marker);
  };

  const resetGame = () => {
    roundBoard = gameBoard();
    activePlayer = players[0];
    gameOver = false;
    displayController.updateMessage('');
    displayController.renderBoard(roundBoard.getBoard());
    displayController.setActivePlayer(activePlayer.marker);
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  displayController.onCellClick(playRound);
  displayController.onPlayClick(resetGame);

  return {
    playRound,
    getActivePlayer,
    resetGame
  };
}

const game = gameController();
