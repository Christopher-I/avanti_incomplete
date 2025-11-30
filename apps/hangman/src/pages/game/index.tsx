import CharacterBoard from './components/character-board'
import * as gameActions from '@packages/sdk/resources/game/actions'
import * as gameSelectors from '@packages/sdk/resources/game/selectors'
import HeartList from './components/heart-list'
import HighScore from './components/high-score'
import React, { useEffect } from 'react'
import Score from './components/score'
import {
  StyledGameBackground,
  StyledGameWrapper,
  StyledNewGameButton,
} from './styles'
import { useDispatch, useSelector } from '@packages/sdk'
import Modal from '~/components/modal'

export default function GamePage(): JSX.Element {
  const dispatch = useDispatch()

  // Get game data on game start
  useEffect(() => {
    dispatch(gameActions.getNewGame())
    dispatch(gameActions.getHighScores())
  }, [])

  return (
    <StyledGameWrapper>
      <GameBackground />
      <Score />
      <HeartList />
      <CharacterBoard />
      <HighScore />
      <ModalCopy />
      <StyledNewGameButton
        onClick={(e) => {
          e && e.preventDefault()

          dispatch(gameActions.getNewGame())
        }}
        type="button"
      >
        New Game
      </StyledNewGameButton>
    </StyledGameWrapper>
  )
}

function ModalCopy() {
  const status = useSelector(gameSelectors.status)
  const score = useSelector(gameSelectors.score)
  const highscores = useSelector(gameSelectors.highscores)
  const highscoresLimit = useSelector(gameSelectors.highscoresLimit)
  const showModal =
    status !== 'playing' &&
    (score > highscores[highscoresLimit - 1]?.score ||
      highscores.length < highscoresLimit) // check if score qualifies as a high score

  return (
    <>
      <Modal show={showModal}></Modal>
    </>
  )
}

function GameBackground() {
  const status = useSelector(gameSelectors.status)

  return (
    <>
      <StyledGameBackground status={status}></StyledGameBackground>
    </>
  )
}
