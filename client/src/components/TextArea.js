import React from 'react'
import styled from 'styled-components'
import TextareaAutosize from 'react-textarea-autosize'
import { black, darkGray } from '../constants/colors'

const ChrrpTextArea = ({ value, placeholder, onSave, onChange, focus, update, color }) => {
  return (
    <TextArea
      autoFocus={focus}
      update={update}
      color={color || (value ? black : darkGray)}
      placeholder={placeholder}
      value={value}
      onKeyPress={e => {
        if (e.key === 'Enter') {
          onChange('')
          onSave(e.target.value)
          e.preventDefault()
        }
      }}
      onChange={e => {
        onChange(e.target.value)
      }} />
  )
}

export default ChrrpTextArea

const TextArea = styled(TextareaAutosize)`
  border: none;
  width: 100%;
  min-width: 10rem;
  margin: 0.8rem 1rem 0 1rem;
  color: ${props => props.color};
  font-size: 1.1rem;
  outline: none;
  box-shadow: none;
  resize: none;
  height: auto;
  border-radius: 5px;
  transform: scale(1, 1);

  /* these styles are for the update textarea*/
  ${props => props.update && (`
    padding: 0;
    margin: 0;
    font-size: 1.2rem;
    line-height: 1.4285em;
    padding: 0.5rem 1rem 0.5rem 1rem;
    box-shadow: 0px 4px 30px rgba(26, 40, 60, 0.24);
    transform: scale(1.04, 1);
  `)}

  @media only screen and (max-width : 645px) {
    height: 3rem;
  }
`
