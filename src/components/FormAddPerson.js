const FormAddPerson = (props) => {
    const { handleSubmit, setNewPerson, newPerson } = props
    return (
        <form onSubmit={handleSubmit}>
            <label 
                className="form-label"
                htmlFor="name"
                >Name: 
            </label>
            <input 
                id="name"
                className="form-control"
                value={newPerson.name}
                onChange={(e) => 
                setNewPerson({...newPerson, [e.target.id]: e.target.value})
                }
            />
            <label 
                className="form-label"
                htmlFor="number"
                >Number: 
            </label>
            <input 
                id="number"
                className="form-control"
                value={newPerson.number}
                onChange={(e) => 
                setNewPerson({...newPerson, [e.target.id]: e.target.value})
                }
            />
            <button type="submit" className="btn btn-primary btn-sm my-2">add</button>         
        </form>
    )
  
}

export default FormAddPerson
