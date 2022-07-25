import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const [persons, setPersons] = useState([
    { id: 0, name: 'Arto Hellas', number: ''}
  ]) 
  const [newPerson, setNewPerson] = useState({
    name: '', number: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if(persons.find(p => p.name === newPerson.name)) {
      alert(`${newPerson.name} already exist in phone book`)
      setNewPerson({
        name: '', number: ''
      })
    } else {
      setPersons([...persons, {...newPerson, id: uuidv4()}])
      setNewPerson({
        name: '', number: ''
      })
    }
  }

  return (
    <div className="container">
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: 
          <input 
            id="name"
            value={newPerson.name}
            onChange={(e) => 
              setNewPerson({...newPerson, [e.target.id]: e.target.value})
            }
            />
        </div>
        <div>
          number: 
          <input 
            id="number"
            value={newPerson.number}
            onChange={(e) => 
              setNewPerson({...newPerson, [e.target.id]: e.target.value})
            }
            />
        </div>
        <div>
          <button type="submit" className="btn btn-primary">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
    <ul>

    </ul>
    {persons && persons.map(p => {
      return (
      <li key={p.id}>
        <p>Name: {p.name}</p>
        <p>Phone Number: {p.number}</p>
      </li>
      )
    })}
    </div>
  )
}

export default App
