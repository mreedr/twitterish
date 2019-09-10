import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { Icon } from 'semantic-ui-react'
import { apiUrl } from '../constants/config'
import { green, white } from '../constants/colors'
import { ReactComponent as Trash } from '../assets/Trash.svg'

import Button from './Button'

const animationTime = 300

const Toast = ({ onDismiss, id, reqUndoDeleteChrrp, isLoading }) => {
  const [animation, setAnimation] = useState(fadeIn)
  const [isUndoClicked, setUndoClicked] = useState(false)

  useEffect(() => {
    if (!isLoading && isUndoClicked) {
      setAnimation(fadeOut)
      setTimeout(onDismiss, animationTime)
    }
  }, [isLoading, onDismiss, isUndoClicked])

  return (
    <Container animation={animation}>
      <Trash />
      <Msg>Chrrp successfully deleted</Msg>
      { isLoading ? (
        <Icon loading name='spinner' />
      ) : (
        <Button
          text = "Undo"
          type = "secondary"
          style = {{
            'margin-left': 'auto',
            'margin-right': '.5rem'
          }}
          textColor={green}
          onClick={() => {
            setUndoClicked(true)
            reqUndoDeleteChrrp({
              method: 'put',
              path: `${apiUrl}/chrrps/${id}`,
              body: { deleted: false }
            })
          }}
        />
      ) }
      <Button
        text="Dismiss"
        type="secondary"
        inverted={true}
        textColor={green}
        onClick={() => {
          setAnimation(fadeOut)
          setTimeout(onDismiss, animationTime)
        }}
      />
    </Container>
  )
}

export default Toast

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`

const fadeOut = keyframes`
  0% { opacity: 1; }
  100% { opacity: 0; }
`

const Container = styled.div`
  animation: ${props => props.animation} ${animationTime + 100}ms ease-in-out;
  display: flex;
  align-items: center;
  box-shadow: 0 0 15px -10px rgba(0,0,0,.35);
  background: ${green};
  position: sticky;
  border-radius: 10px;
  bottom: 1rem;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  padding: 1rem;
  box-shadow: 0px 0px 14px rgba(15, 28, 45, 0.25);
  transform: scale(1.07, 1.07);  
`

const Msg = styled.p`
  color: ${white};
  margin: 0 0 0 1rem;
`
