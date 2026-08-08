function Gameboard () { 
  const columns = 3;
  const rows = 3; 
  const board = []; 

  // create 2D array for the state of the game board. 

  for (let i = 0; i < rows; i++) { 
    board[i] = []; 
    for (let j = 0; j < columns; j++) { 
      board[i].push(block()); 
    } 
  }

  const getBoard = () => board; 

  const placeMarker = (board, rowIndex, colIndex, objectToInsert) => { 

    if (board[rowIndex]) { 
      board[rowIndex].splice(colIndex, 1, objectToInsert); 
    } else { 
      console.error(`Row at index ${rowIndex} does not exist.`); 
    } 
    return board
  }; 

  const printBoard = () => { 
    const boardWithBlockValues = board.map((row) => 
      row.map((block) => block.getValue())
    );
    console.log(boardWithBlockValues); 
  };

  return {getBoard, placeMarker, printBoard }; 
}


function block() { 
  let value = 0; 

  const addMarker = (player) => { 
    value = player; 
  }; 

  const getValue = () => value; 

  return { 
    addMarker, 
    getValue, 
  }; 
}


function GameController(
  playerOneName = "Player One", 
  playerTwoName = "Player Two"
) { 
  
  const board = Gameboard(); 

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

  const switchPlayerTurn = () => { 
    activePlayer = activePlayer === players[0] ? players[1] : players[0]; 
  }; 

  const getActivePlayer = () => activePlayer; 

  const printNewRound = () => { 
    board.printBoard(); 

    console.log(`${getActivePlayer().name}'s turn.`); 
  }; 

  const playRound = (column) => {

   console.log(
      `Dropping ${getActivePlayer().name}'s token into column ${column}...`
    );
    board.placeMarker(column, getActivePlayer().marker);

  switchPlayerTurn(); 
  printNewRound(); 
}; 

printNewRound(); 

return { 
  playRound, 
  getActivePlayer, 
  players, 
  board,
}; 
} 

const game = GameController(); 
