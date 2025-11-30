import * as types from './types'
import { GameData } from '.'

const HIGH_SCORES_STORAGE_KEY = 'hangman_highscores'

export const getHighScores = () => (dispatch): void => {
  let highscores = []

  // Load high scores from localStorage
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(HIGH_SCORES_STORAGE_KEY)
      if (stored) {
        highscores = JSON.parse(stored)
      }
    } catch (e) {
      console.error('Failed to load high scores from localStorage', e)
    }
  }

  dispatch({
    type: types.UPDATE,
    payload: { highscores },
  })
}

function generateNewGameData(): Partial<GameData> {
  const words = ['avanti', 'battleship', 'chicken', 'doodle', 'egor', 'fortune']
  const index = Math.floor(Math.random() * words.length)
  const word = words[index]
  const hearts = [1, 1, 1, 1, 1, 1, 1] // Get seven wrong guesses

  return {
    hearts,
    word,
    wordLength: word.length,
    score: 0,
    wordGuessed: [],
    charFade: [],
    charFadeIndex: '',
    guessedLetters: [],
    heartsIndex: '',
    numGuesses: 0,
    status: 'playing',
    wordGuessedIndex: '',
  }
}

export const getNewGame = () => (dispatch): void =>
  dispatch({
    type: types.NEW,
    payload: generateNewGameData(),
  })

export const makeGuess = (char: string) => (dispatch): void =>
  dispatch({
    type: types.GUESS,
    payload: { charGuessed: char },
  })

export const setHighScore = (username: string) => (dispatch): void =>
  dispatch({
    type: types.SET_HIGH_SCORE,
    payload: { username: username },
  })
