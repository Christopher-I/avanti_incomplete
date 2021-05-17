import { Props } from './index.d'
import styled, { keyframes } from 'styled-components'

export const StyledModalBackground = styled.div<Props>`
  z-index: 10;
`
export const fadeIn = keyframes`
  from { opacity: 0 }
  to { opacity: 1}
`

export const fadeInDown = keyframes`
  from { opacity: 0; transform: translateY(-10%); }
  to { opacity: 1; transform: translateY(0);}
`

export const BackdropStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  z-index: 99999;
  animation: ${fadeIn} 0.3s ease-in;
  background-color: rgba(40, 44, 52, 0.5);
  -webkit-overflow-scrolling: touch;
`

export const Wrapper = styled.div<{ topBorder: boolean }>`
  position: relative;
  margin: 3rem auto;
  max-width: 607px;
  animation: ${fadeInDown} 0.3s ease-in;
  background-color: #fff;
  border-radius: 5px 5px 5px 5px;
  box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2),
    0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12);
  -webkit-overflow-scrolling: touch;
`

export const ModalInsideContent = styled.div`
  position: relative;
  display: flex;
  align-content: center;
  flex-wrap: wrap;
  justify-content: center;
  font-family: 'Roboto', sans-serif;
  height: 40vh;
  width: 100%;
  background-color: white;
`

export const ModalCancelIcon = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  padding: 8px;
  z-index: 2;
  background: none;
  & svg {
    g {
      g {
        stroke: grey;
      }
    }
  }
`
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 80%;
  width: 60%;
`
export const Header = styled.div`
  display: flex;
  justify-content: center;
  font-size: 21px;
`
export const Score = styled.div`
  display: flex;
  justify-content: center;
  color: grey;
`
export const EntryBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`
export const StyledInput = styled.input`
  margin-top: 10px;
  height: 20px;
`
export const StyledButton = styled.button`
  margin-top: 10px;
  height: 30px;
  color: white;
  background-color: black;
`