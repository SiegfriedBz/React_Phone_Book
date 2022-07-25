
const Form = (props) => {
    const { handleSubmit, setNewPerson, newPerson } = props
    return (
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
    )
  
}

export default Form
