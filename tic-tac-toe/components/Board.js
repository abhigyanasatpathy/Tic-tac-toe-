import { useState, useEffect } from 'react'
import styles from './Board.module.css'

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)
  const [resetting, setResetting] = useState(false)

  useEffect(() => {
    const startSound = new Audio('/start.wav')
    startSound.play()
  }, [])

  const handleClick = (i) => {
    const squaresCopy = squares.slice()
    if (calculateWinner(squares) || squaresCopy[i]) {
      return
    }
    squaresCopy[i] = xIsNext ? 'X' : 'O'
    setSquares(squaresCopy)
    setXIsNext(!xIsNext)

    const clickSound = new Audio('/click.wav')
    clickSound.play()
  }

  const handleReset = () => {
    setResetting(true)
    setTimeout(() => {
      setSquares(Array(9).fill(null))
      setXIsNext(true)
      setResetting(false)
      
      const startSound = new Audio('/start.wav')
      startSound.play()
    }, 500) 
  }

  const renderSquare = (i) => {
    return (
      <button className={styles.square} onClick={() => handleClick(i)}>
        {squares[i]}
      </button>
    )
  }

  const winner = calculateWinner(squares)
  let status
  if (winner) {
    status = 'Winner: ' + winner

    
    const winSound = new Audio('/win.wav')
    winSound.play()
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O')
  }

  return (
    <div className={`${styles.boardContainer} ${resetting ? styles.fadeOut : styles.fadeIn}`}>
      <div className={styles.status}>{status}</div>
      <div className={styles.boardRow}>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className={styles.boardRow}>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className={styles.boardRow}>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button className={styles.resetButton} onClick={handleReset}>Reset</button>
    </div>
  )
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

export default Board
