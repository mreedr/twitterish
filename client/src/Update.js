import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { apiUrl } from './constants/config'
import { white } from './constants/colors'
import useApi from './hooks/api'
import Chrrp from './components/Chrrp'

const UpdateChrrp = props => {
  const { username, chrrpId } = props.match.params

  const [{ data, error }, reqChrrpById] = useApi()
  const [resUpdateChrrp, reqUpdateChrrp] = useApi()
  const [resUserInfo, reqUserInfo] = useApi()

  useEffect(() => {
    reqChrrpById({
      method: 'get',
      path: `${apiUrl}/chrrps/${chrrpId}`
    })
  }, [chrrpId, reqChrrpById])

  useEffect(() => {
    reqUserInfo({
      method: 'get',
      path: `${apiUrl}/users/${username}`
    })
  }, [username, reqUserInfo])

  useEffect(() => {
    if (resUpdateChrrp.data) props.history.push(`/${username}`)
  }, [resUpdateChrrp.data, props.history, username])

  const user = resUserInfo.data

  if (error) return <Redirect to="/404" />
  return !user ? <div /> : (
    <Container>
      { data && (
        <ChrrpContainer>
          <Chrrp
            dateAdded={data.dateAdded}
            body={data.body}
            username={username}
            id={data._id}
            update={true}
            imgUrl={user.imgUrl}
            onUpdate={(id, val) => {
              reqUpdateChrrp({
                method: 'put',
                path: `${apiUrl}/chrrps/${id}`,
                body: { body: val }
              })
            }}
          />
        </ChrrpContainer>
      ) }
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
`

const ChrrpContainer = styled.div`
  background: ${white};
  border-radius: 10px;
  width: 100%;
  max-width: 35rem;
  box-shadow: 0px 4px 60px rgba(26, 40, 60, 0.14);
`

export default UpdateChrrp
