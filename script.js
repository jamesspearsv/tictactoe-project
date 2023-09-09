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
  let isPlayer1Turn = true;
  let isWinner = false;
  let turnCount = 0;
  let numberOfDraws = 0;
  let player1 = null;
  let player2 = null;

  const updateBoard = (id, marker) => {
    Game.board[id] = marker;
    console.log();
  };

  const createNewPlayer = (player, number) => {
    if (number === 1) {
      Game.player1 = Player(player, "X");
      console.log("creating player1!");
    } else {
      Game.player2 = Player(player, "O");
      console.log("creating player2!");
    }
  };
  return {
    board,
    isPlayer1Turn,
    isWinner,
    turnCount,
    player1,
    player2,
    updateBoard,
    createNewPlayer,
  };
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

    if (Game.isPlayer1Turn) {
      Game.updateBoard(id, "x");
      console.log("Update board!");
      marker.innerText = "X";
    } else {
      Game.updateBoard(id, "o");
      marker.innerText = "O";
    }

    const winner = checkWinner(Game.board);
    console.log(winner);

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
    Game.isPlayer1Turn = !Game.isPlayer1Turn;

    if (Game.isPlayer1Turn) {
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

    if (Game.isPlayer1Turn) {
      winningMessage = `Winner is ${Game.player1.name}`;
    } else {
      winningMessage = `Winner is ${Game.player2.name}`;
    }

    for (let i = 0; i < winningBoards.length; i++) {
      const line = winningBoards[i];
      const [a, b, c] = line;

      if (board[a] != null && board[a] == board[b] && board[b] == board[c]) {
        console.log("Winner!");
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
    Game.isPlayer1Turn = true;
    Game.isWinner = false;
    Game.turnCount = 0;

    document.querySelectorAll(".game-square").forEach((square) => {
      square.classList.remove("winner");
    });

    document.querySelectorAll(".marker").forEach((marker) => {
      marker.innerText = "";
    });

    const temp = "temp";
    document.getElementById("game-status").innerText = `Current Turn: ${temp}`;
  };

  const startGame = (player1, player2) => {
    document.getElementById("pregame").classList.add("hidden");
    document.getElementById("game").classList.remove("hidden");

    Game.createNewPlayer(player1, 1);
    Game.createNewPlayer(player2, 2);
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
      GameController.resetGame();
    }
  });

  document
    .getElementById("pregame-form")
    .addEventListener("submit", (event) => {
      const form = event.target;
      event.preventDefault();
      const formData = new FormData(form);

      const player1 = formData.get("player1");
      const player2 = formData.get("player2");

      GameController.startGame(player1, player2);
    });
});
