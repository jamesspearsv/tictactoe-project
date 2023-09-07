// Modules
const Game = (() => {
  let board = Array(9).fill(null);
  let isXTurn = true;
  let isWinner = false;
  let turnCount = 0;

  const updateBoard = (id, player) => {
    board[id] = player;
  };

  const resetGame = () => {
    board = Array(9).fill(null);
    isXTurn = true;
    isWinner = false;
    turnCount = 0;
  };

  return { board, isXTurn, isWinner, turnCount, updateBoard, resetGame };
})();

const GameController = (() => {
  const makeMove = (id) => {
    const gamePiece = Game.board[id];

    if (gamePiece != null || Game.isWinner) {
      return;
    } else {
      Game.turnCount++;
    }

    const newPiece = document.createElement("p");
    newPiece.classList.add("marker");

    if (Game.isXTurn) {
      Game.updateBoard(id, "x");
      newPiece.innerText = "X";
    } else {
      Game.updateBoard(id, "o");
      newPiece.innerText = "O";
    }

    document.getElementById(id).appendChild(newPiece);

    const winner = checkWinner(Game.board);

    if (winner === null) {
      changeTurn();
    } else {
      for (let id of winner.line) {
        document.getElementById(id).classList.add("winner");
        document.getElementById("game-status").innerText =
          winner.winningMessage;
      }
    }
  };

  const changeTurn = () => {
    Game.isXTurn = !Game.isXTurn;

    if (Game.isXTurn) {
      document.getElementById("game-status").innerText = "Current Turn: X";
    } else {
      document.getElementById("game-status").innerText = "Current Turn: 0";
    }
  };

  const checkWinner = (board) => {
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

    let winningMessage = "";

    if (Game.isXTurn) {
      winningMessage = "Winner is X!";
    } else {
      winningMessage = "Winner is O";
    }

    for (let line of winningBoards) {
      const [a, b, c] = line;

      if (board[a] != null && board[a] === board[b] && board[b] === board[c]) {
        Game.isWinner = true;
        return { line, winningMessage };
      }
    }

    if (Game.turnCount === 9) {
      return { line: null, winningMessage: "Game Over! Cat!" };
    }

    return null;
  };

  const resetGame = () => {
    // Game.resetGame();

    document.querySelectorAll(".game-square").forEach((square) => {
      square.classList.remove("winner");
    });

    document.querySelectorAll(".marker").forEach((marker) => {
      marker.remove();
    });

    document.getElementById("game-status").innerText = "Current Turn: X";
  };

  return { makeMove, resetGame };
})();

// DOM Interactions
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".game-square").forEach((square) => {
    square.addEventListener("click", (event) => {
      const square = event.target.id;
      console.log(square);
      GameController.makeMove(square);
    });
  });

  document.getElementById("new-game-button").addEventListener("click", () => {
    const confirmation = confirm("Are you sure you want to reset the game?");

    if (confirmation) {
      window.location.reload();
    }
  });
});
