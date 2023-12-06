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
// console.log(colors);  //array of 16 created

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
    //  console.log('squareEls', squareEls)  //inspect displays div ID
    squareVal = squareColor[squareIdx];
    squareEls.classList.add(squareColor[squareIdx]);
    //  console.log('squareVal', squareVal)  //inspect displays color and color name added as a .class to HTML
  });
}

//function -renderControls- changes visibility of the play again button using a ternary operator
// function renderControls() {
// playAgainButton.style.visibility = matchesMade ? "visible" : "hidden";
// }

//function -render- calls all of our render based functions at once;
function render() {
  renderBoard();
  // countDown();
  // renderResults()
  // renderControls();
}

//function -squarePicked- determines squares selected with a event listener and changes the color on click
function squarePicked(event) {
  console.log(event.target.getAttribute("style"));
  console.dir(event.target);
  if (event.target.getAttribute("style")) {
    return;
  }
  //get index of square when clicked on
  const squareIdx = parseInt(event.target.id.replace(`sq-`, ""));
  //  console.log('squareIdx:', squareIdx)     //console displays squareIdx
  //for testing, changed board array null to numbers and colors display on board.
  //change color of square when clicked on
  event.target.style.backgroundColor = squareColor[squareIdx];

  handleMove(event);
  // checkWinner()
}

//function -handleMove- determine if the clicked square is the first or second. Called in the function -squarePicked-
// if clicked square is not the second click, save the class value to squareOne variable
// if clicked square is the second click, save the class value of clicked square to squareTwo variable
// if squareOne = squareTwo there is a match, if not make style.backgroundColor invisible
// prevent more than two clicks by toggling (hide or show) second move
function handleMove(event) {
  !secondMove ? (firstSquare = event.target) : (secondSquare = event.target);
  // console.log(secondMove)       //truthy
  secondMove = !secondMove;
  // console.log(secondMove)                  //consoles falsy
  // console.log('bang', !secondMove)         //consoles truthy
  // console.log (event.target.classList)     //consoles "0": "squares" & "1": "color"  numbers do not change as you click on the squares only the color does
  if (secondMove === false) {
    squareOne = event.target.classList[1];
    console.log(squareOne.id);
    // console.log("squareOne", squareOne); //console displays "color" of square
  } else {
    squareTwo = event.target.classList[1];
    // console.log("squareTwo", squareTwo); //console displays "color" of square
    if (squareOne === squareTwo) {
      matchesMade += 2;
      firstSquare.setAttribute("matched", "true");
      secondSquare.setAttribute("matched", "true");
      console.log(firstSquare);
      console.log("It matches and count is", matchesMade); //inspect displays if match
    } else {
      messageEl.innerText = `Not a match, try again`;
      setTimeout(() => {
        firstSquare.style.backgroundColor = "";
        secondSquare.style.backgroundColor = "";
        messageEl.innerText = "";

        secondMove
          ? (firstSquare = event.target)
          : (secondSquare = event.target);
        console.log(
          "Not a match reset squares",
          squareOne,
          squareTwo,
          secondMove
        ); //console displays "Not a match reset squares" "pink" "yellow" true
      }, 1200);
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
    if (count) {
      secondsEl.innerText = count; //if count is truthy
    } else {
      clearInterval(timerId);
      secondsEl.style.visibility = "hidden";
      messageEl.innerText = `You lost, play again`;
      playAgainButton.style.visibility = "visible";
    }
  }, 1000); // turns milliseconds, 1/1000th of a second, into  1 second
}

// function -renderResults- uses matchesMade or timer to determine if there is a winner
// if matchesMade is 16 and countDown does not equal 0, send message 'You win!'
// if matchesMade is less than 16 and countDown is equal to 0, send message 'Try again'
// function renderResults() {
// if ((matchesMade = 16) && (count = true)) {
// messageEl.innerText = `You win!`;
// } else {
// messageEl.innerText = `You lost, play again`;
// }
// if (secondsEl.style.visibility = "hidden") {
// messageEl.innerText = `Let's Play`;
// }else {
// messageEl.innerText = `You lost, play again`;
// }

function checkWinner() { 
  if ((matchesMade === 16) && (count > 0)) {
    messageEl.innerText = `You win!`;
    console.log(`You Win!`, matchesMade, count)
  } else if ((matchesMade !== 16) && (count <= 0)) {
    messageEl.innerText = `You lost, play again`;
    console.log(`You Loss!`, matchesMade, count)
  } else {
    messageEl.innerText = `No match, try another guess`;
  }
}

// function -randomColors- randomize colors for squares using squareColor array
function randomColors() {
  for (let i = 0; i < squareEls.length; i++) {
    const randomIndex = Math.floor(Math.random() * colors.length);
    squareColor.push(colors[randomIndex]);
    colors.splice(randomIndex, 1);
    // console.log(squareColor);             //on inspect displays array increasing from 1 - 16
  }
}

function reload() {
  location.reload();
}

// function -restartGame- resets game board squares and gameMatches
// function restartGame(squareEls) {
// squareEls.forEach((squareEl) => (squareEl.style.backgroundColor = ""));
// init();
// playAgainButton.style.visibility = "hidden";
// }

/*---- event listeners -----*/
//click on square to make a move and start countDown
document.getElementById("board").addEventListener("click", squarePicked);
document.getElementById("play-again").addEventListener("click", reload);
document.getElementById("board").addEventListener(
  "click",
  function () {
    countDown();
  },
  { once: true }
);
// document.getElementById("board").addEventListener("click", function () {
// const squares = document.querySelectorAll('#board > div')
// console.log("squares event listener",squares)
// squares.addEventListener("click", squarePicked)
// document.getElementById("board").addEventListener("click", function() {
// squarePicked();
// countDown();
// });

// click play again button will initialize and empty board and reset all variables
// playAgainButton.addEventListener("click", function () {
// restartGame(squareEls);
// });
