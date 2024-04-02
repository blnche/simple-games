// generate a board with numbers already validated, then have some put in a set for the one shown at start of the game, and then validate the board at the end

//let numberSelected = null; //digits selected on screen to write in tile
//let tileSelected = null; //tile selected to be written on


let counter;

const baseBoard = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
];

const numArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];


// Shuffle function returns array
const shuffle = array => {
    let newArray = [...array]; //spreads array elements into newArray

    for ( let i = newArray.length - 1; i > 0; i-- ) { // i = newArray.length - 1 makes the loop start with its last element

        const j = Math.floor( Math.random() * ( i + 1 ) ); // random index between 0 and i

        [ newArray[i], newArray[j] ] = [ newArray[j], newArray[i] ]; // assign j to i & i to j in newArray
    }

    return newArray;
}

console.log(shuffle(numArray));


// board = sudoku board generated 
// emptyCell = emptyCell Object with rowIndex and colIndex 
// num = from shuffled array 

const rowSafe = (board, emptyCell, num) => {
    return board[ emptyCell.rowIndex ].indexOf(num) == -1; // if -1 then value not found and return false
}

const columnSafe = (board, emptyCell, num) => {
    return !board.some(row => row[ emptyCell.colIndex ] == num); // .some : iterates over each row in board & we use arrow as callback function for each row we check if emptyCell == num
}

const boxSafe = (board, emptyCell, num) => {
    // eahc row and column start at 0, 3 or 6
    boxStartRow = emptyCell.rowIndex - (emptyCell.rowIndex % 3);
    boxStartColumn = emptyCell.colIndex - (emptyCell.colIndex % 3);

    let safe = true;

    for (boxRow of [0, 1, 2]) {
        for (boxCol of [0, 1, 2]) {

            if (board[boxStartRow + boxRow][boxStartColumn + boxCol] == num) { // board[row : array][column : element]
                safe = false;
            }
        }
    }
    return safe;
}

// returns true if all returned true, else returns false
const safeToPlace = (board, emptyCell, num) => {
    return rowSafe(board, emptyCell, num) && columnSafe(board, emptyCell, num) && boxSafe(board, emptyCell, num);
}

const nextEmptyCell = board => {
    const emptyCell = {
        rowIndex: '',
        colIndex: ''
    };

    board.forEach( (row, rowIndex) => {
        if ( emptyCell.colIndex !== '') return; //check if cell already filled

        let firstZero = row.find( col => col === 0); // this look through row array for first occurence of 0

        if ( firstZero === undefined) return; //no zero, row completed, go to next row

        // if zero is found : 
        emptyCell.rowIndex = rowIndex;
        emptyCell.colIndex = row.indexOf(firstZero);
    });

    if ( emptyCell.colIndex !== '') return emptyCell; // empty cell found and is returned
    return false; // all cells filled
};

const fillBoard = baseBoard => {
    const emptyCell = nextEmptyCell(baseBoard); // returns false or emptyCell with row and col value
    console.log(emptyCell);

    if(!emptyCell) return baseBoard; // board filled

    for (num of shuffle(numArray)) {
        counter++
        if (counter > 20_000_000) throw new Error ("Recursion Timeout");

        if (safeToPlace(baseBoard, emptyCell, num)) {

            baseBoard[ emptyCell.rowIndex ][ emptyCell.colIndex] = num;

            if (fillBoard(baseBoard)) return baseBoard; // recursive call, if solution found return baseBoards

            // recursive call failed then reset value to 0
            baseBoard[ emptyCell.rowIndex][ emptyCell.colIndex] = 0;
        }
    }

    return false; // recursive call failed for all numbers, paths not ok, no valid solution
}

const newSolvedBoard = _ => {
    const newBoard = baseBoard.map(row => row.slice());

    fillBoard(newBoard);
    console.log(newBoard);
    return newBoard;
}


const createBoard = (board) => {

    const game = document.getElementById('board');
    
    board.forEach( (row, rowIndex) => {

        row.forEach( col => {

            const number = document.createElement('div');
            number.setAttribute('class', 'tile');
            number.setAttribute('id', rowIndex+'-'+col);
            number.innerText = col;
        
            game.appendChild(number);
        });
    });

    return board;
    //once level is selected and genrerat a board is clicked, radio button = disabled
}

//those will be use when generating board & validating board
const validateBoard = (board) => {
    const rowSet = new Set();
    const columnSet = new Set();
    const boxSet = new Set();

    for (let i = 0; i < board.length; i++) {
        const row = board[i];

        for (let j = 0; j< row.length; j++) {
            const rowNumber = row[j];
            const columnNumber = board[j][i];
            const boxNumber = board[3 * Math.floor(i / 3) + Math.floor(j / 3)][(i * 3) % 9 + (j % 3)];

            
            if(rowNumber !== '.') {
                if (rowSet.has(rowNumber)) return false;
                rowSet.add(rowNumber);
            }

            if(columnNumber !== '.') {
                if(columnSet.has(columnNumber)) return false;
                columnSet.add(columnNumber);
            }

            if(boxNumber !== '.') {
                if(boxSet.has(boxNumber)) return false;
                boxSet.add(boxNumber);
            }
        }

        rowSet.clear();
        columnSet.clear();
        boxSet.clear();
    }

    return true;
}



//number shown at startof the game in a Set
const revealed = null;

window.addEventListener('DOMContentLoaded', () => {


    
    // const levelSelector = () => {
    //     const levels = document.getElementsByName('level');

    //     levels.forEach(level => level.addEventListener('click', (event) => {
    
    //         return event.target.id;
    //     }));
    // }

    //     const levelSelected = null;
    //     const levels = document.getElementsByName('level');

    //     levels.forEach(level => level.addEventListener('click', (event) => {
    
    //         levelSelected = event.target.id;
    //     }));



    createBoard(newSolvedBoard());
    newSolvedBoard();
    
    
    
    //validateBoard(createBoard());

    //console.log(validateBoard(createBoard()));


})