const NavBar = (props) => {

    const { handleFilter, setSearchTerm, searchterm, showAllPersons } = props
   
    const buttonText = showAllPersons ? "Filter" : "Show All"
    
    return (
        <nav className="navbar" style={{backgroundColor: "#e3f2fd"}}>
            <div className="container-fluid">
                <a className="navbar-brand fst-italic fw-bold fs-2 ">PhoneBook</a>
                <form 
                    className="d-flex" 
                    role="search"
                    onSubmit={handleFilter}
                >
                    <input 
                        className="form-control me-2" 
                        value={searchterm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        type="search" 
                        aria-label="Search" 
                    />
                    <button 
                        className="btn btn-outline-primary" 
                        type="submit"
                        >{buttonText}
                    </button>
                </form>
            </div>
        </nav>
    )

}

export default NavBar


