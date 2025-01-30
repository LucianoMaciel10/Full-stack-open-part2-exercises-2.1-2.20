import React from 'react'

function Filter({filter, handleChangeFilter}) {
  return (
    <div>
      <h2>Search person</h2>
      filter shown whit <input type="text" value={filter} onChange={handleChangeFilter} />
    </div>
  )
}

export default Filter