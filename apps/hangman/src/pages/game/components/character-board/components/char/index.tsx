import * as gameSelectors from '@packages/sdk/resources/game/selectors'
import FadeIn from '~/components/fade-in'
import React, { useState, useEffect } from 'react'
import { StyledCharacterBoardChar } from '../../styles'
import { useSelector } from '@packages/sdk'

interface Props {
  char: string
  index: number // What position of the word the char is at
}

export default function Char({ char, index }: Props): JSX.Element {
  const [correctGuessCount, setCorrectGuessCount] = useState(0)
  const numGuesses = useSelector(gameSelectors.numGuesses)
  const status = useSelector(gameSelectors.status)
  const wordGuessed = useSelector(gameSelectors.wordGuessed)
  const word = useSelector(gameSelectors.word)
  const wordGuessedIndex = useSelector(gameSelectors.wordGuessedIndex) // Needed to trigger state update
  const isCorrect = wordGuessed[index] == char
  const charDisplay = isCorrect || status != 'playing' ? char : ''
  const charStatus = 'playing'
  const fade = correctGuessCount === 0 && status == 'playing'

  useEffect(() => {
    if (isCorrect) {
      let temp = correctGuessCount
      temp++
      setTimeout(function () {
        setCorrectGuessCount(temp)
      }, 250)
    }
    if (numGuesses == 0) {
      setCorrectGuessCount(0) //reset local count when new data is fetched
    }
  }, [numGuesses])

  return (
    <StyledCharacterBoardChar status={charStatus}>
      {fade ? (
        <FadeIn direction="up" distance={25}>
          <div>{charDisplay}</div>
        </FadeIn>
      ) : (
        charDisplay
      )}
    </StyledCharacterBoardChar>
  )
}
