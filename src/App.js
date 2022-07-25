import { useState } from 'react'
import FormAddPerson from "./components/FormAddPerson"
import FormFilter from "./components/FormFilter"
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

  const [searchterm, setSearchTerm] = useState("")
  const [filteredPersons, setFilteredPersons] = useState([])
  const [showAll, setShowAll] = useState(true)

  const handleAddSubmit = (e) => {
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

  const handleFilterSubmit = (e) => {
      e.preventDefault() 
      let filteredPersons = persons.filter(p => {
          return p.name.toLowerCase().includes(searchterm.toLowerCase())
      })
      if(filteredPersons.length > 0) {
          alert(`${searchterm} returned ${filteredPersons.length} results`)
          setFilteredPersons(filteredPersons)
          setShowAll(!showAll)
      } else {
          alert(`${searchterm} was not found`)
          setFilteredPersons([])
      }
      setSearchTerm("")
  }

  const personsToShow = showAll ? persons : filteredPersons

  return (
    <div className="container">
      <h2>Filter</h2>
      <FormFilter 
        handleFilterSubmit={handleFilterSubmit}
        setSearchTerm={setSearchTerm}
        searchterm={searchterm}
        showAll={showAll}
      />
      <hr/>
      <h2>Add</h2>
      <FormAddPerson
        handleSubmit={handleAddSubmit}
        setNewPerson={setNewPerson}
        newPerson={newPerson} 
      />
      <hr/>
      <h2>Phonebook</h2>
      <ul>
        {personsToShow && personsToShow.map(p => {
          return (
            <Person key={p.id} person={p} />
          )
        })}
      </ul>
    </div>
  )
}

export default App
