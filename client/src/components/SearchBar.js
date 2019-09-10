import React, { useRef, useEffect } from 'react' // eslint-disable-line no-unused-vars
import { Input } from 'semantic-ui-react'
import { apiUrl } from '../constants/config'
import useApi from '../hooks/api'

const SearchBar = props => {
  const [{ data }, reqApi] = useApi()

  useEffect(() => {
    reqApi({
      method: 'get',
      path: `${apiUrl}/users`
    })
  }, [reqApi])

  return (
    <div style={{ flex: 0.7 }}>
      <Input
        className='header-search-bar'
        list='users'
        icon='search'
        iconPosition='left'
        placeholder='Search...'
        onKeyPress={e => {
          if (e.key === 'Enter') {
            props.history.push(e.target.value)
            e.target.value = ''
          }
        }} />
      { data && (
        <datalist id='users'>
          {data.map(d => <option key={d._id} value={d.username} />) }
        </datalist>
      ) }
    </div>
  )
}

export default SearchBar
