import { useState } from 'react'
import Form from "./components/Form"
import Person from "./components/Person"
import { v4 as uuidv4 } from 'uuid';  

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '+41-123456', id: 0 },
    { name: 'Ada Lovelace', number: '+41-44-5323523', id: 1 },
    { name: 'Dan Abramov', number: '+41-43-234345', id: 2 },
    { name: 'Mary Poppendieck', number: '+41-23-6423122', id: 3 }
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
      <h2>Filter</h2>

      <hr/>
      <h2>Add</h2>
      <Form 
        handleSubmit={handleSubmit}
        setNewPerson={setNewPerson}
        newPerson={newPerson} 
      />
      <hr/>
      <h2>Phonebook</h2>
      <ul>
        {persons && persons.map(p => {
          return (
            <Person key={p.id} person={p} />
          )
        })}
      </ul>
    </div>
  )
}

export default App
