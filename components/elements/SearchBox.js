import dynamic from 'next/dynamic';
import { useEffect, useState } from "react";
import ReactSelect from 'react-select';
import { dataService } from "../../services";

// const ReactSelect = dynamic(() => import('react-select'), {
//     ssr: false
// });

const SearchBox = ({ categories, provinces, handleSearch, searchOptions, setSearchOptions }) => {
    const [ cities, setCities ] = useState([]);
    const [ loading, setLoading ] = useState(false);

    // Select options values.
    const cts2options = categories? categories.map((ct, ix) => { return { value: ct.id, label: ct.name } }) : [];
    const pr2options = provinces? provinces.map((p, ix) => { return { value: p.province_id, label: p.province_name } }) : [];
    const sct = (cts2options && searchOptions.category)? cts2options.find((ct, ix) => (ct.value == searchOptions.category)) : {};
    const spr = (pr2options && searchOptions.province)? pr2options.find((p, ix) => (p.value == searchOptions.province)) : {};
    const sci = (cities && searchOptions.city)? cities.find((c, ix) => (c.value == searchOptions.city)) : {};
    
    const changeCategory = async (e) => {
        // if (e.value == -1) return;
        setSearchOptions((s) => { return {...s, category: e.value } })
    }

    const changeProvince = async (e) => {
        // if (e.value == -1) return;
        setSearchOptions((s) => { return { ...s, province: e.value } });
    }
    
    useEffect(() => {
        if (searchOptions.province != -1) {
            refreshCities(searchOptions.province);
        }
    }, [searchOptions.province]);
    
    const refreshCities = async (pr) => {
        setLoading(true);
        const res =  await dataService.loadCities(pr);
        const cs = res.data.map((c, ix) => { return { value: c.city_id, label: c.city_name } });
        setCities(cs);
        setLoading(false);
    }

    const changeCity = async (e) => {
        // if (e.value == -1) return;
        setSearchOptions((s) => { return {...s, city: e.value } })
    }

    const handleClick = () => {        
        handleSearch();
    }

    return (
        <div className="d-flex search-box">
            <div className="box-item">
                <ReactSelect
                    id="s1"
                    instanceId="s1"
                    className="form-input input-category a-select sel-category"
                    classNamePrefix="select"
                    defaultValue={{ value: '-1', label: 'Category'}}
                    isSearchable={true} 
                    onChange={(e) => changeCategory(e)}
                    options={[{ value: '-1', label: 'Category'}, ...cts2options]}
                    value={sct}
                />
            </div>
            
            <div className="box-item">
                <ReactSelect
                    id="s2"
                    instanceId="s2"
                    className="form-input input-location a-select sel-category"
                    classNamePrefix="select"
                    defaultValue={{ value: '-1', label: 'Province'}}
                    isSearchable={true}                    
                    onChange={(e) => changeProvince(e)}
                    options={[{ value: '-1', label: 'Province'}, ...pr2options]}
                    value={spr}
                />
            </div>
            <div className="box-item">
                <ReactSelect
                    id="s3"
                    instanceId="s3"
                    isDisabled={loading}
                    className="form-input input-location a-select sel-category"
                    classNamePrefix="select"
                    defaultValue={{ value: '-1', label: 'City'}}
                    isSearchable={true}
                    onChange={(e) => changeCity(e)}
                    options={[{ value: '-1', label: 'City'}, ...cities]}
                    value={sci}
                />
            </div>
            <div className="box-item">
                <div className="form-input input-keysearch">
                    <input 
                        className="input-search"
                        type="text" 
                        placeholder="Keyword"
                        onKeyUp={(e) =>  setSearchOptions((s) => { return {...s, keyword: e.target.value } })}
                        defaultValue={searchOptions.keyword}
                    />
                </div>
            </div>
            <button disabled={loading && 'disabled'} className="btn btn-default btn-find font-sm btn-search" onClick={() => handleClick()}>
                { loading? 'Loading...' : 'Search' }
            </button>
        </div>
    )
}

export default SearchBox;