import { useState } from 'react'
import Form from "./components/Form"
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
      <Form 
        handleSubmit={handleSubmit}
        setNewPerson={setNewPerson}
        newPerson={newPerson} 
      />
      <h2>Numbers</h2>
    <ul>
      {persons && persons.map(p => {
        return (
        <li key={p.id}>
          <p>Name: {p.name}</p>
          <p>Phone Number: {p.number}</p>
        </li>
        )
      })}
    </ul>
    </div>
  )
}

export default App
