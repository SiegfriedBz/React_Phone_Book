import { useState, useEffect } from 'react'
import NavBar from "./components/NavBar"
import FormAddPerson from "./components/FormAddPerson"
import Person from "./components/Person"
import personService from "./services/persons"

const App = () => {

  const [persons, setPersons] = useState([]) 
  const [newPerson, setNewPerson] = useState({name: '', number: ''})
  const [editedPerson, setEditedPerson] = useState({name: '', number: ''})
  const [searchterm, setSearchTerm] = useState("")
  const [filteredPersons, setFilteredPersons] = useState([])
  const [showAllPersons, setShowAllPersons] = useState(true)

  useEffect(() => {
    const init = async() => {
      const persons = await personService.getAll()
      setPersons(persons)
    }; init()
  }, [])

  const onAdd = async(e) => {
    e.preventDefault()
    if(persons.find(p => p.name === newPerson.name)) {
      alert(`${newPerson.name} already exist in phone book`)
    } else {
      const person = await personService.createPerson(newPerson)
      setPersons([...persons, person])
    }
    setNewPerson({name: '', number: ''})
  }

  const onUpdate = async(e, personId) => {
    e.preventDefault()
    let currentPerson = persons.find(p => p.id === personId)
    let changedPerson = {...currentPerson, ...editedPerson}
    const upDated = await personService.editPerson(personId, changedPerson)
    setPersons(persons.map(p => p.id !== personId ? p : upDated))
    setNewPerson({name: '', number: ''})
  }

  const onDelete = async (_id) => {
      await personService.deletePerson(_id)
      const persons = await personService.getAll()
      setPersons(persons)
  }

  const onFilter = (e) => {
      e.preventDefault() 
      let filteredPersons = persons.filter(p => {
          return p.name.toLowerCase().includes(searchterm.toLowerCase())
      })
      if(filteredPersons.length > 0) {
          alert(`${searchterm} returned ${filteredPersons.length} results`)
          setFilteredPersons(filteredPersons)
          setShowAllPersons(!showAllPersons)
      } else {
          alert(`${searchterm} was not found`)
          setFilteredPersons([])
      }
      setSearchTerm("")
  }

  const personsToShow = showAllPersons ? persons : filteredPersons
  console.log(personsToShow)

  return (
    <>
    <NavBar 
      handleFilter={onFilter}
      setSearchTerm={setSearchTerm}
      searchterm={searchterm}
      showAllPersons={showAllPersons}
    />
    <div className="container">
      <h2>Add</h2>
      <FormAddPerson
        handleAdd={onAdd}
        setNewPerson={setNewPerson}
        newPerson={newPerson} 
      />
      <hr/>
      <h2>Phonebook</h2>
      <div>
        {personsToShow && personsToShow.map(person => {
          return (
            <Person 
              key={person.id} 
              person={person} 
              editedPerson={editedPerson}
              setEditedPerson={setEditedPerson}
              handleUpdate={onUpdate}
              handleDelete={onDelete}
              />
          )
        })}
      </div>
    </div>
    </>
  )
}

export default App
