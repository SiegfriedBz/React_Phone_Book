import clsx from 'clsx';

const NavBar = (props) => {

    const { handleFilter, setSearchTerm, searchterm, showAll } = props
   
    const buttonText = clsx({
        "Filter": showAll, 
        "Show All": !showAll
    })
    
    return (
        <nav className="navbar bg-light">
            <div className="container-fluid">
                <a className="navbar-brand">PhoneBook</a>
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


