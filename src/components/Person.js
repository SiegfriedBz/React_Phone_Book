const Person = (props) => {
    const { person, handleDelete } = props
    return (
        <div className="card w-100 my-2">
            <div className="card-body">
                <h5 className="card-title">Name: {person.name}</h5>
                <p className="card-text">Phone Number: {person.number}></p>
                <button 
                    onClick={() => {handleDelete(person.id)}}
                    className="btn btn-warning btn-sm"
                >Delete
                </button>
            </div>
        </div>
    )
}

export default Person
