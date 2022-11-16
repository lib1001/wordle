import React, { useContext } from 'react'
import { AppContext } from '../App'

function GameOver() {
    const {gameOver, correctWord, currAttempt } = useContext(AppContext)
  return (
    <div className='gameOver'>
        <h3>{gameOver.guessedWord ? "Woohoo! You nailed it!" : "Better Luck Next Time.."} </h3>
        <h1>Correct Word: {correctWord}</h1>
        {gameOver.guessedWord && (<h3>You guessed it {currAttempt.attempt} attempts</h3>)}
    </div>
  )
}

export default GameOver