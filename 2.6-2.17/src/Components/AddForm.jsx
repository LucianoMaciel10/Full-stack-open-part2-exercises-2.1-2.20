import React from 'react'

function AddForm({ handleChangeName, handleSubmit, handleChangeNumber, newName, newNumber }) {
  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a new person</h2>
      <div>
        name: <input value={newName} onChange={handleChangeName} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleChangeNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default AddForm