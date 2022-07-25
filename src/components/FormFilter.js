import clsx from 'clsx';

const FormFilter = (props) => {

    const { handleFilterSubmit, setSearchTerm, searchterm, showAll } = props
   
    const buttonText = clsx({
        "Filter": showAll, 
        "Show All": !showAll
    })

    console.log(buttonText)

    return (
        <form onSubmit={handleFilterSubmit}>
            <label
                htmlFor="filter"
                className="form-label"
            >
                Enter name
            </label>
            <input
                id="filter"
                className='form-control'
                value={searchterm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className='btn btn-primary btn-sm my-2'>{buttonText}</button>
        </form>
    )
}

export default FormFilter
