import React, { useState, useEffect, useRef } from 'react'
import styled, { keyframes } from 'styled-components'
import moment from 'moment'
import Image from './Image'
import TextArea from './TextArea'
import { black, blue, darkGray, white, medGray } from '../constants/colors'
import { shadeColor } from '../constants/fns'
import OptionsIcon from '../components/OptionsIcon'
import Button from '../components/Button'
import ExitIcon from '../components/ExitIcon'
import { Icon } from 'semantic-ui-react'

const Chrrp = ({ dateAdded, body, username, id, onDelete, update, onUpdate, imgUrl }) => {
  const optionsRef = useRef(null)
  const [optionHover, setOptionHover] = useState(false)
  const [toolTipHover, setToolTipHover] = useState(false)
  const [formatedDate, setFormatedDate] = useState(null)
  const [isUpdating, setIsUpdating] = useState(false)
  const [textInput, setTextInput] = useState(body)
  const [showDeleteTooltip, setShowDeleteTooltip] = useState(false)

  const formatDate = date => moment(date)
    .fromNow(true)
    .replace(/(minutes|minute)/g, 'm')
    .replace(/(hours|hour)/g, 'h')
    .replace(/(an|a)/g, '1')
    .replace(' ', '')
    .replace('1few seconds', 'just now') // this replace is hacky

  // every minute update time since chrrp
  useEffect(() => {
    setFormatedDate(formatDate(dateAdded))
    const interval = setInterval(() => setFormatedDate(formatDate(dateAdded)), 60000)
    return () => clearInterval(interval)
  }, [dateAdded])

  const stopProp = (fn) => {
    return (e) => {
      e.stopPropagation()
      fn()
    }
  }

  return (
    <ChrrpContainer update={update}>
      {isUpdating && <GrayOut />}
      <Header>
        <Info>
          <Image src={require(`../assets/${imgUrl}`)} height={update ? '58' : '32'} width={update ? '58' : '32'}/>
          <LabelContainer>
            <Username update={update}>{username}</Username>
            <Date>{formatedDate}</Date>
          </LabelContainer>
        </Info>
        {!update ? (
          <OptionsContainer >
            <Options ref={optionsRef}
              onMouseEnter={stopProp(e => setOptionHover(true))}
              onMouseLeave={stopProp(e => setOptionHover(false))}
              onClick={stopProp(e => setShowDeleteTooltip(!showDeleteTooltip))}>
              <OptionsIcon color={optionHover ? blue : medGray} />
            </Options>
            <TooltipContainer>
              {showDeleteTooltip && (
                <Tooltip>
                  <TooltipHover
                    // used for the hover animation since it has to be set manually in the svg
                    onMouseEnter={stopProp(e => setToolTipHover(true))}
                    onMouseLeave={stopProp(e => setToolTipHover(false))}
                  >
                    <div onClick={stopProp(e => setShowDeleteTooltip(false))}>
                      <ExitIcon color={toolTipHover ? white : medGray} />
                    </div>
                    <Delete onClick={stopProp(e => {
                      setShowDeleteTooltip(false)
                      onDelete(id)
                    })}>Delete</Delete>
                  </TooltipHover>
                </Tooltip>
              )}
            </TooltipContainer>
          </OptionsContainer>
        ) : isUpdating ? (
          <Button text="Done" style={{
            margin: '4px 0 auto auto',
            transform: 'scale(1, 1)',
            'border-radius': '5px'
          }} onClick={e => {
            onUpdate(id, textInput)
          }}/>
        ) : (
          <UpdateButton onClick={e => {
            if (isUpdating) return onUpdate(id, textInput)
            setIsUpdating(true)
          }}>
            <Icon fitted inverted name="sync" size="large" />
          </UpdateButton>
        )}
      </Header>
      <Content>
        {isUpdating ? (
          <TextArea
            placeholder={textInput}
            color={black}
            focus={true}
            update="true"
            onSave={val => {
              if (val.length) onUpdate(id, val)
            }}
            onChange={val => {
              setTextInput(val)
            }}
          />
        ) : <ContentP update={update}>{textInput}</ContentP>}
      </Content>
    </ChrrpContainer>
  )
}

export default Chrrp

const Username = styled.span`
  margin: 0;
  padding: 0;
  font-weight: bold;
  margin-top: 3px;
  ${props => props.update && 'margin-top: 5px'};
  font-size: ${props => props.update ? '1.6rem' : '1.2rem'};
`

const Date = styled.span`
  color: ${darkGray};
`

const LabelContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding-left: 0.8rem;

  ${props => props.update && `padding-left: 1rem`};
  ${props => !props.update && `line-height: 1.1rem`};
`

const UpdateButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: ${blue};
  margin-left: auto;
  width: 40px;
  height: 40px;
  box-shadow: 0px 2px 10px rgba(7, 36, 74, 0.3);
  z-index: 1;

  &:hover{
    background: ${shadeColor(blue, -20)};
  }
`

const TooltipContainer = styled.div`
  position: relative;
`

const Options = styled.div`
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
  padding: 0 0 10px 10px;
`

const shared = `
  bottom: 100%;
  left: 50%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
`

const arrowSize = 8
const tooltipPadding = 0.8

const Delete = styled.div`
  padding-left: ${tooltipPadding}rem;
`

const TooltipHover = styled.div`
  display: flex;
  &:hover {
    background: ${blue};
    color: ${white}
  }
  padding: 0 ${tooltipPadding}rem;
`

const Tooltip = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  right: -40px;
  box-shadow: 0 0 15px -10px rgba(0,0,0,.35);
  top: 10px;
  background: ${white};
  border: 1px solid ${medGray};
  border-radius: 4px;
  padding: ${tooltipPadding - 0.2}rem 0;
  color: ${medGray};
  cursor: pointer;

  &:after {
    ${shared}
    border-color: rgba(136, 183, 213, 0);
    border-bottom-color: ${white};
    border-width: ${arrowSize - 1}px;
    margin-left: -${arrowSize - 1}px;
  }

  &:before {
    ${shared}
    border-color: rgba(194, 225, 245, 0);
    border-bottom-color: ${medGray};
    border-width: ${arrowSize}px;
    margin-left: -${arrowSize}px;
  }
`

const Info = styled.div`
  display: flex;
  align-items: center;
`

const OptionsContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-content: flex-end;
  margin-left: auto;
  padding: 0 0 0 0.5rem;
  margin-bottom: 1rem;
`

const GrayOut = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: white;
  animation: ${keyframes`
    0% { opacity: 0; }
    100% { opacity: 0.5; }
  `} 0.2s ease-out;
  opacity: 0.5;
  cursor: default;
`

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`

const Header = styled.div`
  display: flex;
  flex: 1;
`

const Content = styled.div`
  padding: 0.8rem 0 0 0;
  flex: 1;
`

const ContentP = styled.p`
  font-size: ${props => props.update ? '1.2rem' : '1.1rem'};
`

const ChrrpContainer = styled.div`
  animation: ${fadeIn} 600ms ease-in-out;
  display: flex;
  padding: ${props => props.update ? '2rem' : '1.5rem'};
  flex-direction: column;
  cursor: pointer;
`
