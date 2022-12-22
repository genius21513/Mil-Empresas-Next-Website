/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect, useState } from "react";
import Layout from "../components/layouts/Layout";

import BlogSlider from "./../components/sliders/Blog";
import BrandSlider2 from "./../components/sliders/Brand2";
import CategorySlider3 from "./../components/sliders/Category3";
import TopRekruterSlider from "./../components/sliders/TopRekruter";

import { useSelector, useDispatch } from "react-redux";
import SearchBox from "../components/elements/SearchBox";
import Preloader from "../components/elements/Preloader";
import { useRouter } from "next/router";
import PopularCompanyList from "../components/elements/PopularCompanyList";
import { Alert, dataService } from "../services";
import { wrapper } from "../redux";

export default function Index() {
    const router = useRouter();
    const dispatch = useDispatch();

    // const data = useSelector(s => s.data);
    // console.log('----------------index: ', data);
    // return 'Loading.............';

    const { categories, provinces, popCategories, popCompanies } = useSelector(s => s.data.data);
    const [waiting, setWaiting] = useState(false);
    const [pageData, setPageData] = useState({ categories, provinces, popCategories, popCompanies });
    const [searchOptions, setSearchOptions] = useState({ 
        category: -1, province: -1, city: -1, keyword: null 
    });

    // console.log('cat, pro------', categories, provinces);

    const handleSearch = () => {
        if (searchOptions.province < 0) {
            Alert.info('Please, select a province.');
            return;
        }

        router.push({
            pathname: '/page-find-company',
            query: {
                ct: searchOptions.category,
                pr: searchOptions.province,
                ci: searchOptions.city,
                k: searchOptions.keyword
            }
        });
    }

    return (        
        <Layout>
            <Preloader show={waiting} />
            <div>
                <section className="section-box index-page">
                    <div className="banner-hero hero-2 hero-3">
                        <div className="banner-inner">
                            <div className="block-banner">
                                <h1 className="text-42 color-white wow animate__animated animate__fadeInUp">
                                    The best company search engine <br className="d-none d-lg-block" />
                                    <span className="color-green">near</span> you.
                                </h1>
                                <div className="font-lg font-regular color-white mt-20 wow animate__animated animate__fadeInUp" data-wow-delay=".1s">
                                    You can find more than 200 company tips.
                                </div>
                                <div className="form-find mt-40 wow animate__animated animate__fadeIn" data-wow-delay=".2s">
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
                                <div className="list-tags-banner mt-20 wow animate__animated animate__fadeInUp" data-wow-delay=".3s">
                                    <strong>Popular Searches:</strong>
                                    {
                                        pageData &&
                                        pageData.popCategories &&
                                        pageData.popCategories.map((c, ix) =>
                                            <span key={ix}>
                                                <a>{c.name} </a>&nbsp;
                                            </span>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="container mt-60">
                            <div className="box-swiper mt-50">
                                {
                                    pageData &&
                                    pageData.categories &&
                                    <CategorySlider3 categories={pageData.categories} />
                                }
                            </div>
                        </div>
                    </div>
                </section>
                <section className="section-box mt-70">
                    <div className="container">
                        <div className="text-center">
                            <h2 className="section-title mb-10 wow animate__animated animate__fadeInUp">List of companies</h2>
                            <p className="font-lg color-text-paragraph-2 wow animate__animated animate__fadeInUp">Find the best companies.</p>
                        </div>
                        {
                            pageData &&
                            pageData.categories &&
                            <PopularCompanyList
                                categories={pageData.categories}
                                companies={pageData.popCompanies}
                            />
                        }

                    </div>
                </section>
            </div>
        </Layout>
    );
}

