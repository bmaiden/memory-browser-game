/*----- plan of action -----*/
// 1) Display an empty game board when the page is initially displayed.  √
// 2) A player can click on sixteen cells to make a move.   √
// 3) Every two clicks will determine if there is a match.   √
// 4) After two clicks if no match, the squares will go back to original color.  √
// 5) Once a match has been determined, the cells cannot be played again.
// 6) Set a time limit to be met and determine win or loss.
// 7) Send message if won or loss
// 8) Make Play Again button visible using function -renderControls-
// 9) Provide a Reset Game function that will clear the contents of the board.

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
let matchesMade;
let firstSquare;
let secondSquare;

/*----- cached DOM elements  -----*/
//save HTML elements as variables to use later
//array for square elements - using spread operator to grab the nodelist and push into a new array
const squareEls = [...document.querySelectorAll("#board > div")];
const playAgainButton = document.querySelector("button");
const seconds = document.querySelector(".seconds");
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
// playAgainButton.style.visibility = matchesMade ? 'visible' : 'hidden'
// };

//function -render- calls all of our render based functions at once;
function render() {
  renderBoard();
  renderResults()
  // renderControls();
}

//function -squarePicked- determines squares selected with a event listener and changes the color on click
function squarePicked(event) {
  //get index of square when clicked on
  const squareIdx = parseInt(event.target.id.replace(`sq-`, ""));
  //  console.log('squareIdx:', squareIdx)     //console displays squareIdx
  //for testing, changed board array null to numbers and colors display on board.
  //change color of square when clicked on
  event.target.style.backgroundColor = squareColor[squareIdx];

  handleMove(event);
}

//function -handleMove- determine if the clicked square is the first or second. Called in the function -squarePicked-
// if clicked square is not the second click, save the class value to squareOne variable
// if clicked square is the second click, save the class value of clicked square to squareTwo variable
// if squareOne = squareTwo there is a match, if not make style.backgroundColor invisible
function handleMove(event) {
  !secondMove ? firstSquare = event.target : secondSquare = event.target
  //prevent more than two clicks by toggling (hide or show) second move
  secondMove = !secondMove;
  // console.log(secondMove)                  //inspect displays value
  // console.log('bang', !secondMove)         //inspect displays value using the bang operator
  // console.log (event.target.classList)     //inspect displays color associated with square clicked
  if (secondMove === false) {
    squareOne = event.target.classList[1];
    console.log(squareOne); //inspect displays color of square
  } else {
    squareTwo = event.target.classList[1];
    console.log(squareTwo); //inspect displays color of square
    if (squareOne === squareTwo) {
      matchesMade += 2;
      console.log("It matches", matchesMade); //inspect displays if match
    } else {
       setTimeout(() => {
       firstSquare.style.backgroundColor = ''
       secondSquare.style.backgroundColor = ''

       secondMove ? firstSquare = event.target : secondSquare = event.target
      console.log("Not a match reset squares", squareOne, squareTwo); //inspect displays no match
       }, 2000);
    } 
  }
}

// function -countDown- will display the seconds remaining to the user
function countDown() {
  let count = 90;
  // display the countdown h2 and set the text
  seconds.style.visibility = "visible";
  seconds.innerText = count;
  // timer will update the DOM every second
  const timerId = setInterval((cbFunction) => {
    count--; //decrease the count
    if (count) {
      seconds.innerText = count; //if count is truthy
    } else {
      clearInterval(timerId);
      seconds.style.visibility = "hidden";
      // when the timer is done, run the callback function
      cbFunction();
    }
  }, 1000); // turns milliseconds, 1/1000th of a second, into  1 second
}

// function -renderResults- uses matchesMade or timer to determine if there is a winner
// if matchesMade is 16 and countDown does not equal 0, send message 'You win!'
// if matchesMade is less than 16 and countDown is equal to 0, send message 'Try again'
function renderResults() {
  // if ((matchesMade = 16 && seconds.innerText != 0)) {
    if ((matchesMade = 16)) {
    messageEl.innerText = `You win!`;
  }else {
    messageEl.innerText = `You lost, play again`;
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

/*---- event listeners -----*/
//click on square to make a move
document.getElementById("board").addEventListener("click", squarePicked);
//click play again button will initialize and empty board and reset all variables
// playAgainButton.addEventListener('click', init);
