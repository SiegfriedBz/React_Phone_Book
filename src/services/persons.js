const BASE_URL = "http://localhost:3001/persons"

const getAll = async() => {
    try {
        const response = await fetch(BASE_URL)
        if(response.status === 200) {
            const data = await response.json()
            return data
        } else {
            throw Error(response.status)
        }
    } catch (error) {
        alert(error)
    }
}

const createPerson = async(person) => {
    try {
        const response = await fetch(BASE_URL, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(person)
        })
        if(response.status === 201) {
            const data = await response.json()
            return data
        } else {
            throw Error(response.status)
        }
    } catch (error) {
        alert(error)
    }
}

const editPerson = async(personId, changedPerson) => {
    try {
        const response = await fetch(`${BASE_URL}/${personId}`, {
            method: "PATCH", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(changedPerson)
        })
        if(response.status === 200) {
            const data = await response.json()
            return data
        } else {
            throw Error(response.status)
        }
    } catch (error) {
        alert(error)
    }
}

const deletePerson = async(personId) => {
    try {
        const response = await fetch(`${BASE_URL}/${personId}`, {
            method: "DELETE", 
            headers: {
                "Content-Type": "application/json"
            }
        })
        if(response.status === 200) {
            const data = await response.json()
            return data
        } else {
            throw Error(response.status)
        }
    } catch (error) {
        alert(error)
    }
}

export default { getAll, createPerson, editPerson, deletePerson }
