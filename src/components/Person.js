const Person = ({person}) => {
    return (
        <li>
            <p>Name: {person.name}</p>
            <p>Phone Number: {person.number}</p>
        </li>
    )
}

export default Person
