import Link from "next/link";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

SwiperCore.use([Navigation, Pagination]);

import { useSelector } from "react-redux";

const CategorySlider3 = ({ categories }) => {
    return (
        <>
            <div className="swiper-container swiper-group-5 swiper">
                <Swiper
                    slidesPerView={7}
                    spaceBetween={20}
                    loop={true}
                    navigation={{
                        prevEl: ".swiper-button-prev",
                        nextEl: ".swiper-button-next"
                    }}
                    pagination={{
                        clickable: true,
                    }}                    
                    modules={[Pagination]}
                    breakpoints={{
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 30
                        },
                        575: {
                            slidesPerView: 2,
                            spaceBetween: 30
                        },
                        767: {
                            slidesPerView: 3,
                            spaceBetween: 30
                        },
                        991: {
                            slidesPerView: 5,
                            spaceBetween: 30
                        },
                        1199: {
                            slidesPerView: 7,
                            spaceBetween: 30
                        }
                    }}
                    className="swiper-wrapper pb-25 pt-5 d-flex flex-column"
                >                    
                    {categories && categories.map((c, i) => (
                        <SwiperSlide className="swiper-slide hover-up" key={i}>
                            <a className="cursor-pointer">
                                <div className="item item-logo d-flex flex-column">
                                    {/* <div className="image-left">
                                        <img alt="milempresas.es" src={`assets/imgs/page/homepage1/marketing.svg`} />
                                    </div> */}
                                    <div className="text-info-right text-center">                                            
                                        <h4>{c.name}</h4>
                                    </div>
                                </div>
                            </a>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    );
};

export default CategorySlider3;
