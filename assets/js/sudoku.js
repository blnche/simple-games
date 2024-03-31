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

const shuffle = array => {
    let newArray = [...array];

    for ( let i = newArray.length - 1; i > 0; i-- ) {

        const j = Math.floor( Math.random() * ( i + 1 ) );

        [ newArray[i], newArray[j] ] = [ newArray[j], newArray[i] ];
    }

    return newArray;
}

console.log(shuffle(numArray));

const rowSafe = (board, emptyCell, num) => {
    return board[ emptyCell.rowIndex ].indexOf(num) == -1; // if -1 then value not found
}

const columnSafe = (board, emptyCell, num) => {
    return !board.some(row => row[ emptyCell.colIndex ] == num);
}

const boxSafe = (board, emptyCell, num) => {
    boxStartRow = emptyCell.rowIndex - (emptyCell.rowIndex % 3);
    boxStartColumn = emptyCell.colIndex - (emptyCell.colIndex % 3);

    let safe = true;

    for (boxRow of [0, 1, 2]) {
        for (boxCol of [0, 1, 2]) {
            if (board[boxStartRow + boxRow][boxStartColumn + boxCol] == num) {
                safe = false;
            }
        }
    }
    return safe;
}

const safeToPlace = (board, emptyCell, num) => {
    return rowSafe(board, emptyCell, num) && columnSafe(board, emptyCell, num) && boxSafe(board, emptyCell, num);
}

const nextEmptyCell = board => {
    const emptyCell = {
        rowIndex: '',
        colIndex: ''
    };

    board.forEach( (row, rowIndex) => {
        if ( emptyCell.colIndex !== '') return; //key already filled

        let firstZero = row.find( col => col === 0);

        if ( firstZero === undefined) return; //no zero, go to next row

        emptyCell.rowIndex = rowIndex;
        emptyCell.colIndex = row.indexOf(firstZero);
    });

    if ( emptyCell.colIndex !== '') return emptyCell;
    return false;
};

const fillBoard = baseBoard => {
    const emptyCell = nextEmptyCell(baseBoard);

    if(!emptyCell) return baseBoard;

    for (num of shuffle(numArray)) {
        counter++

        if (counter > 20_000_000) throw new Error ("Recursion Timeout");

        if (safeToPlace(baseBoard, emptyCell, num)) {
            baseBoard[ emptyCell.rowIndex ][ emptyCell.colIndex] = num;

            if (fillBoard(baseBoard)) return baseBoard;

            baseBoard[ emptyCell.rowIndex][ emptyCell.colIndex] = 0;
        }
    }

    return false;
}

const newSolvedBoard = _ => {
    const newBoard = baseBoard.map(row => row.slice());

    fillBoard(newBoard);
    console.log(newBoard)
    return newBoard;
}
newSolvedBoard();


const createBoard = () => {

    const game = document.getElementById('board');
    
    
    const board = [];
    
    
    
    for (let i = 1; i <= 9; i++) {
        
        let row = [];
        for (let j = 1; j <= 9; j++) {
            const digits = new Set(); 
            let numberText = null;
            while(digits.size < 9 ){
                const randomNumber = Math.ceil(Math.random() * 9);
                digits.add(randomNumber);
            }
            for(const id of digits) {
                const index = id - 1;
                if(index >= 0 && index < 9) {
                    numberText = id;
                }
            }

            const number = document.createElement('div');
            number.setAttribute('class', 'tile');
            number.setAttribute('id', i);
            number.innerText = numberText;
        
            
            game.appendChild(number);
            row.push(numberText);
            // rows.push(number.innerText);
            //console.log(digits);
            // digits.clear();
        }
        board.push(row);
        row = [];
    }
    
    console.log(board);
    
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



    // createBoard();
    
    
    validateBoard(createBoard());

    console.log(validateBoard(createBoard()));


})