import { useEffect, useState } from "react";
import ReactPaginate from 'react-paginate';

import CompanyItem from "./CompanyItem";
import AddCompanyModal from './AddCompanyModal';

export default function CompanyList ({ companies, showFavour, showDelete, categories, provinces, ...props }) {
    const [ showType, setShowType ] = useState('grid');

    /** Items per page */
    const pageMenu = [ 12, 50, 100 ];
    const [ showPPMenu, setPPMenu ] = useState(false);
    const [ cPP, setCPP ] = useState(pageMenu[0]);

    // Pagination component states.
    const [ itemOffset, setItemOffset ] = useState(0);
    const [ endOffset, setEndOffset ] = useState(0);
    const [ currentItems, setCurrentItems ] = useState(null);
    const [ pageCount, setPageCount ]= useState(0);

    useEffect(() => {        
        if (companies) {          
            const end = itemOffset + cPP;
            const endV = (end > companies.length)? companies.length : end;
            setEndOffset(endV);
            setCurrentItems(companies.slice(itemOffset, endV));
            setPageCount(Math.ceil(companies.length / cPP));
        } else {
            setItemOffset(0);
            setCurrentItems(null);
            setPageCount(0);
        }
    }, [companies && companies.length, itemOffset]);
    
    useEffect(() => {
        setItemOffset(0);
    }, [cPP]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * cPP) % companies.length;
        setItemOffset(newOffset);
    };

    const [ show, setShow ] = useState(false);
    const [ editCompany, setEditCompany] = useState(null);


    return (
        <div className="profile-content">
            <AddCompanyModal
                show={show} 
                setShow={setShow}
                categories={categories}
                provinces={provinces}
                company={editCompany}
            />
            {
            currentItems && companies &&
            <>
                <div className="border-top pt-10">
                    <div className="box-filters-job">
                        <div className="row">                    
                            <div className="col-xl-6 col-lg-5">
                                <span className="text-small text-showing">
                                    Showing <strong> {companies.length && itemOffset + 1} - {endOffset} </strong> of <strong> {companies.length} </strong> companies.
                                </span>
                            </div>
                            <div className="col-xl-6 col-lg-7 text-lg-end mt-sm-15">
                                <div className="display-flex2">
                                    <div className="box-border mr-10">
                                        <span className="text-sortby">Show:</span>
                                        <div className="dropdown dropdown-sort">
                                            <button onClick={() => setPPMenu(!showPPMenu)} className="btn dropdown-toggle" id="dropdownSort" type="button" data-bs-toggle="dropdown" aria-expanded="false" data-bs-display="static">
                                                <span>{cPP}</span>
                                                <i className="fi-rr-angle-small-down" />
                                            </button>
                                            <ul className={`dropdown-menu dropdown-menu-light ${showPPMenu && 'show'}`} aria-labelledby="dropdownSort">
                                                {
                                                    pageMenu.map((n, i) => 
                                                        <li key={i}>
                                                            <a className={`dropdown-item ${cPP == n && 'active'}`} onClick={() => { setCPP(n); setPPMenu(false); }}>{n}</a>
                                                        </li>
                                                    )
                                                }                                                
                                            </ul>
                                        </div>
                                    </div>                                                        
                                    <div className="box-view-type">
                                        <a className="cursor-pointer view-type" onClick={() => setShowType(showType => (showType === 'grid')? 'list' : 'grid')}>
                                            {
                                                showType === 'list'?
                                                <img src="assets/imgs/template/icons/icon-grid.svg" alt="milempresas.es" /> :
                                                <img src="assets/imgs/template/icons/icon-list.svg" alt="milempresas.es" />
                                            }                                                                  
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`row ${showType==='list'? 'display-list' : ''}`}>
                        {
                            currentItems.map((c, ix) => {

                                return (
                                    <CompanyItem
                                        categories={categories}
                                        provinces={provinces}
                                        type={showType} 
                                        data={c} 
                                        key={ix} 
                                        setShow={setShow}
                                        setEditCompany={setEditCompany}
                                        showFavour={showFavour}
                                        showDelete={showDelete}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
                <div className="text-center paginations m-0 border-top border-bottom pt-10 pb-10">
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel=""
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={pageCount}
                        previousLabel=""
                        pageLinkClassName="pager-number"
                        previousLinkClassName="pager-prev"
                        nextLinkClassName="pager-next"
                        containerClassName="pager"
                        activeLinkClassName="active"
                    />
                </div>
            </>
            }
        </div>
    )
}