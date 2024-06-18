const squares = document.querySelectorAll(".square");
const player1Indicator = document.querySelector(".player1-indicator");
const player2Indicator = document.querySelector(".player2-indicator");
const player1Name = document.querySelector(".name1");
const player2Name = document.querySelector(".name2");
const gameOverDialog = document.querySelector("#game-over");
const setupDialog = document.querySelector("#game-setup");
const winnerMessage = document.querySelector(".winner-message")
const reset = document.querySelector(".reset");
const play = document.querySelector(".play");
const xPlayer = document.querySelector("#x-player");
const oPlayer = document.querySelector("#o-player");

const player1 = {
    name: "X's",
    symbol: "X",
    color: "#b83d3d", 
    background: "#e6b3b3",
    gameArray: [],
  };

const player2 = {
    name: "O's",
    symbol: "O",
    color: "#1d2a35",
    background: "#a3bacc",
    gameArray: [],
  };

let currentPlayer = player1

const gameBoard = new Array(9).fill(null);

const winningArrays = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

document.addEventListener("DOMContentLoaded", function(){
  setupDialog.showModal();
});

play.addEventListener("click", function(){
  player1Name.innerText = xPlayer.value;
  player2Name.innerText = oPlayer.value;
});

function setUpGame(){
  player1Indicator.classList.remove("inactive");
  player2Indicator.classList.add("inactive");
  gameBoard.fill(null);
  currentPlayer = player1;
  player1.gameArray = [];
  player2.gameArray = [];
  winnerMessage.innerText = "";
  winnerMessage.innerHTML = "";
  for (let square of squares){
    square.classList.add("square");
    square.innerText = "";
    square.style.backgroundColor = "#9ba0bc";
    square.style.border = "3px solid #084c61";
  };
};

function checkGameOver(gameBoard){
  gameBoard.forEach(function(symbol, index){
    if(symbol === currentPlayer.symbol && !currentPlayer.gameArray.includes(index)){
      currentPlayer.gameArray.push(index);
      for(let win of winningArrays){
        if(win.every(element => currentPlayer.gameArray.includes(element))){
          winnerMessage.innerText = `${currentPlayer.name} won!`;
          gameOverDialog.showModal();
        };
      };
    };
  });
  if(!gameBoard.includes(null) && winnerMessage.innerText === ""){
    winnerMessage.innerHTML = "It looks like a tie!<br>Want to play again?";
    gameOverDialog.showModal();
  }
};

function switchPlayerTurn(current) {
  if(current === player1){
    player2Indicator.classList.remove("inactive");
    player1Indicator.classList.add("inactive");
  } else {
    player1Indicator.classList.remove("inactive");
    player2Indicator.classList.add("inactive");
  };
  currentPlayer = current === player1 ? player2 : player1;
};

function mouseOver(e){
  if(e.target.innerText === "") {
    e.target.style.border = `3px solid ${currentPlayer.color}`;
    e.target.style.color = `${currentPlayer.color}`;
    e.target.innerText = `${currentPlayer.symbol}`;
  };
};

function mouseOut(e){
  if(e.target.style.backgroundColor != "honeydew"){
  e.target.style.border = "3px solid #084c61";
  e.target.innerText = "";
  };
};

function squareClicked(e){
  //if square is empty then change square color and symbol 
  if(e.target.style.backgroundColor != "honeydew") {
  e.target.style.border = `3px solid ${currentPlayer.color}`;
  e.target.style.color = `${currentPlayer.color}`;
  e.target.innerText = `${currentPlayer.symbol}`;
  e.target.style.backgroundColor = "honeydew";
  
  //send symbol to gameBoardArray
  const index = e.target.getAttribute("id");
  gameBoard[index] = `${currentPlayer.symbol}`;

  // need to call a function to check if game is over
  checkGameOver(gameBoard);

  //call a function to change player turn
  switchPlayerTurn(currentPlayer);
  }
};
  
squares.forEach(function(box){
  box.addEventListener("mouseover", mouseOver);
  box.addEventListener("mouseout", mouseOut);
  box.addEventListener("click", squareClicked);
});

 reset.addEventListener("click", function(){
  gameOverDialog.close();
  setUpGame();
 });

 document.addEventListener("keydown", function(e){
  if(e.key === "Escape"){
    gameOverDialog.close();
    setUpGame();
  };
 });
