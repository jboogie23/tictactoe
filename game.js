// Playing with Webpack (not required for the game)
import moment from "moment";
console.log("Hello from JavaScript!");
console.log(moment().startOf("day").fromNow());
var name = "Bob",
  time = "today";
console.log(`Hello ${name}, how are you ${time}?`);

// Display the result of the game
const displayController = (() => {
  const renderMessage = (message) => {
    document.querySelector("#message").innerHTML = message;
  };
  return {
    renderMessage,
  };
})();

// Gameboard renderer
const Gameboard = (() => {
  let gameboard = ["", "", "", "", "", "", "", "", ""];
  const render = () => {
    let boardHTML = "";
    gameboard.forEach((square, index) => {
      boardHTML += `<div class="square" id="square-${index}">${square}</div>`;
    });
    document.querySelector("#gameboard").innerHTML = boardHTML;
    const squares = document.querySelectorAll(".square");
    squares.forEach((square) => {
      square.addEventListener("click", Game.handleClick);
    });
  };
  const update = (index, value) => {
    gameboard[index] = value;
    render();
  };
  const getGameboard = () => gameboard;
  return {
    render,
    update,
    getGameboard,
  };
})();

// Factory to create players
const createPlayer = (name, mark) => {
  return {
    name,
    mark,
  };
};

// Main game logic
const Game = (() => {
  let players = [];
  let currentPlayerIndex;
  let gameOver;
  const start = () => {
    players = [
      createPlayer(document.querySelector("#player1").value, "X"),
      createPlayer(document.querySelector("#player2").value, "O"),
    ];
    currentPlayerIndex = 0;
    gameOver = false;
    Gameboard.render();
    const squares = document.querySelectorAll(".square");
    squares.forEach((square) => {
      square.addEventListener("click", handleClick);
    });
  };
  const handleClick = (event) => {
    if (gameOver) {
      return;
    }
    let index = parseInt(event.target.id.split("-")[1]);
    if (Gameboard.getGameboard()[index] !== "") return;
    Gameboard.update(index, players[currentPlayerIndex].mark);
    if (
      checkForWin(Gameboard.getGameboard(), players[currentPlayerIndex].mark)
    ) {
      gameOver = true;
      displayController.renderMessage(
        `${players[currentPlayerIndex].name} has won!`
      );
    } else if (checkForTie(Gameboard.getGameboard())) {
      gameOver = true;
      displayController.renderMessage("It's a tie!");
    }
    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
  };
  const restart = () => {
    for (let i = 0; i < 9; i++) {
      Gameboard.update(i, "");
    }
    Gameboard.render();
    gameOver = false;
    document.querySelector("#message").innerHTML = "";
  };
  return {
    start,
    handleClick,
    restart,
  };
})();

// Check for win
function checkForWin(board) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return true;
    }
  }
  return false;
}

// Check for tie
function checkForTie(board) {
  return board.every((cell) => cell !== "");
}

// Restart button
const restartButton = document.querySelector("#restart-button");
restartButton.addEventListener("click", () => {
  Game.restart();
});

// Start button
const startButton = document.querySelector("#start-button");
startButton.addEventListener("click", () => {
  Game.start();
});
