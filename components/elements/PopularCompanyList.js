import React, { useEffect, useState } from "react";
import CompanyItem from "./CompanyItem.js";

const PopularCompanyList = ({ categories, companies }) => {    
    const [active, setActive] = useState(-1);
    const [coms, setComs] = useState(null);
    const [cId, setCid] = useState(-1);

    const handleOnClick = (index, catId) => {
        setActive(index);
        setCid(catId);        
    };

    useEffect(() => {        
        if (active === -1) {
            setComs(companies);
        } else {            
            setComs(
                companies.filter((c, i) => {
                    return (c.categories.findIndex(x => x.id == cId) > -1)
                })
            );
        }
    }, [companies, active, cId])

    return (
        <>
            <div className="list-tabs mt-40  text-start">
                <ul className="nav nav-tabs" role="tablist">
                    <li>
                        <a className={`cursor-pointer ${active === -1 ? "active" : ""}`} onClick={() => handleOnClick(-1, -1)}>
                            <img src="/assets/imgs/page/homepage1/management.svg" alt="milempresas.es" /> ALL
                        </a>
                    </li>
                    {
                        categories &&
                        categories.map((c, i) => 
                            <li key={i}>
                                <a className={`cursor-pointer ${active === (i) ? "active" : ""}`} onClick={() => handleOnClick(i, c.id)}>
                                    {c.name}
                                </a>
                            </li>
                        )
                    }
                </ul>
            </div>
            <div className="tab-content mt-50" id="myTabContent-1">
                <div className="row">
                    {
                        coms &&
                        coms.map((c, i) =>                            
                            <CompanyItem 
                                key={i}
                                data={c}
                                showFavour={true}                                
                                cols={4}
                            />
                        )
                    }           
                </div>
            </div>
        </>
    );
};

export default PopularCompanyList;