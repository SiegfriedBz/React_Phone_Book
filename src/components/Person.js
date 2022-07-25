const Person = (props) => {
    const { person, handleDelete } = props
    return (
        <li>
            <p>Name: {person.name}</p>
            <p>Phone Number: {person.number}</p>
            <button 
                onClick={() => {handleDelete(person.id)}}
                className="btn btn-warning btn-sm"
            >Delete</button>
        </li>
    )
}

export default Person
