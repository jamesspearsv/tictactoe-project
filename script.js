// Factories
const Player = (name, gamePiece) => {
  return { name, gamePiece };
};

// Modules
const Game = (() => {
  let board = Array(9).fill(null);

  const updateBoard = (id, player) => {
    board[id] = player;
  };

  return { board, updateBoard };
})();

const GameController = (() => {
  let isXTurn = true;
  let turnCount = 0;

  const makeMove = (id) => {
    const gamePiece = Game.board[id];

    if (gamePiece != null) {
      console.log("not null");
      return;
    }

    const newPiece = document.createElement("p");

    if (isXTurn) {
      Game.updateBoard(id, "x");
      newPiece.innerHTML = "X";
    } else {
      Game.updateBoard(id, "o");
      newPiece.innerHTML = "O";
    }

    document.getElementById(id).appendChild(newPiece);

    checkWinner();
    turnCount++;
    changeTurn();
  };

  const changeTurn = () => {
    isXTurn = !isXTurn;

    if (isXTurn) {
      document.getElementById("game-status").innerText = "Current Turn: X";
    } else {
      document.getElementById("game-status").innerText = "Current Turn: 0";
    }
  };

  const checkWinner = () => {
    const winningBoards = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    console.log("Checking winner!");
  };

  const resetGame = () => {
    // Reset game
  };

  return { makeMove };
})();

// DOM Interactions
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".game-square").forEach((square) => {
    square.addEventListener("click", (event) => {
      const square = event.target.id;
      GameController.makeMove(square);
    });
  });

  document.getElementById("new-game-button").addEventListener("click", () => {
    alert("New Game");
  });
});
