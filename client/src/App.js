import React, { useState, useEffect } from 'react' // eslint-disable-line no-unused-vars
import { Redirect } from 'react-router-dom'
import { apiUrl } from './constants/config'
import styled from 'styled-components'
import Profile from './components/Profile'
import ChrrpFeed from './components/ChrrpFeed'
import Toast from './components/Toast'
import Loading from './components/Loading'
import useApi from './hooks/api'

const App = props => {
  const { username } = props.match.params
  const [toastChrrpId, reqToast] = useState(false)

  const [resAllChrrps, reqAllChrrps] = useApi()
  const [resNewChrrp, reqNewChrrp] = useApi()
  const [resDeleteChrrp, reqDeleteChrrp] = useApi()
  const [resUndoDeleteChrrp, reqUndoDeleteChrrp] = useApi()
  const [resUserInfo, reqUserInfo] = useApi()

  useEffect(() => {
    reqUserInfo({
      method: 'get',
      path: `${apiUrl}/users/${username}`
    })
  }, [username, reqUserInfo])

  // after any successfully database update, re-fetch chrrps
  useEffect(() => {
    reqAllChrrps({
      method: 'get',
      path: `${apiUrl}/${username}/chrrps`
    })
  }, [
    reqAllChrrps,
    resNewChrrp.data,
    resDeleteChrrp.data,
    resUndoDeleteChrrp.data,
    username
  ])

  const { data: user } = resUserInfo
  if (resUserInfo.isLoading) return <Loading />
  if (resUserInfo.error) return <Redirect to="/404" />

  return user ? (
    <div style={{ flex: 1 }}>
      <Container>
        <Profile user={user}/>
        <ChrrpFeed chrrps={resAllChrrps.data}
          error={resNewChrrp.error}
          user={user}
          goToChrrp={(id) => {
            props.history.push(`${username}/${id}`)
          }}
          onSave={body => {
            reqNewChrrp({
              method: 'post',
              path: `${apiUrl}/chrrps`,
              body: { username, body }
            })
          }}
          onDelete={(chrrpId) => {
            reqDeleteChrrp({
              method: 'delete',
              path: `${apiUrl}/chrrps/${chrrpId}`
            })
            reqToast(chrrpId)
          }}
        />
      </Container>
      {toastChrrpId && <Toast id={toastChrrpId}
        onDismiss={() => reqToast(false)}
        isLoading={resUndoDeleteChrrp.isLoading}
        reqUndoDeleteChrrp={reqUndoDeleteChrrp} />}
    </div>
  ) : <div />
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  height: 100%;
`

export default App
