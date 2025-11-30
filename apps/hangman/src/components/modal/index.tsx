import { Props } from './index.d'
import React, { useState, useEffect } from 'react'
import * as gameActions from '@packages/sdk/resources/game/actions'
import * as userActions from '@packages/sdk/resources/user/actions'
import {
  StyledModalBackground,
  BackdropStyle,
  Wrapper,
  ModalCancelIcon,
  ModalInsideContent,
  Content,
  Header,
  Score,
  EntryBox,
  StyledInput,
  StyledButton,
} from './styles'
import { useDispatch, useSelector } from '@packages/sdk'
import * as gameSelectors from '@packages/sdk/resources/game/selectors'
import * as userSelectors from '@packages/sdk/resources/user/selectors'

const STORAGE_KEY = 'hangman_username'

const Modal: React.FunctionComponent<any> = ({
  onClose,
  show,
  children,
  topBorder = false,
}) => {
  const [open, setOpen] = React.useState(show || false)
  const [username, setUsername] = useState('')
  const score = useSelector(gameSelectors.score)
  const dispatch = useDispatch()

  // Load saved username from localStorage on mount
  useEffect(() => {
    const savedUsername = localStorage.getItem(STORAGE_KEY)
    if (savedUsername) {
      setUsername(savedUsername)
    }
  }, [])

  useEffect(() => {
    if (show !== undefined) {
      setOpen(show)
    }
  }, [show])

  const onClick = () => {
    //about to close modal invoke the callback
    if (open) {
      onClose && onClose()
    }
    setOpen(!open)
  }

  const onSubmitHighScore = (e) => {
    // Save username for future games
    localStorage.setItem(STORAGE_KEY, username)
    dispatch(gameActions.setHighScore(username))
    setOpen(false)
  }

  return (
    <div>
      {open && (
        <BackdropStyle>
          <Wrapper data-testid="test-modal-id" topBorder={topBorder}>
            <ModalCancelIcon
              dataTestid="cancel"
              icon={'cancelIcon'}
              onClick={onClick}
            >
              X
            </ModalCancelIcon>
            <ModalInsideContent>
              <Content>
                <Header>High Score Entry</Header>
                <Score>Score: {score}</Score>
                <EntryBox>
                  Username
                  <StyledInput
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                  ></StyledInput>
                  <StyledButton onClick={onSubmitHighScore}>
                    Submit
                  </StyledButton>
                </EntryBox>
              </Content>
            </ModalInsideContent>
          </Wrapper>
        </BackdropStyle>
      )}
    </div>
  )
}

export default Modal
