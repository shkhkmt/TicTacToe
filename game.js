'use strict'; 

function gameBoard () { 
  const columns = 3; 
  const rows = 3; 
  const board = []; 

  // create 2D array for the gamestate 
  
  for (let i = 0; i < rows; i++) { 
    board[i] = []; 
    for (let j = 0; j < columns; j++) { 
      board[i].push(0); 
    } 
  } 

  const getBoard = () => board; 

  const placeMarker = (row, col, marker) => { 

    if (board[row]) { 
      board[row].splice(col, 1, marker); 
    } 
    else { 
      console.error(`Row at index ${row} does not exist.`)
    } 
    return board; 
  }; 

  const printBoard = () => { 
    const boardWithValues = board.map((row) => 
      row.map((block) => block.getValue())
    ); 
    console.log(boardWithValues); 
  }
  return {
    getBoard, 
    placeMarker, 
    printBoard
  }; 
} 

function block () { 
  let value = 0; 

  const addMarker = (player) => { 
    value = player; 
  }; 

  const getValue = () => value; 

  return { 
    addMarker, 
    getValue }; 
} 


function gameController (
  playerOneName = "Player One", 
  playerTwoName = "Player Two", 
) { 

  const roundBoard = gameBoard(); 

  const players = [
    {
      name: playerOneName, 
      marker: 1, 
    }, 
    {
      name: playerTwoName, 
      marker: 2, 
    }
  ]; 

  let activePlayer = players[0]; 

  const switchTurn = () => { 
    activePlayer = activePlayer === players[0] ? players[1] : players[0]; 
  }; 

  const getActivePlayer = () => activePlayer; 

  const printNewRound = () => roundBoard.getBoard();

  console.log(`${getActivePlayer().name}'s turn.`); 

const playRound = (row, col) => {
  console.log(`Placing ${getActivePlayer().name}'s marker`); 

  let mark = getActivePlayer().marker; 
  console.log(mark);
  console.log(row); 
  console.log(col) 
  roundBoard.placeMarker(row, col, mark); 
  printNewRound(); 
  switchTurn(); 
  }; 

printNewRound(); 
roundBoard.getBoard(); 

return {
  playRound, 
  getActivePlayer, 
  roundBoard, 
}; 
}

const game = gameController(); 
