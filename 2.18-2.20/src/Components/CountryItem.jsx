import React, { useState } from 'react'
import Country from './Country'

function CountryItem({data}) {
  const [show, setShow] = useState(false)

  const handleClick = () => {
    setShow(!show)
  }

  return (
    <div>
      <p style={{'display':'inline'}}>{data.name.common}</p>
      <button onClick={handleClick}>Show</button>
      {
        show && (
          <Country data={data} />
        )
      }
    </div>
  )
}

export default CountryItem