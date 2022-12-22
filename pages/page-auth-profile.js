import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CompanyList from "../components/elements/CompanyList";
import Preloader from "../components/elements/Preloader";
import AccountTab from "../components/elements/AccountTab";
import AddCompanyModal from "../components/elements/AddCompanyModal";
import { wrapper }  from "../redux";
import PrivateRoute from "../components/routes/PrivateRoute";
import Layout from "../components/layouts/Layout";

export default function AuthProfile() {
    const router = useRouter();
    const dispatch = useDispatch();    
    const { auth } = useSelector(state => state);
    const { user } = useSelector(state => state.user);    
    const [activeIndex, setActiveIndex] = useState(1);    
    const { provinces, categories } = useSelector(state => state.data.data);
    const [pageData, setPageData] = useState({ categories, provinces });
    const [editCompany, setEditCompany] = useState(null);
    const [showACModal, setShowACModal] = useState(false);
    const myCompanies = user && user.companies && user.companies.length > 0 && user.companies.length;
    const myFavourites = user && user.favourites && user.favourites.length > 0 && user.favourites.length;

    /***************** get profile */    
    useEffect(() => {
        if (!auth.loggedIn) {
            router.push('page-signin');
        }
    }, []);
    /********************************** */

    // if (!user) return <Preloader show={true} />
    return (
        <Layout>
            <Preloader show={!user} />
            <div className="profile-page-content">
                <AddCompanyModal
                    show={showACModal}
                    setShow={setShowACModal}
                    categories={pageData.categories}
                    provinces={pageData.provinces}
                    company={editCompany}
                />
                <div className="border-bottom" />
                <section className="section-box mt-50">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 col-md-4 col-sm-12">
                                <div className="box-nav-tabs nav-tavs-profile mb-5">
                                    <ul className="nav" role="tablist">
                                        <li>
                                            <a className={`tab-btn btn btn-border mb-20 ${activeIndex === 1 && 'active'}`} onClick={() => setActiveIndex(1)}>
                                                My Profile
                                            </a>
                                        </li>
                                        <li>
                                            <a className={`tab-btn btn btn-border mb-20 ${activeIndex === 2 && 'active'}`} onClick={() => setActiveIndex(2)}>
                                                My Companies
                                            </a>
                                        </li>
                                        <li>
                                            <a className={`tab-btn btn btn-border mb-20 ${activeIndex === 3 && 'active'}`} onClick={() => setActiveIndex(3)}>
                                                Favourites
                                            </a>
                                        </li>
                                    </ul>
                                    <div className="border-bottom pt-10 pb-10" />
                                </div>
                            </div>
                            <div className="col-lg-9 col-md-8 col-sm-12 col-12 mb-50">
                                <div className="content-single">
                                    <div className="tab-content">
                                        <div className={`tab-pane fade ${activeIndex === 1 && "show active"}`}>
                                            <h3 className="mt-0 mb-15 color-brand-1 d-flex">My Account</h3>
                                            <h5 className="font-md color-text-paragraph-2">Update your profile.</h5>
                                            <AccountTab user={user} />
                                        </div>
                                        <div className={`tab-pane fade ${activeIndex === 2 && "show active"}`}>
                                            <h3 className="mt-0 mb-15 color-brand-1 d-flex justify-content-between">
                                                <span>My Company
                                                    {/* <span className="text-success">{myCompanies}</span> */}
                                                </span>
                                                <a className="btn btn-apply mb-0" onClick={() => { setShowACModal(true) }}>New</a>
                                            </h3>
                                            <h5 className="font-md color-text-paragraph-2">Show your own companies.</h5>
                                            {
                                                myCompanies > 0 &&
                                                <CompanyList
                                                    showDelete={true}
                                                    companies={user.companies}
                                                    categories={pageData.categories}
                                                    provinces={pageData.provinces}
                                                />
                                            }
                                        </div>
                                        <div className={`tab-pane fade ${activeIndex === 3 && "show active"}`}>
                                            <h3 className="mt-0 mb-15 color-brand-1 d-flex">
                                                <span>My Favourites
                                                    {/* <span className="text-success">{myFavourites}</span>  */}
                                                </span>
                                            </h3>
                                            <h5 className="font-md color-text-paragraph-2">Show your favourites companies.</h5>
                                            {
                                                myFavourites > 0 &&
                                                <CompanyList
                                                    showDelete={false}
                                                    companies={user && user.favourites}
                                                    showFavour={true}
                                                    categories={pageData.categories}
                                                    provinces={pageData.provinces}
                                                />
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
}
