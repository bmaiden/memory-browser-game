/*----- plan of action -----*/
// 1) Display an empty game board when the page is initially displayed.  √
// 2) A player can click on sixteen cells to make a move.   
// 3) Every two clicks will determine if there is a match.
// 4) Once a match has been determined, the cells cannot be played again.
// 5) Set a time limit to be met
// 6) Send message if won or loss
// 7) Provide a Reset Game function that will clear the contents of the board.

//Testing to make sure HTML & CSS are linked to JS
//console.log("This is working!");

/*----- constants -----*/

// array of color choices to be used to make matches
const colors = ["red", "blue", "green", "yellow", "orange", "purple", "pink", "darkgray", "red", "blue", "green", "yellow", "orange", "purple", "pink", "darkgray"];
//console.log(colors);  //array of 16 created

/*----- state variables -----*/
let board;          //an array


/*----- cached DOM elements  -----*/
//save HTML elements as variables to use later
//array for square elements - using spread operator to grab the nodelist and push into a new array
const squareEls = [...document.querySelectorAll('#board > div')];


/*----- functions -----*/
//function -init- initializes an empty game board and runs when game loads
function init () {
    board = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]

    render();

};
init();

//function -renderBoard- renders the game board and applies background color for each element
function renderBoard() {
    board.forEach((squareVal, squareIdx) => {
        const squareEls = document.getElementById(`sq-${squareIdx}`)
        //console.log('squareEls', squareEls)  //inspect displays div ID
        squareEls.style.backgroundColor = colors[squareVal]
        //console.log('squareVal', squareVal)  //inspect displays null
    })
};

//function -render- calls all of our render based functions at once;
function render() {
    renderBoard()

};

//function -squarePicked- determines squares selected with a event listener
function squarePicked(event) {
    //get index of square when clicked on
    const squareIdx = parseInt(event.target.id.replace(`sq-`, ''))
    //console.log('squareIdx', squareIdx)     //inspect displays squareIdx
    //changed board array null to numbers and colors appeared.
    //get colors for squares
    


    //render updated state
    render()
};

//function -colorChoices- randomize colors for squares Tylus helped with this
function randomColors () {
    const colorsLeft = [...colors]
    //const availableSquares = board.filter(square => square === null)
    squareEls.forEach(square => {
        const randomColors = Math.floor(Math.random() * colorsLeft.length)  //reducing list
        square.style.backgroundColor = colorsLeft[randomColors]
        colorsLeft.splice(randomColors, 1)
    //    console.log(square.style)
     //   console.log(colorsLeft[randomColors])
     //   console.log(randomColors)
      //  console.log(colorsLeft)
    })
}

randomColors()


/*---- event listeners -----*/
//click on square to make a move
document.getElementById('board').addEventListener('click', squarePicked);

