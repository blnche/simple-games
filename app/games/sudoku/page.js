'use client'
import React, { useState, useEffect } from 'react';
import { Button, Card, Divider, Flex, Space } from 'antd';
import styles from '../../../styles/sudoku.module.css';



export default function Page() {

    const [baseBoard, setBaseBoard] = useState([
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
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
        removeValue(solvedBoard, 45);
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
        return board[emptyCell.rowIndex].indexOf(num) === -1;
    };

    const columnSafe = (board, emptyCell, num) => {
        return !board.some(row => row[emptyCell.colIndex] === num);
    }

    const boxSafe = (board, emptyCell, num) => {
        const boxStartRow = emptyCell.rowIndex - (emptyCell.rowIndex % 3);
        const boxStartColumn = emptyCell.colIndex - (emptyCell.colIndex % 3);

        let safe = true;

        for(const boxRow of [0, 1, 2]) {
            for(const boxCol of [0, 1, 2]) {
                if( board[boxStartRow + boxRow][boxStartColumn + boxCol] === num) {
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
            if(emptyCell.colIndex !== '') return;

            let firstZero = row.find(col => col === 0);
            if(firstZero === undefined) return;

            emptyCell.rowIndex = rowIndex;
            emptyCell.colIndex = row.indexOf(firstZero);
        });

        if( emptyCell.colIndex !== '') return emptyCell;
        return false;
    };

    const fillBoard = baseBoard => {
        const emptyCell = nextEmptyCell(baseBoard);
        if(!emptyCell) return baseBoard;

        for(const num of shuffle(range(1,9))) {
            setCounter(prevCounter => prevCounter + 1);
            if( counter > 20_000_000) throw new Error('Recursion Timeout');

            if(safeToPlace(baseBoard, emptyCell, num)) {
                baseBoard[emptyCell.rowIndex][emptyCell.colIndex] = num;

                if(fillBoard(baseBoard)) return baseBoard;

                baseBoard[emptyCell.rowIndex][emptyCell.colIndex] = 0;
            };
        };
        return false;
    };

    const newSolvedBoard = () => {

        const newBoard = baseBoard.map(row => row.slice());

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
                
                solvedBoard[ randomRowIndex ][ randomColIndex ] = 0;
        
                const proposedBoard = solvedBoard.map( row => row.slice());
        
                if (!fillBoard(proposedBoard)) {
                    solvedBoard[ randomRowIndex ][ randomColIndex ] = removedValues.pop().val;
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
            newBoard[rowIndex][colIndex] = numberSelected;
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
        <div direction='vertical' className='md:w-96'>
            <h2>Sudoku</h2>

            <div className='sudoku-board my-4 h-full flex flex-col'>
                {solvedBoard.map((row, rowIndex) => (
                    <div key={rowIndex} className='row h-full flex justify-center'>
                        {row.map((cell, colIndex) => (
                            <div id={`${rowIndex}-${colIndex}`} key={`${rowIndex}-${colIndex}`} className='h-8 w-8 border flex justify-center cursor-pointer cell' onClick={() => handleTileClick(rowIndex, colIndex)}>
                                {cell !== 0 && cell}
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