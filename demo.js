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
          board[rowIndex].push(objectToInsert); 
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
  
  const roundBoard = Gameboard(); 

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
    roundBoard.printBoard(); 

    console.log(`${getActivePlayer().name}'s turn.`); 
  }; 

  const playRound = (rowIndex, colIndex) => {
   console.log(
      'Dropping marker'
    );
    
        let player = activePlayer.marker; 
    roundBoard.placeMarker(roundBoard.getBoard(), rowIndex, colIndex, player);

  printNewRound(); 
  switchPlayerTurn(); 
}; 

printNewRound(); 

return { 
  playRound, 
  getActivePlayer, 
  players, 
  roundBoard,
}; 
} 

const game = GameController(); 
