
const CategoryMultiFilter = ({ categories, filterOptions, setFilterOptions }) => {

    const selectCategory = (e) => {
        const v = e.target.value;
        // if (v !== -1)
        // {
            const newF = filterOptions.fCategories.filter(c => c != -1).filter(c => c != v);
            if (e.target.checked) newF.push(v);
            // console.log(newF);
            setFilterOptions(s => { return {...s, fCategories: newF} });
        // } 
        // else {
        //     setFilterOptions({ fCategories: [-1] });
        // }
    }

    return (
        <div className="sidebar-shadow none-shadow mb-30">
            <div className="sidebar-filters">
                <div className="filter-block head-border mb-30">
                    <h5>
                        Advance Filter
                    </h5>
                </div>                               
                <div className="filter-block mb-20">
                    <h5 className="medium-heading mb-15">Categories</h5>
                    <div className="form-group">
                        <ul className="list-checkbox">         
                            {
                                categories && categories.map((c, ix) => {
                                    return (
                                        <li key={ix}>
                                            <label className="cb-container">
                                                <input 
                                                    type="checkbox"
                                                    value={c.id} 
                                                    onChange={(e) => selectCategory(e)}
                                                />
                                                <span className="text-small">{c.name}</span>
                                                <span className="checkmark" />
                                            </label>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoryMultiFilter;