import { GameData } from '.'
import { ReducerAction } from '@packages/sdk'
import * as types from './types'

const HIGH_SCORES_STORAGE_KEY = 'hangman_highscores'

function saveHighScoresToStorage(highscores: { score: number; username: string }[]): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(HIGH_SCORES_STORAGE_KEY, JSON.stringify(highscores))
    } catch (e) {
      console.error('Failed to save high scores to localStorage', e)
    }
  }
}

function generateInitialState(): GameData {
  return {
    charFade: [],
    charFadeIndex: '',
    guessedLetters: [],
    hearts: [],
    heartsIndex: '',
    highscores: [],
    highscoresLimit: 10,
    highscoresIndex: '',
    numGuesses: 0,
    status: 'playing',
    score: 0,
    word: '',
    wordGuessed: [],
    wordGuessedIndex: '',
    wordLength: 0,
  }
}

export default function gameReducer(
  state = generateInitialState(),
  { type, payload }: ReducerAction<GameData>,
): GameData {
  switch (type) {
    case types.GUESS:
      // Ignore duplicate guesses
      if (state.guessedLetters.includes(payload.charGuessed)) {
        return state
      }

      const charFade = [...state.charFade]
      const guessedLetters = [...state.guessedLetters, payload.charGuessed]
      let hearts = [...state.hearts]
      let numGuesses = state.numGuesses
      let score = state.score
      let status = state.status
      const wordGuessed = [...state.wordGuessed]
      numGuesses++

      state.word.split('').forEach((char, i) => {
        // If the char guessed is a char in the word
        if (char == payload.charGuessed) {
          !wordGuessed.includes(char) && score++
          charFade[i] = numGuesses
          wordGuessed[i] = char
        } else {
          wordGuessed[i] = wordGuessed[i] || ''
        }
      })

      // If the char guessed is not in the word
      if (state.word.indexOf(payload.charGuessed) < 0) {
        let reduced = false

        // Empty first heart to left available
        hearts = hearts.map((heart) => {
          if (!reduced && heart) {
            reduced = true
            return 0
          }

          return heart
        })

        score--
      }

      // User won
      if (state.word == wordGuessed.join('')) {
        status = 'won'
      }
      // User lost
      else if (hearts.reduce((a, b) => a + b, 0) == 0) {
        status = 'lost'
      }

      return {
        ...state,
        charFade,
        charFadeIndex: charFade.join(''),
        guessedLetters,
        hearts,
        heartsIndex: hearts.join(''),
        numGuesses,
        score,
        status,
        wordGuessed,
        wordGuessedIndex: wordGuessed.join(''),
      }

    case types.SET_HIGH_SCORE:
      const highscores = [...state.highscores]
      const highscoresLimit = state.highscoresLimit
      highscores.push({ score: state.score, username: payload.username || '' })
      highscores.sort(function (a, b) {
        return b.score - a.score
      })
      const topHighscores = highscores.slice(0, highscoresLimit)

      // Save to localStorage
      saveHighScoresToStorage(topHighscores)

      return {
        ...state,
        highscores: topHighscores,
        highscoresIndex: highscores.map(({ score }) => score).join(''),
      }

    case types.NEW:
      return {
        ...state,
        ...payload,
      }

    case types.UPDATE:
      return {
        ...state,
        ...payload,
      }

    default:
      return state
  }
}
