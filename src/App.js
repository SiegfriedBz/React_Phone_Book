import { useState, useEffect } from 'react'
import NavBar from "./components/NavBar"
import FormAddPerson from "./components/FormAddPerson"
import Person from "./components/Person"
import Notification from "./components/Notification"
import personService from "./services/persons"

const App = () => {

  const [persons, setPersons] = useState([]) 
  const [newPerson, setNewPerson] = useState({name: '', number: ''})
  const [editedPerson, setEditedPerson] = useState({name: '', number: ''})
  const [searchterm, setSearchTerm] = useState("")
  const [filteredPersons, setFilteredPersons] = useState([])
  const [showAllPersons, setShowAllPersons] = useState(true)
  const [flashMessage, setFlashMessage] = useState({message: "", type: ""})

  useEffect(() => {
    const init = async() => {
      const persons = await personService.getAll()
      setPersons(persons)
    }; init()
  }, [])

  const onAdd = async(e) => {
    e.preventDefault()
    if(persons.find(p => p.name === newPerson.name)) {
      setFlashMessage({
        message: `${newPerson.name} already exist in phone book.`,
        type: "alert"
      })
      setTimeout(() => {
        setFlashMessage({message: "", type: ""})
      }, 3000)
    } else {
      const person = await personService.createPerson(newPerson)
      setPersons([...persons, person])
      setFlashMessage({
        message: `${person.name} was successfully added!`,
        type: "notice"
      })
      setTimeout(() => {
        setFlashMessage({message: "", type: ""})
      }, 3000)
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
    setFlashMessage({
      message: `${changedPerson.name} was successfully updated!`,
      type: "notice"
    })
    setTimeout(() => {
      setFlashMessage({message: "", type: ""})
    }, 3000)
  }

  const onDelete = async (_id) => {
      await personService.deletePerson(_id)
      const persons = await personService.getAll()
      setPersons(persons)
      setFlashMessage({
        message: `Person was successfully deleted.`,
        type: "notice"
      })
      setTimeout(() => {
        setFlashMessage({message: "", type: ""})
      }, 3000)
  }

  const onFilter = (e) => {
      e.preventDefault() 
      let filteredPersons = persons.filter(p => {
          return p.name.toLowerCase().includes(searchterm.toLowerCase())
      })
      if(filteredPersons.length > 0) {
          setFlashMessage({
            message: `${searchterm} returned ${filteredPersons.length} results`,
            type: "notice"
          })
          setTimeout(() => {
            setFlashMessage({message: "", type: ""})
          }, 3000)
          setFilteredPersons(filteredPersons)
          setShowAllPersons(!showAllPersons)
      } else {
          setFlashMessage({
            message: `${searchterm} was not found`,
            type: "alert"
          })
          setTimeout(() => {
            setFlashMessage({message: "", type: ""})
          }, 3000)

          setFilteredPersons([])
      }
      setSearchTerm("")
  }

  const personsToShow = showAllPersons ? persons : filteredPersons

  return (
    <>
    <NavBar 
      handleFilter={onFilter}
      setSearchTerm={setSearchTerm}
      searchterm={searchterm}
      showAllPersons={showAllPersons}
    />
    <div className="container">
      <Notification flashMessage={flashMessage} />
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
