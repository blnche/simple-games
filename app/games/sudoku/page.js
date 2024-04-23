'use client'
import React, { useState, useEffect } from 'react';
import { Button, Card, Divider, Flex, Space } from 'antd';
import styles from '../../../styles/sudoku.module.css';



export default function Page() {

    const [baseBoard, setBaseBoard] = useState([
        [{ value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }],
        [{ value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }],
        [{ value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }],
        [{ value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }],
        [{ value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }],
        [{ value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }],
        [{ value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }],
        [{ value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }],
        [{ value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }, { value: 0, initiallyGenerated: false }]
    ]);
    
    const [numberSelected, setNumberSelected] = useState(null);
    const [tileSelected, setTileSelected] = useState(null);
    const [counter, setCounter] = useState(0);
    const [solvedBoard, setSolvedBoard] = useState([]);
    const [userBoard, setUserBoard] = useState([]);
    const [isSuccess, setIsSuccess] = useState(false);
    
    
    useEffect(() => {
        newStartingBoard();
    }, []);
    useEffect(() => {
        removeValue(solvedBoard, 0);
    }, [solvedBoard]);

    const shuffle = array => {
        let newArray = [...array];

        for(let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i+1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    };

    const range = (start, end) => {
        const length = end - start + 1;
        return Array.from({length}, (_, i) => start + i);
    };

    const rowSafe = (board, emptyCell, num) => {
        return board[emptyCell.rowIndex].every(cell => cell.value !== num);
    };

    const columnSafe = (board, emptyCell, num) => {
        return !board.some(row => row[emptyCell.colIndex].value === num);
    }

    const boxSafe = (board, emptyCell, num) => {
        const boxStartRow = emptyCell.rowIndex - (emptyCell.rowIndex % 3);
        const boxStartColumn = emptyCell.colIndex - (emptyCell.colIndex % 3);

        let safe = true;

        for(const boxRow of [0, 1, 2]) {
            for(const boxCol of [0, 1, 2]) {
                const cell = board[boxStartRow + boxRow][boxStartColumn + boxCol];
                if( cell.value === num) {
                    safe = false;
                };
            };
        };
        return safe;
    };

    const safeToPlace = (board, emptyCell, num) => {
        return rowSafe(board, emptyCell, num) && columnSafe(board, emptyCell, num) && boxSafe(board, emptyCell, num);
    };

    const nextEmptyCell = board => {

        const emptyCell = {
            rowIndex: '',
            colIndex: ''
        };

        board.forEach((row, rowIndex) => {
            // console.log(row);
            if(emptyCell.colIndex !== '') return;

            row.forEach((cell, colIndex) => {
                // console.log(cell);

                if(cell.value === 0) {
                    emptyCell.rowIndex = rowIndex;
                    emptyCell.colIndex = colIndex;
                }
            })

        });

        if( emptyCell.colIndex !== '') return emptyCell;
        return false;
    };

    const fillBoard = baseBoard => {
        const emptyCell = nextEmptyCell(baseBoard);
        console.log(emptyCell);
        if(!emptyCell) return baseBoard;

        for(const num of shuffle(range(1,9))) {
            setCounter(prevCounter => prevCounter + 1);
            if( counter > 20_000_000) throw new Error('Recursion Timeout');

            if(safeToPlace(baseBoard, emptyCell, num)) {
                baseBoard[emptyCell.rowIndex][emptyCell.colIndex] = {
                    value: num,
                    initiallyGenerated: true,
                };
                console.log(baseBoard)
                if(fillBoard(baseBoard)) return baseBoard;
                console.log(baseBoard)

                baseBoard[emptyCell.rowIndex][emptyCell.colIndex] = {
                    value: 0,
                    initiallyGenerated: false,
                };
            };
        };
        return false;
    };

    const newSolvedBoard = () => {

        const newBoard = baseBoard.map(row => row.map(cell => ({...cell, initiallyGenerated:true})));

        fillBoard(newBoard);
        setSolvedBoard(newBoard);

        return newBoard;
    };

    const removeValue = (solvedBoard, holes) => {

        if(solvedBoard.length <= 0) {
            console.log(`solved board still empty`)
        } else {

            const removedValues = [];
    
            while( removedValues.length < holes ) {
                const value = Math.floor(Math.random() * 81);
                const randomRowIndex = Math.floor(value / 9);
                const randomColIndex = value % 9;
                // console.log(`rowIndex: ${randomRowIndex}; colIndex: ${randomColIndex}`);
                if (!solvedBoard[ randomRowIndex ]) continue 
                if ( solvedBoard[ randomRowIndex ][ randomColIndex ] == 0) continue 
                
                removedValues.push({
                    rowIndex: randomRowIndex,
                    colIndex: randomColIndex,
                    val: solvedBoard[ randomRowIndex ][ randomColIndex ]
                });
                
                solvedBoard[ randomRowIndex ][ randomColIndex ] = {
                    value: 0,
                    initiallyGenerated: false,
                };
        
                const proposedBoard = solvedBoard.map( row => row.map((cell) => ({...cell})));
        
                if (!fillBoard(proposedBoard)) {
                    solvedBoard[ randomRowIndex ][ randomColIndex ] = {
                        value: removedValues.pop().val,
                        initiallyGenerated: true
                    }
                }
            }
            // console.log(removedValues)
            // console.log(solvedBoard)
            // return [removedValues, solvedBoard];
        }
    }

    const newStartingBoard = () => {

        setCounter(0);
        setNumberSelected(null);
        setTileSelected(null);

        newSolvedBoard();
        
        // console.log(solvedBoard)
        // removeValue(solvedBoard, holes);
        // console.log(solvedBoard)
        // let [removedValues, baseBoard] = removeValue(solvedBoard.map( row => row.slice()), holes);
        
        // return [removedValues, baseBoard, solvedBoard];
    }

    const handleNumberSelect = num => {
        setNumberSelected(num);
    };

    const handleTileClick = (rowIndex, colIndex) => {
        console.log(rowIndex, colIndex)
        if(numberSelected !== null) {
            const newBoard = [...solvedBoard];
            console.log(newBoard)
            console.log(newBoard[rowIndex][colIndex])
            newBoard[rowIndex][colIndex] = {
                value: numberSelected,
                initiallyGenerated: false
            };
            console.log(newBoard);

            setUserBoard(newBoard);

            const cell = document.getElementById(`${rowIndex}-${colIndex}`);
            cell.innerText = numberSelected;
            
            // setSolvedBoard(newBoard);
        }
    }

    const validateBoard = () => {
        const rowSet = new Set();
        const columnSet = new Set();
        const boxSet = new Set();

        for(let i=0; i < userBoard.length; i++) {
            const row = userBoard[i];

            for(let j = 0; j < row.length; j++) {
                const rowNumber = row[j];
                const columnNumber = userBoard[j][i];
                const boxNumber = userBoard[3 * Math.floor(i / 3) + Math.floor(j / 3)][(i * 3) % 9 + (j % 3)];

                if(rowNumber !== '.') {
                    if (rowSet.has(rowNumber)) {
                        console.log(`row lost`); 
                        return false;
                    }
                    rowSet.add(rowNumber);
                }
                
                if(columnNumber !== '.') {
                    if(columnSet.has(columnNumber)) {
                        console.log(`col lost`); 
                        return false;
                    }
                    columnSet.add(columnNumber);
                }
                
                if(boxNumber !== '.') {
                    if(boxSet.has(boxNumber)) {
                        console.log(`box lost`); 
                        return false;
                    }
                    boxSet.add(boxNumber);
                }
            }

            rowSet.clear();
            columnSet.clear();
            boxSet.clear();
        }
        console.log(`won`)
        setIsSuccess(true);
        return true;
    }
    
    return (
        <div className='md:w-96 flex flex-col items-center'>
            <h2>Sudoku</h2>

            <div className='sudoku-board my-4 h-full flex flex-col kbd w-fit p-1'>
                {solvedBoard.map((row, rowIndex) => (
                    <div key={rowIndex} className={`${styles.row} h-full flex justify-center`}>
                        {row.map((cell, colIndex) => (
                            <div 
                                id={`${rowIndex}-${colIndex}`} 
                                key={`${rowIndex}-${colIndex}`} 
                                className={
                                    `h-9 w-9 flex justify-center items-center ${styles.tile} 
                                    ${!cell.initiallyGenerated ? 'hover:bg-base-300 cursor-pointer' : ''}
                                    ${cell.initiallyGenerated ? 'bg-neutral text-secondary' : ''}`
                                } 
                                onClick={() => {
                                    if (!cell.initiallyGenerated){
                                        handleTileClick(rowIndex, colIndex)
                                    }
                                }}
                            >
                                {cell.value !== 0 && cell.value}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className='number-selector space-x-2 my-4 flex justify-center'>
                {Array.from({length: 9}).map((_, index) => (
                    <div key={index} className={`kbd cursor-pointer ${numberSelected === index + 1 ? 'ring-1 ring-neutral' : ''}`} onClick={() => handleNumberSelect(index+1)}>
                        {index +1}
                    </div>
                ))}
                <div className={`kbd cursor-pointer ${numberSelected === 0 ? 'ring-1 ring-neutral' : ''}`} onClick={() => handleNumberSelect(0)}>
                    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px">
                        <path d="M 10.806641 2 C 10.289641 2 9.7956875 2.2043125 9.4296875 2.5703125 L 9 3 L 4 3 A 1.0001 1.0001 0 1 0 4 5 L 20 5 A 1.0001 1.0001 0 1 0 20 3 L 15 3 L 14.570312 2.5703125 C 14.205312 2.2043125 13.710359 2 13.193359 2 L 10.806641 2 z M 4.3652344 7 L 5.8925781 20.263672 C 6.0245781 21.253672 6.877 22 7.875 22 L 16.123047 22 C 17.121047 22 17.974422 21.254859 18.107422 20.255859 L 19.634766 7 L 4.3652344 7 z"/>
                    </svg>
                </div>
            </div>
            <button className='btn btn-primary' onClick={validateBoard}>Validate</button>
            {isSuccess && 
                <div className='badge badge-primary badge-lg'>You've won !</div>
                // <dialog id='my_modal_1'>
                //     <div className='modal-box'>
                //         <p>You've won !</p>
                //         <div className="modal-action">
                //         <form method="dialog">
                //             <button className="btn">Close</button>
                //         </form>
                //         </div>
                //     </div>
                // </dialog>
            }
                
        </div>
    )
}