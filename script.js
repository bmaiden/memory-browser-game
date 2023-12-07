/*----- plan of action -----*/
// 1) Display an empty game board when the page is initially displayed.  √
// 2) A player can click on sixteen cells to make a move.   √
// 3) Every two clicks will determine if there is a match.   √
// 4) After two clicks if no match, the squares will go back to original color after one second.  √
// 5) Once a match has been determined, the cells cannot be played again.
// 6) Send message if loss  √
// 7) Make Play Again button visible after win or loss  √
// 8) Provide a Reset Game function that will clear the contents of the board.  √
// 9) Set a time limit to be met and determine loss.  √
// 10) Set a win for matches made.

//Testing to make sure HTML & CSS are linked to JS
//console.log("This is working!");

/*----- constants -----*/

// array of color choices to be used to make matches
const colors = [
  "red",
  "blue",
  "green",
  "yellow",
  "orange",
  "purple",
  "pink",
  "darkgray",
  "red",
  "blue",
  "green",
  "yellow",
  "orange",
  "purple",
  "pink",
  "darkgray",
];

/*----- state variables -----*/
let board; //an array
let squareColor = [];
let secondMove = true;
let squareOne;
let squareTwo;
let squareOneColor;
let squareTwoColor;
let matchesMade;
let firstSquare;
let secondSquare;
let count;
let winner;

/*----- cached DOM elements  -----*/
//save HTML elements as variables to use later
//array for square elements - using spread operator to grab the nodelist and push into a new array
const squareEls = [...document.querySelectorAll("#board > div")];
const playAgainButton = document.querySelector("button");
const secondsEl = document.querySelector(".seconds");
const messageEl = document.querySelector(".message");

/*----- functions -----*/
//function -init- initializes an empty game board and runs when game loads
function init() {
  board = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ];

  matchesMade = 0;

  randomColors();
  render();
}
init();

//function -renderBoard- renders the game board and applies background color for each element
function renderBoard() {
  board.forEach((squareVal, squareIdx) => {
    const squareEls = document.getElementById(`sq-${squareIdx}`);
    squareVal = squareColor[squareIdx];
    squareEls.classList.add(squareColor[squareIdx]);
  });
}

//function -render- calls all of our render based functions at once;
function render() {
  renderBoard();
}

//function -squarePicked- determines squares selected with a event listener and changes the color on click
function squarePicked(event) {
  if (event.target.getAttribute("style")) {
    return;
  }
  //get index of square when clicked on
  const squareIdx = parseInt(event.target.id.replace(`sq-`, ""));
  //change color of square when clicked on
  event.target.style.backgroundColor = squareColor[squareIdx];

  handleMove(event);
  checkWinner()
}

//function -handleMove- determine if the clicked square is the first or second. Called in the function -squarePicked-
// if clicked square is not the second click, save the class value to squareOne variable
// if clicked square is the second click, save the class value of clicked square to squareTwo variable
// if squareOne = squareTwo there is a match, if not make style.backgroundColor invisible
// prevent more than two clicks by toggling (hide or show) second move
function handleMove(event) {
  if(!count || matchesMade >= 16){
    return;
  }
  !secondMove ? (firstSquare = event.target) : (secondSquare = event.target);

  secondMove = !secondMove;

  if (secondMove === false) {
    squareOne = event.target.classList[1];
  } else {
    squareTwo = event.target.classList[1];

    if (squareOne === squareTwo) {
      messageEl.innerText = `Match made`;
      matchesMade += 2;
      firstSquare.setAttribute("matched", "true");
      secondSquare.setAttribute("matched", "true");

    } else {
      messageEl.innerText = `Not a match, try again`;
      setTimeout(() => {
        firstSquare.style.backgroundColor = "";
        secondSquare.style.backgroundColor = "";
        messageEl.innerText = "";

        secondMove ? (firstSquare = event.target) : (secondSquare = event.target);
      }, 800);
    }
  }
}

// function -countDown- will display the seconds remaining to the user
function countDown() {
  playAgainButton.style.visibility = "hidden";
  count = 60;
  // display the countdown h2 and set the text
  secondsEl.style.visibility = "visible";
  secondsEl.innerText = count;
  // timer will update the DOM every second
  const timerId = setInterval(function () {
    count--; //decrease the count
    if (count && !winner ) {
      secondsEl.innerText = count; //if count is truthy
      console.log("count,no winner")
    } else if (winner){
      clearInterval(timerId);
      secondsEl.style.visibility = "hidden";
      playAgainButton.style.visibility = "visible";
      console.log("winner")
    }else {
      clearInterval(timerId);
      messageEl.innerText = `You lost, play again`;
      secondsEl.style.visibility = "hidden";
      playAgainButton.style.visibility = "visible";
      console.log("no count, no winner")
    }
  }, 1000); // turns milliseconds, 1/1000th of a second, into  1 second
}

// function -checkWinner- uses matchesMade or timer to determine if there is a winner
function checkWinner() {

  console.log(matchesMade, count)
  if (matchesMade === 16 && count > 0) {
    winner = true;
    messageEl.innerText = `You win!`;
    console.log(`You Win!`, matchesMade, count);
  // } else if (matchesMade !== 16 && count <= 0) {
    // messageEl.innerText = `You lost, play again`;
    // console.log(`You Loss!`, matchesMade, count);
  // } else {
    // messageEl.innerText = `No match, try another guess`;
  }
}

// function -randomColors- randomize colors for squares using squareColor array
function randomColors() {
  for (let i = 0; i < squareEls.length; i++) {
    const randomIndex = Math.floor(Math.random() * colors.length);
    squareColor.push(colors[randomIndex]);
    colors.splice(randomIndex, 1);
  }
}

//reloads the current URL when the play-again button is clicked
function reload() {
  location.reload();
}

/*---- event listeners -----*/
//click on square to start countDown
document.getElementById("board").addEventListener(
  "click",
  function () {
    countDown();
  },
  { once: true }
);
//click on square to make a move
document.getElementById("board").addEventListener("click", squarePicked);
document.getElementById("play-again").addEventListener("click", reload);
