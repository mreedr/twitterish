import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import Image from './Image'
import { darkGray, white } from '../constants/colors'
import { ReactComponent as LocationIcon } from '../assets/Location.svg'
import { ReactComponent as LinkIcon } from '../assets/Link.svg'
import { ReactComponent as CalenderIcon } from '../assets/Calender.svg'

const Profile = ({ user }) => {
  const { username, link, dateAdded, location, description } = user
  return (
    <Column>
      <Container>
        <Line>
          <div style={{ maxWidth: '100%', height: 'auto' }}>
            <Image src={require(`../assets/${user.imgUrl}`)} height="58" width="58" />
          </div>
          <Username>{username}</Username>
        </Line>
        <Description>{description}</Description>
        <Line padding="1rem">
          <LocationIcon style={{ marginRight: '1rem' }} />
          <IconLabels>{location}</IconLabels>
        </Line>
        <Line padding="1rem">
          <LinkIcon style={{ marginRight: '1rem' }} />
          <IconLabels>{link}</IconLabels>
        </Line>
        <Line padding="1rem">
          <CalenderIcon style={{ marginRight: '1rem' }} />
          <IconLabels>{moment(dateAdded).format('MMMM DD')}</IconLabels>
        </Line>
      </Container>
    </Column>
  )
}

export default Profile

const Container = styled.div`
  margin-right: 2rem;
  background: ${white};
  border-radius: 10px;
  padding: 2.5rem;
  box-shadow: 0px 4px 60px rgba(26, 40, 60, 0.14);
  width: 227px;

  @media only screen and (max-width : 645px) {
    margin-right: 0;
    flex: 1;
    width: 100%;
  }
`

const Column = styled.div`
  flex: 1;
  padding-bottom: 2rem;
`

const Line = styled.div`
  display: flex;
  align-items: center;
  padding-top: ${props => props.padding || 0};
`

const Username = styled.div`
  font-weight: bold;
  margin: 0;
  padding: 0;
  line-height: 1.7rem;
  padding-left: 0.7rem;
  font-size: 1.6rem;
`

const IconLabels = styled.p`
  color: ${darkGray};
`

const Description = styled.p`
  margin: 1rem 0 1rem;
`
