import React from 'react'
import styled from 'styled-components'
import SearchBar from './SearchBar'
import { blue } from '../constants/colors'
import { ReactComponent as Icon } from '../assets/Path.svg'

const Header = props => {
  const { chrrpId } = props.match.params
  return (
    <Container>
      <Logo center={!!chrrpId}>
        <Icon />
        <Brand>chrrp</Brand>
      </Logo>
      {!chrrpId && <SearchBar history={props.history} />}
    </Container>
  )
}

export default Header

const Container = styled.div`
  display: flex;
  height: 8rem;
  align-items: center;
  z-index: 1;
`

const Brand = styled.div`
  color: ${blue};
  font-weight: bold;
  padding-left: 2.5px;
`

const Logo = styled.div`
  display: flex;
  flex: 1;
  ${props => props.center && 'justify-content: center;'}
`
