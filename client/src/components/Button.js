import React from 'react'
import styled from 'styled-components'
import { blue, white, green } from '../constants/colors'
import { shadeColor } from '../constants/fns'

const Button = ({ text, onClick, type, inverted, style }) => {
  const config = {
    backgroundColor: type === 'secondary' ? green : blue,
    textColor: white,
    fontWeight: type === 'secondary' ? '' : 'bold',
    borderColor: type === 'secondary' ? white : blue
  }

  return (
    <ChrrpButton
      {...config}
      customStyles={style}
      inverted={inverted}
      onClick={onClick}>
      {text}
    </ChrrpButton>
  )
}

export default Button

const ChrrpButton = styled.button`
  background: ${({ inverted, backgroundColor }) => (
    inverted ? white : backgroundColor
  )};
  border-radius: 50px;
  color: ${({ inverted, textColor, backgroundColor }) => (
    inverted ? backgroundColor : textColor
  )};
  border: 1px solid ${({ inverted, borderColor }) => (
    inverted ? white : borderColor
  )};
  padding: .5rem 1.5rem .5rem 1.5rem;
  font-weight: ${({ fontWeight }) => fontWeight};
  outline: none;
  cursor: pointer;

  &:hover {
    background: ${({ inverted, backgroundColor }) => shadeColor(backgroundColor, -20)};
    border-color: ${({ inverted, backgroundColor }) => shadeColor(backgroundColor, -20)};
    color: ${white}
  }

  ${({ customStyles }) => {
    // this block is used to format and add any custom styles
    if (!customStyles) return
    let formated = ''
    for (const key of Object.keys(customStyles)) {
      formated = `${formated}\n${key}: ${customStyles[key]};`
    }
    return formated
  }}
`
