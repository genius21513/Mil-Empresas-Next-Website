/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import Layout from "../components/layouts/Layout";
import SearchBox from "../components/elements/SearchBox";
import Preloader from "../components/elements/Preloader";
import CompanyList from "../components/elements/CompanyList";
import CategoryMultiFilter from "../components/elements/CategoryMultiFilter";
import { Alert, dataService} from "../services";

export default function FindCompany ({ }) {
    const dispatch = useDispatch();
    const router = useRouter();
    const query = router.query;        
    const { categories, provinces, popCompanies } = useSelector(state => state.data.data);
    const [ loading, setLoading ] = useState(true);
    const [ searchOptions, setSearchOptions ] = useState({ category: -1, province: -1, city: -1, keyword: null });
    const [ filterOptions, setFilterOptions ] = useState({ fCategories: [] });
    const [ pageData, setPageData ] = useState({ categories, provinces, companies: popCompanies });   
    const [ filtered, setFiltered ] = useState(popCompanies);
    const { user } = useSelector(state => state.user);

    /********************** search with query no effect, event handler */
    const _onSearchWithQuery = async (q) => {
        // This values are verified values. so just go to search.
        const {ct, pr, ci, k} = q;
        setFiltered(null);
        setLoading(true);
        try {
            if (typeof pr === 'undefined') {                
                //Just visit straight this page.
                setPageData(s => { return { ...s, companies: popCompanies } });
                setFiltered(popCompanies);                
            } else if (pr != -1) {
                //Came from home with search query or click search button.
                // convert -1 ----> 0
                const x1 = (ct == -1)? '' : ct;
                const x2 = (pr == -1)? '' : pr;
                const x3 = (ci == -1)? '' : ci;
                const x4 = (k == null)? '' : k;

                const req_data = { category_id: x1, province_id: x2, city_id: x3, keyword: x4 };            
                const cs = await dataService.searchCompanies(req_data);
                setPageData(s => { return { ...s, companies: cs.data } });
                setFiltered(x => cs.data);
            }
        } catch(err) {

        }
        setLoading(false);
    }


    /********************* if comes from home, go to search . */
    useEffect(() => {
        const {ct, pr, ci, k} = query;
        if (typeof pr != 'undefined') {
            setSearchOptions({ category: ct, province: pr, city: ci, keyword: k });
        }        
        /****************go to search */
        _onSearchWithQuery(query);
    }, [query]);

    /******************* event from the search box */
    const handleSearch = async () => {
        if (searchOptions.province < 0) {
            Alert.info('Please, select a province.');
            return;
        }
        /****************go to search */
        _onSearchWithQuery({ ct: searchOptions.category, pr: searchOptions.province, ci: searchOptions.city, k: searchOptions.keyword });
    }

    /************* Filtering */
    useEffect(() => {
        if (!pageData || !pageData.companies || !filterOptions) return;        
        const values = Object.values(filterOptions.fCategories);
        if (filterOptions?.fCategories && values.length == 0) {              
            // values default is array [-1]
            setFiltered(pageData.companies);
            return;
        }        
        const uF = pageData.companies.filter((c, i) => 
                        (c.categories.findIndex(e => values.indexOf(`${e.id}`) > -1) > -1));
        setFiltered(uF);
    }, [filterOptions]);
    /******************************* */
    
    
    return (
        <Layout>
            <Preloader show={loading} />
            <div>
                <section className="section-box-2 find-page pt-10">
                    <div className="container">
                        <div className="banner-hero banner-single banner-single-bg">
                            <div className="block-banner text-center">
                                <h3 className="wow animate__animated animate__fadeInUp">
                                    <span className="color-brand-2">A lot of Jobs</span> Available Now
                                </h3>
                                <div className="font-sm color-text-paragraph-2 mt-10 wow animate__animated animate__fadeInUp" data-wow-delay=".1s">
                                    You can find more than 200 company tips.
                                </div>
                                <div className="form-find text-start mt-40 wow animate__animated animate__fadeInUp" data-wow-delay=".2s">                                        
                                    {
                                        <SearchBox
                                            handleSearch={handleSearch}
                                            setSearchOptions={setSearchOptions}
                                            searchOptions={searchOptions}
                                            categories={pageData.categories}
                                            provinces={pageData.provinces}
                                        />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="section-box mt-30">
                    <div className="container">
                        <div className="row flex-row-reverse">
                            <div className="col-lg-9 col-md-12 col-sm-12 col-12 float-right">                                    
                                {
                                    filtered?.length > 0 &&
                                    <CompanyList companies={filtered} showFavour={!!user} />
                                }
                            </div>
                            <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                                {
                                    pageData &&
                                    <CategoryMultiFilter categories={pageData.categories} filterOptions={filterOptions} setFilterOptions={setFilterOptions} />
                                }
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
}