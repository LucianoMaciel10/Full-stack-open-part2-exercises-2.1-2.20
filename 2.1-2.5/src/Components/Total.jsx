import React from 'react'

function Total({parts}) {
  return (
    <>
      <p>Number of exercises {parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0)}</p>
    </>
  )
}

export default Total