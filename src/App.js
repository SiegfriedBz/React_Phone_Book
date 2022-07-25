import { useState, useEffect } from 'react'
import NavBar from "./components/NavBar"
import FormAddPerson from "./components/FormAddPerson"
import Person from "./components/Person"
import { v4 as uuidv4 } from 'uuid';  

const App = () => {

  const [persons, setPersons] = useState([]) 
  const [newPerson, setNewPerson] = useState({
    name: '', number: ''
  })
  const [searchterm, setSearchTerm] = useState("")
  const [filteredPersons, setFilteredPersons] = useState([])
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    const init = async() => {
      try {
        const response = await fetch("http://localhost:3001/persons")
        if(response.status === 200) {
          const data = await response.json()
          setPersons(data)
        } else {
          throw Error(response.status)
        }
      } catch (error) {
        console.log(error)
      }
    };init()
  }, [])

  const onAddPerson = (e) => {
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

  const onDeletePerson = (_id) => {
    let newPersons = persons.filter(person => person.id !== _id)
    setPersons(newPersons)
  }

  const onFilter = (e) => {
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
    <>
    <NavBar 
      handleFilter={onFilter}
      setSearchTerm={setSearchTerm}
      searchterm={searchterm}
      showAll={showAll}
    />
    <div className="container">
      <h2>Add</h2>
      <FormAddPerson
        handleAdd={onAddPerson}
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
              handleDelete={onDeletePerson}
              />
          )
        })}
      </div>
    </div>
    </>
  )
}

export default App
