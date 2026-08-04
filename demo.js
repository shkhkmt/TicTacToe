function Gameboard () { 
  const columns = 3;
  const rows = 3; 
  const board = []; 

  // create 2D array for the state of the game board. 

  for (let i = 0; i < rows; i++) { 
    board[i] = []; 
    for (let j = 0; j < columns; j++) { 
      board[i].push(Block()); 
    } 
  }

  const getBoard = () => board; 

  const placeMarker = (column, player) => { 

    const availableBlocks = board
      .filter((row) => row[column].getValue() === 0)
      .map((row) => row[column]); 

    if (!availableBlocks.length) return; 

    board[column].placeMarker(player); 
  }; 

  const printBoard = () => { 
    const boardWithBlockValues = board.map((row) => 
      row.map((block) => block.getValue())
    );
    console.log(boardWithBlockValues); 
  };

  return {getBoard, placeMarker, printBoard }; 
}


function Block() { 
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
}; 
} 

const game = GameController(); 
