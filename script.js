// Factories
const Player = (name, marker) => {
  let numberOfWins = 0;

  const addWin = () => {
    numberOfWins++;
  };

  return { name, marker, numberOfWins, addWin };
};

// Modules
const Game = (() => {
  let board = Array(9).fill(null);
  let isXTurn = true;
  let isWinner = false;
  let turnCount = 0;
  let numberOfDraws = 0;

  const updateBoard = (id, player) => {
    board[id] = player;
  };

  return { board, isXTurn, isWinner, turnCount, updateBoard };
})();

const GameController = (() => {
  const makeMove = (id) => {
    const gamePiece = Game.board[id];

    if (gamePiece != null || Game.isWinner) {
      return;
    } else {
      Game.turnCount++;
    }

    let marker = document.getElementById(id).firstElementChild;
    console.log(`Id: ${id}`);
    console.log(marker);

    if (Game.isXTurn) {
      Game.updateBoard(id, "x");
      marker.innerText = "X";
    } else {
      Game.updateBoard(id, "o");
      marker.innerText = "O";
    }

    const winner = checkWinner(Game.board);

    if (winner === null) {
      changeTurn();
    } else if (winner.line != null) {
      for (let id of winner.line) {
        document.getElementById(id).classList.add("winner");
        winner.winningMessage;
      }
      document.getElementById("game-status").innerText = winner.winningMessage;
    } else {
      document.getElementById("game-status").innerText = winner.winningMessage;
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
    Game.board = Array(9).fill(null);
    Game.isXTurn = true;
    Game.isWinner = false;
    Game.turnCount = 0;

    document.querySelectorAll(".game-square").forEach((square) => {
      square.classList.remove("winner");
    });

    document.querySelectorAll(".marker").forEach((marker) => {
      marker.innerText = "";
    });

    document.getElementById("game-status").innerText = "Current Turn: X";
  };

  const startGame = () => {
    document.getElementById("pregame").classList.add("hidden");
    document.getElementById("game").classList.remove("hidden");
  };

  return { makeMove, resetGame, startGame };
})();

// DOM Interactions
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".game-square").forEach((square) => {
    square.addEventListener("click", (event) => {
      // GameController.setGame(event);
      const square = event.target.id;
      GameController.makeMove(square);
    });
  });

  document.getElementById("new-game-button").addEventListener("click", () => {
    const confirmation = confirm("Are you sure you want to start a new game?");

    if (confirmation) {
      // window.location.reload();
      GameController.resetGame();
    }
  });

  document
    .getElementById("pregame-form")
    .addEventListener("submit", (event) => {
      event.preventDefault();

      GameController.startGame();
    });
});
