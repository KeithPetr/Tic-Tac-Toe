const newGameBtn = document.getElementById("new-game-btn");
const modal = document.getElementById("myModal");
const gameOverModal = document.getElementById("gameOverModal");
const letterXBtn = document.getElementById("letter-x");
const letterOBtn = document.getElementById("letter-o");
const exitBtn = document.getElementById("exit-btn");
const cells = document.querySelectorAll(".cell");
const startGameBtn = document.querySelector(".start-game");
const gameArea = document.getElementById("game-area");
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let playerXScore = 0
let playerOScore = 0
let playerXScoreDisplay = document.getElementById("player-x-score");
let playerOScoreDisplay = document.getElementById("player-o-score");
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "";
let gameOver = false;
let winnerTextEl = document.getElementById("winnerText");

function newGame() {
  modal.style.display = "block";
  cells.forEach((cell) => (cell.textContent = ""));
  playerOneScore = "";
  playerTwoScore = "";
}

letterXBtn.addEventListener("click", letterXClicked);
letterOBtn.addEventListener("click", letterOClicked);
newGameBtn.addEventListener("click", newGame);
startGameBtn.addEventListener("click", startGame);

function letterXClicked() {
  currentPlayer = "X";
  letterXBtn.classList.add("pressed");
  letterOBtn.classList.remove("pressed");
  console.log(currentPlayer);
}

function letterOClicked() {
  currentPlayer = "O";
  letterOBtn.classList.add("pressed");
  letterXBtn.classList.remove("pressed");
  console.log(currentPlayer);
}

function startGame() {
  modal.style.display = "none";
  cells.forEach((cell) => cell.addEventListener("click", cellClicked));
  letterXBtn.classList.remove("pressed");
  letterOBtn.classList.remove("pressed");
  gameArea.style.pointerEvents = "all";
  newGameBtn.style.pointerEvents = "none";
}

function cellClicked() {
  const value = this.getAttribute("value");
  console.log(value);
  console.log(currentPlayer);
  updateCell(value);
  checkWinner();
  cells[value].removeEventListener("click", cellClicked);
}

function updateCell(value) {
  if (options[value]) {
    options[value] = currentPlayer;
  } else {
    cells[value].textContent = currentPlayer;
    options[value] = currentPlayer;
    console.log(options);
  }
}

function changePlayer() {
  if (cells.forEach((cell) => cell === "")) {
    currentPlayer = currentPlayer;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

function checkWinner() {
  for (let i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i];
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];

    if (cellA == "" || cellB == "" || cellC == "") {
      continue;
    }

    if (cellA === cellB && cellB === cellC) {
      gameOver = true;

      console.log(gameOver);
    }
  }

  if (gameOver) {
    winnerTextEl.textContent = `${currentPlayer} wins!`;
    if (currentPlayer === "X") {
        playerXScore += 1
        playerXScoreDisplay.textContent = `Score: ${playerXScore}`;
    } else if (currentPlayer === "O") {
        playerOScore += 1
        playerOScoreDisplay.textContent = `Score: ${playerOScore}`;
    } 

    gameOverModal.style.display = "block";
    newGameBtn.style.pointerEvents = "none"
    gameArea.style.pointerEvents = "none";
  } else if (!options.includes("")) {
    winnerTextEl.textContent = `Draw!`;
    gameOverModal.style.display = "block";
    gameArea.style.pointerEvents = "none";
    newGameBtn.style.pointerEvents = "none"
  } else {
    changePlayer();
  }
}

function restartGame() {
  options = ["", "", "", "", "", "", "", "", ""];
  gameOverModal.style.display = "none";
  currentPlayer = "";
  cells.forEach((cell) => (cell.textContent = ""));
  gameOver = false;
  newGameBtn.style.pointerEvents = "all"
}

exitBtn.addEventListener("click", restartGame);
