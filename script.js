/*----- plan of action -----*/
// 1) Display an empty game board when the page is initially displayed.  √
// 2) A player can click on sixteen cells to make a move.   √  
// 3) Every two clicks will determine if there is a match.   √
// 4) Once a match has been determined, the cells cannot be played again.
// 5) Set a time limit to be met
// 6) Send message if won or loss
// 7) Provide a Reset Game function that will clear the contents of the board.

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
let board;        //an array
let squareColor = [];
let secondMove = true;
let squareOne;
let squareTwo;

/*----- cached DOM elements  -----*/
//save HTML elements as variables to use later
//array for square elements - using spread operator to grab the nodelist and push into a new array
const squareEls = [...document.querySelectorAll("#board > div")];

/*----- functions -----*/
//function -init- initializes an empty game board and runs when game loads
function init() {
  board = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];

  randomColors();
  render();
}
init();

//function -renderBoard- renders the game board and applies background color for each element
function renderBoard() {
  board.forEach((squareVal, squareIdx) => {
     const squareEls = document.getElementById(`sq-${squareIdx}`);
    //  console.log('squareEls', squareEls)  //inspect displays div ID
    squareVal = squareColor[squareIdx]
    squareEls.classList.add(squareColor[squareIdx]); 
     console.log('squareVal', squareVal)  //inspect displays null
  });
}

//function -render- calls all of our render based functions at once;
function render() {
  renderBoard();
}

//function -squarePicked- determines squares selected with a event listener
function squarePicked(event) {
  //get index of square when clicked on
   const squareIdx = parseInt(event.target.id.replace(`sq-`, ""));
   console.log('squareIdx:', squareIdx)     //console displays squareIdx
  //changed board array null to numbers and colors display on board.
  //change color of square when clicked on
  event.target.style.backgroundColor = squareColor[squareIdx];

  handleMove(event)
 }

//function -handleMove- determine if the clicked square is the first or second.
// if clicked square is not the second click, save the class value to squareOne variable
// if clicked square is the second click, save the class value of clicked square to squareTwo variable
// if squareOne = squareTwo there is a match, if not make style.backgroundColor invisible
function handleMove(event) {
  //prevent more than two clicks by toggling second move
  secondMove = !secondMove;
  console.log(secondMove)
  console.log('bang', !secondMove)
  console.log (event.target.classList)
  if (secondMove === false) {
    squareOne = event.target.classList[1] 
    console.log(squareOne)
  }else {
    squareTwo = event.target.classList[1] 
    console.log(squareTwo)
    if (squareOne === squareTwo) {
      console.log('It matches')
    }else {
      console.log('Not a match reset squares')
    }
  }

};

// function -randomColors- randomize colors for squares - Tylus helped with this
// function randomColors() {
// const colorsLeft = [...colors];
// squareEls.forEach((square) => {
// const randomColors = Math.floor(Math.random() * colorsLeft.length); //reducing list
// square.style.backgroundColor = colorsLeft[randomColors];
// colorsLeft.splice(randomColors, 1);
// console.log(square.style)
// console.log(colorsLeft[randomColors])
// console.log(randomColors)
// console.log(colorsLeft)      //inspect displays colors array reducing
// console.log('randomColors', colorsLeft)
// squareColor = square.style.backgroundColor
// console.log('squareColor equals:', colorsLeft[randomColors])
// });
// }

// function randomColors() {
// const colorsLeft = [...colors];
// squareEls.forEach((squareColor) => {
// const randomIndex = Math.floor(Math.random() * colorsLeft.length); //reducing list
// squareColor = colorsLeft[randomIndex]
// colorsLeft.splice(randomColors, 1);
// console.log('squareColor: ', squareColor)
//
// });
// }
//
//  randomColors();

// function -randomColors- randomize colors for squares
function randomColors() {
  for (let i = 0; i < squareEls.length; i++) {
    const randomIndex = Math.floor(Math.random() * colors.length);
    squareColor.push(colors[randomIndex]);
    colors.splice(randomIndex, 1);
    console.log(squareColor);                 //here gives all colors
    // return (squareColor[randomIndex]);        //here gives one color with console log outside function
    // return (squareColor[randomIndex], i);     //here gives one color with console log outside function
  }
}

// randomColors();
// console.log(squareColor);         //here gives one color for the return statement within the function
/*---- event listeners -----*/
//click on square to make a move
document.getElementById("board").addEventListener("click", squarePicked);
