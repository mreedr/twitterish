import React, { useState } from 'react'
import styled from 'styled-components'
import Chrrp from './Chrrp'
import Button from './Button'
import Image from './Image'
import TextArea from './TextArea'
import { white } from '../constants/colors'

const iconType = 'user circle'

const ChrrpFeed = ({ chrrps, onSave, onDelete, user, goToChrrp }) => {
  const [chrrpInput, setChrrpInput] = useState('')

  const { username, imgUrl } = user

  return (
    <div style={{ flex: 2 }}>
      <Container padding="1.5rem">
        <div style={{ height: 'fit-content', marginBottom: 'auto', display: 'flex' }}>
          <Image src={require(`../assets/${imgUrl}`)} height="40" width="40" />
        </div>
        <TextArea
          onChange={setChrrpInput}
          value={chrrpInput}
          focus={true}
          placeholder={'What\'s happening?'}
          onSave={val => onSave(val)}
        />
        <Button style={{ margin: '4px 0 auto 0' }} text="Post" onClick={e => {
          setChrrpInput('')
          onSave(chrrpInput)
        }} />
      </Container>
      {chrrps && chrrps.length > 0 && (
        <Container flexDirection="column">
          {chrrps.map((c, index) => (
            <div key={c._id} onClick={() => goToChrrp(c._id)}>
              <Chrrp
                body={c.body}
                dateAdded={c.dateAdded}
                image={iconType}
                username={username}
                imgUrl={imgUrl}
                onDelete={onDelete}
                id={c._id}
              />
              {index !== chrrps.length - 1 && <div style={{ height: '1px', background: '#F4F6F9' }}></div>}
            </div>
          ))}
        </Container>
      )}
    </div>
  )
}

export default ChrrpFeed

const Container = styled.div`
  background: ${white};
  border-radius: 10px;
  display: flex;
  flex: 1;
  flex-direction: ${props => props.flexDirection || 'row'};
  margin-bottom: 2rem;
  padding: ${props => props.padding};
  box-shadow: 0px 4px 60px rgba(26, 40, 60, 0.14);
`
