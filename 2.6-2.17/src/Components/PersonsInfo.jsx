import React from 'react'
import personsService from '../services/personsService'

function PersonsInfo({ filteredPersons, setPersons, persons, filter, setNotification }) {
  return (
    <>
      <h2>Persons</h2>
      {
        filter !== ''
          ? filteredPersons.map(person => <p key={person.name}>{person.name} {person.number}</p>)
          : persons.map(person => <p key={person.name}>{person.name} {person.number} <button onClick={() => {
            if (window.confirm(`Are you sure you want to delete ${person.name}?`)) {
              personsService
                .remove(person.id)
                .then(data => {
                  setNotification([`Delete ${data.name}`, 'succes'])
                  setTimeout(() => {
                    setNotification(null)
                  },5000)
                  const filteredPersons = persons.filter(person => person.id !== data.id)
                  setPersons(filteredPersons)
                })
            }
          }}>delete</button></p>)
      }
    </>
  )
}

export default PersonsInfo