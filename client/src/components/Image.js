import React from 'react'

const Image = ({ height, width, src }) => {
  return (
    <img alt="" src={src}
      style={{
        borderRadius: '50%',
        border: `1px solid black`
      }}
      height={height} width={width}
      align="center"
    />
  )
}

export default Image
