const FormEditPerson = (props) => {

    const { person, editedPerson, setEditedPerson, handleUpdate } = props

    const handleChange = (e) => {
        let changedP = ({...person, [e.target.id]: e.target.value })
        setEditedPerson({name: changedP.name || person.name, number: changedP.number || person.number})
    }

    return (
        <form 
            onSubmit={(e)=>{handleUpdate(e, person.id)}}
            >
            <label 
                className="form-label"
                htmlFor="name"
                >Name: 
            </label>
            <input 
                id="name"
                className="form-control"
                placeholder={person.name}
                onChange={handleChange}
            />
            <label 
                className="form-label"
                htmlFor="number"
                >Number: 
            </label>
            <input 
                id="number"
                className="form-control"
                placeholder={person.number}
                onChange={handleChange}
            />
            <button type="submit" className="btn btn-primary btn-sm my-2">Update</button>         
        </form>
    )
  
}

export default FormEditPerson
