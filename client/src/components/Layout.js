import React from 'react'
import styled from 'styled-components'
import { lightGray } from '../constants/colors'
import { Route } from 'react-router-dom'
import Header from './Header'

const Layout = ({ component: Component, history, ...rest }) => {
  return (
    <Route {...rest} render={matchProps => {
      return (
        <Body>
          <Container>
            <Header {...matchProps} />
            <Component {...matchProps}/>
          </Container>
        </Body>
      )
    }}>
    </Route>
  )
}

export default Layout

const Body = styled.div`
  background-color: ${lightGray};
  width: 100vw;
  height: 100vh;
  display: flex;
  overflow-y: scroll;
  align-items: center;
  flex-direction: column;
  overflow-x: hidden;

  @media only screen and (max-width : 645px) {
    padding: 0 2rem 0 2rem;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  margin: 0;
  padding: 0;
  width: 50rem;
  flex: 1;

  @media only screen and (max-width : 645px) {
    padding: 0 2rem 0 2rem;
    width: inherit;
  }
`
