import { Button, Card, Divider, Flex, Space } from 'antd';
import styles from '../../../styles/sudoku.module.css'

export default function Page() {
    return (
        <section direction='vertical' className='md:w-96'>
            <h2>Sudoku</h2>

            <section>
                <section id="board" style={{display:'grid', gridTemplateColumns: 'repeat(9, 1fr)'}}>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                        <p>Test</p>
                        <p>Test</p>
                        <p>Test</p>
                        <p>Test</p>
                        <p>Test</p>
                        <p>Test</p>
                        <p>Test</p>
                        <p>Test</p>
                        <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                        <p>Test</p>
                        <p>Test</p>
                        <p>Test</p>
                        <p>Test</p>
                        <p>Test</p>
                        <p>Test</p>
                        <p>Test</p>
                        <p>Test</p>
                        <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                        <p>Test</p>
                        <p>Test</p>
                        <p>Test</p>
                        <p>Test</p>
                        <p>Test</p>
                        <p>Test</p>
                        <p>Test</p>
                        <p>Test</p>
                        <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                </section>
                <div className='divider divider-secondary'> Pick a number to place</div>
                <section 
                    id="digits"
                    justify='space-evenly'
                    align='center'
                >
                    <p className='kbd'>1</p>
                    <p className='kbd'>2</p>
                    <p className='kbd'>3</p>
                    <p className='kbd'>4</p>
                    <p className='kbd'>5</p>
                    <p className='kbd'>6</p>
                    <p className='kbd'>7</p>
                    <p className='kbd'>8</p>
                    <p className='kbd'>9</p>
                </section>
            </section>
            <section style={{display: 'flex', justifyContent:'center'}}>
                <button 
                    id="validateButton"
                    className='btn btn-primary'
                >
                    Validate
                </button>
                <button 
                    id="resetButton"
                    className='btn btn-secondary'
                >
                    Reset
                </button>
            </section>
        </section>
    )
}