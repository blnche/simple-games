// generate a board with numbers already validated, then have some put in a set for the one shown at start of the game, and then validate the board at the end

let numberSelected = null; //digits selected on screen to write in tile
let tileSelected = null; //tile selected to be written on

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

const range = (start, end) => {
    const length = end - start + 1; // + 1 makes it inclusive
    return Array.from( {length}, ( _ , i) => start + i); // creates new array : first argument = length of array, second argument = mapping function & _ means we don't use the parameter element, only the index represented by i
}

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

const fillBoard = (baseBoard) => {

    const emptyCell = nextEmptyCell(baseBoard); // returns false or emptyCell with row and col value

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

// creates board with valid solution
const newSolvedBoard = game => {
    const newBoard = baseBoard.map(row => row.slice());

    fillBoard(newBoard, game);

    // attributes each element of board to game section
    newBoard.forEach( (row, rowIndex) => {

        row.forEach( (col, colIndex) => {

            const number = document.createElement('div');
            number.classList.add('class', 'tile');
            number.classList.add('class', 'solved');
            number.setAttribute('id', rowIndex+'-'+colIndex);
            number.innerText = col;
        
            game.appendChild(number);
        });
    });
    return newBoard;
}

const removeValue = (baseBoard, holes) => {
    const divs = Array.from(document.getElementsByClassName('tile'));
    const removedValues = [];
    
    while( removedValues.length < holes ) {
        const value = Math.floor(Math.random() * 81);
        const randomRowIndex = Math.floor(value / 9);
        const randomColIndex = value % 9;
        
        if (!baseBoard[ randomRowIndex ]) continue // prevents cloning error
        if ( baseBoard[ randomRowIndex ][ randomColIndex ] == 0) continue // if cell already empty restart loop
        
        removedValues.push({
            rowIndex: randomRowIndex,
            colIndex: randomColIndex,
            val: baseBoard[ randomRowIndex ][ randomColIndex ]
        });
        
        baseBoard[ randomRowIndex ][ randomColIndex ] = 0;

        const proposedBoard = baseBoard.map( row => row.slice());

        if (!fillBoard(proposedBoard)) {
            baseBoard[ randomRowIndex ][ randomColIndex ] = removedValues.pop().val;
        }

    }

    removedValues.forEach( value => {

        divs.forEach( div => {

            if (div.getAttribute('id') == `${value.rowIndex}`+'-'+`${value.colIndex}`) {
                div.innerText = '';
                div.classList.remove('solved');
            }
        });
    });
    return [removedValues, baseBoard];
}

const multiplePossibleSolutions = (boardToCheck) => {
    const possibleSolutions = [];
    const emptyCellArray = emptyCellCoords(boardToCheck);

    for (let index = 0; index < emptyCellArray.length; index++) {
        let emptyCellClone = [...emptyCellArray];

        const startingPoint = emptyCellClone.splice(index, 1);

        emptyCellClone.unshift( startingPoint[0]);

        let thisSolution = fillFromArray(boardToCheck.map( row => row.slice()), emptyCellClone);
        possibleSolutions.push(thisSolution.join());

        if ( Array.from(new Set(possibleSolutions)).length > 1) return true;
    }
    return false;
}

const fillFromArray = (baseBoard, emptyCellArray) => {
    let holeCounter;
    const emptyCell = nextStillEmptyCell(baseBoard, emptyCellArray);

    if (!emptyCell) return baseBoard;

    for (num of shuffle(numArray)) {
        holeCounter++
        if( holeCounter > 60_000_000) throw new Error ("Hole Timeout");

        if (safeToPlace(baseBoard, emptyCell, num)) {
            baseBoard[ emptyCell.rowIndex ][ emptyCell.colIndex ] = num;
            if (fillFromArray(baseBoard, emptyCellArray)) return baseBoard;
    
            baseBoard[ emptyCell.rowIndex ][ emptyCell.colIndex ] = 0;
        }
    }
    return false;
}

const nextStillEmptyCell = (baseBoard, emptyCellArray) => {
    for (coords of emptyCellArray) {
        if (baseBoard[ coords.row ][ coords.col ] === 0) return {rowIndex : coords.row, colIndex: coords.col};
    }
    return false;
}

const emptyCellCoords = (baseBoard) => {
    const listOfEmptyCells = [];
    for (const row of range (0,8)) {
        for (const col of range (0,8)) {
            if (baseBoard[row][col] === 0) listOfEmptyCells.push( {row, col})
        }
    }
    return listOfEmptyCells;
}

window.addEventListener('DOMContentLoaded', () => {
    const game = document.getElementById('board');
    const digitsWrapper = document.getElementById('digits');
    
    numArray.forEach( num => {
        const digit = document.createElement('div');
        digit.setAttribute('class', 'number');
        digit.setAttribute('value', num);
        digit.innerText = num;

        digitsWrapper.appendChild(digit);
    });

    const digits = Array.from(document.getElementsByClassName('number'));
    
    digits.forEach( digit => digit.addEventListener('click', (event) => {
        console.log(event.target.getAttribute('value'));
        numberSelected = parseInt(event.target.getAttribute('value'));
        console.log(numberSelected);
    }))

    const newStartingBoard = (holes) => {
        try {
            counter = 0;
            numberSelected = null;
            tileSelected = null;
            let solvedBoard = newSolvedBoard(game);
            let [removedValues, baseBoard] = removeValue( solvedBoard.map( row => row.slice()), holes); // not working
            
            return [removedValues, baseBoard, solvedBoard];
        } catch (error) {
            console.log(error);
            return newStartingBoard(holes);
        }
    }

    newStartingBoard();

    const divs = Array.from(document.getElementsByClassName('tile'));
    
    divs.forEach( div => div.addEventListener('click', (event) => {
        console.log(event.target.getAttribute('class'));

        if(!event.target.classList.contains('solved')) {
            event.target.innerText = numberSelected;
        }
    }))

    const validateButton = document.getElementById('validateButton');
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
        alert('Won');
        return true;
    }
    const userBoard = [];

    validateButton.addEventListener('click', () => {

        if (divs.some( div => div.innerText == '')) {
            console.log('not completed');
            return false;
        }

        for (let i = 0; i < divs.length; i += 9) {
            const userRow = [];

            for (let j = i; j < i + 9; j++) {

                let divValue = parseInt(divs[j].innerText);
                userRow.push(divValue);
            }
            userBoard.push(userRow);
        }
        validateBoard(userBoard);
    })


    //once level is selected and genrerat a board is clicked, radio button = disabled
    
    
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

    // const solvedBoard = newSolvedBoard();
    //those will be use when generating board & validating board
    
})




