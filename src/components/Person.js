import { useState } from "react"
import FormEditPerson from "./FormEditPerson"

const Person = (props) => {

    const [showFormEdit, setShowFormEdit] = useState(false)

    const { 
        person, 
        editedPerson,
        setEditedPerson,
        handleUpdate, 
        handleDelete
    } = props

    const buttonEditText = showFormEdit ? "Close Form" : "Edit"

    const renderFormEdit = showFormEdit ? 
        <FormEditPerson 
            person={person} 
            editedPerson={editedPerson}
            setEditedPerson={setEditedPerson}
            handleUpdate={handleUpdate}
        />
        : null

    return (
        <div className="card w-100 my-2">
            <div className="card-body">
                <h5 className="card-title">Name: {person.name}</h5>
                <p className="card-text">Phone Number: {person.number}</p>
                <div className="my-2">
                    <button 
                        onClick={() => {setShowFormEdit(!showFormEdit)}}
                        className="btn btn-primary btn-sm"
                    >{buttonEditText}
                    </button>
                    {renderFormEdit}
                </div>
                <div className="my-2">
                    <button 
                        onClick={() => {handleDelete(person.id)}}
                        className="btn btn-warning btn-sm"
                    >Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Person
