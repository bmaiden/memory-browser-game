/*----- plan of action -----*/
// 1) Display an empty game board when the page is initially displayed.  √
// 2) A player can click on sixteen cells to make a move.   √
// 3) Every two clicks will determine if there is a match.   √
// 4) After two clicks if no match, the squares will go back to original color.
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
let matchesMade = 0;


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
      // document.getElementsByClassName('.squares').style.pointerEvents = "none"
      // pointer-events: none;
      // PointerEvent = 'none'
      // event.target.classList[1].style.pointerEvents = "none"
      // squareOne.style.backgroundColor = 'transparent'
      // squareTwo.style.backgroundColor = 'transparent'
      // squareOne.style.backgroundColor = 'null'
      // squareTwo.style.backgroundColor = 'null'
      //event.target.classList.toggle('#board')
      console.log("Not a match reset squares"); //inspect displays no match

    
    }
  }
}

// function -renderSeconds- will display the seconds remaining to the user
function renderSeconds() {

}


// function -getWinner- uses matchesMade or timer to determine if there is a winner
// if matchesMade is 16 and seconds does not equal 0, send message 'You win!'
// if matchesMade is not 16 and seconds is equal to 0, send message 'Try again'
function getWinner() {
if (matchesMade == 16) {
  messageEl.innerText = `You win!`
}


};

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
