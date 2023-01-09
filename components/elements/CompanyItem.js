import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromUserCompany, removeFavourite, setFavourite } from "../../redux/actions/user.actions";
import { userConstants } from "../../redux/constants";
import { Alert, userService } from "../../services";
import { strTruncate } from "../../utils/formatter";
import Preloader from "./Preloader";

/**ICON */
const Star = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#3C65F5" className="bi bi-bookmark-star" viewBox="0 0 16 16">
        <path d="M7.84 4.1a.178.178 0 0 1 .32 0l.634 1.285a.178.178 0 0 0 .134.098l1.42.206c.145.021.204.2.098.303L9.42 6.993a.178.178 0 0 0-.051.158l.242 1.414a.178.178 0 0 1-.258.187l-1.27-.668a.178.178 0 0 0-.165 0l-1.27.668a.178.178 0 0 1-.257-.187l.242-1.414a.178.178 0 0 0-.05-.158l-1.03-1.001a.178.178 0 0 1 .098-.303l1.42-.206a.178.178 0 0 0 .134-.098L7.84 4.1z" />
        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
    </svg>
)

const StarFill = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#3C65F5" className="bi bi-bookmark-star-fill" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zM8.16 4.1a.178.178 0 0 0-.32 0l-.634 1.285a.178.178 0 0 1-.134.098l-1.42.206a.178.178 0 0 0-.098.303L6.58 6.993c.042.041.061.1.051.158L6.39 8.565a.178.178 0 0 0 .258.187l1.27-.668a.178.178 0 0 1 .165 0l1.27.668a.178.178 0 0 0 .257-.187L9.368 7.15a.178.178 0 0 1 .05-.158l1.028-1.001a.178.178 0 0 0-.098-.303l-1.42-.206a.178.178 0 0 1-.134-.098L8.16 4.1z" />
    </svg>
)

const DeleteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#3C65F5" className="bi bi-trash" viewBox="0 0 16 16">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
    </svg>
)
/** */


const defaultListCols = 12;
const defaultGridCols = 4;

const Item = ({ type = 'grid', cols = defaultGridCols, showFavour = false, showDelete = false, data, setEditCompany = null, setShow = null }) => {
    const dispatch = useDispatch();
    const { user } = useSelector(s => s.user);
    const Fav = user && user.favourites && (user.favourites.findIndex(fc => (fc.id == data.id)) > -1);
    const [waiting, setWaiting] = useState(false);

    const favourHandler = async (cid, uid, company) => {
        setWaiting(true);
        if (!Fav) {
            await userService.setFavourite(cid, uid)
                .then(
                    async (res) => {
                        const company = await userService.getCompanyById(cid);
                        dispatch({ type: userConstants.FAVOUR_ADD_SUCCESS, company });
                        Alert.success();
                    },
                    error => {
                        Alert.error();
                    }
                );
        } else {
            await userService.removeFavourite(cid, uid)
                .then(
                    res => {
                        dispatch({ type: userConstants.FAVOUR_DEL_SUCCESS, company: cid });
                        Alert.success();
                    },
                    error => {
                        Alert.error();
                    }
                );
        }
        setWaiting(false);
    }

    const removeFromUser = async (companyId) => {
        setWaiting(true);
        userService.removeCompany(companyId)
            .then(
                async (res) => {
                    return await userService.removeUserCompany(user.id, companyId)
                        .then(
                            res => {
                                dispatch({ type: userConstants.COMPANY_DEL_SUCCESS, id: companyId });
                                Alert.success('Remove company successful.');
                            }
                        )
                },
                error => {
                    Alert.error('Remove failed.');
                }
            );
        setWaiting(false);
    }

    const editCompany = (e, company) => {
        // setEditCompany(company);
        // setShow(true);
    }

    return (
        <div className={`ci-item ${type == 'grid' ? 'cg-item' : 'cl-item'} col-xl-${type == 'grid' ? cols : defaultListCols} col-lg-${type == 'grid' ? cols : defaultListCols} col-md-6 col-sm-12 col-12 d-flex`}>
            <div className="card-grid-2 hover-up">
                <div className="card-grid-2-image-left head">
                    <>
                        {
                            !waiting && user && showFavour &&
                            <span className="favourite cursor-pointer" onClick={() => favourHandler(data.id, user.id, data)}>
                                {
                                    Fav ? <StarFill /> : <Star />
                                }
                            </span>
                        }
                        {
                            !waiting && user && showDelete &&
                            <span className="remove" onClick={() => removeFromUser(data.id)}>
                                <DeleteIcon />
                            </span>
                        }
                    </>

                    <div className="image-box c-logo">
                        {
                            data.image && data.image.imageBase64 ?
                                <img src={`data:${data.image.type};base64,${data.image.imageBase64}`} alt="milempresas.es" /> :
                                <img src="assets/imgs/template/default-company.jpg" alt="milempresas.es" />
                        }
                    </div>
                </div>
                <div className="inner">
                    <div className="card-block-info">
                        <h4 className="ci-title name-job">
                            {/* <a className="cursor-pointer" onClick={(e) => editCompany(e, data)}> */}
                            {data.name}
                            {/* </a> */}
                        </h4>
                        {
                            type == 'list' &&
                            <div className="right-info">
                                <span className="card-mail c-cinfo email mr-10">{data.email}</span>
                                <span className="card-phone c-cinfo phone mr-10">{data.phone}</span>
                                <a className="cursor-pointer mr-10" target="_blank" href={`/page-location-map?address=${data.address}&city=${data.city.city_name}&province=${data.province.province_name}`}>
                                    <span className="card-location c-cinfo">{data.address}, {data.city.city_name}, {data.province.province_name}</span>
                                </a>
                            </div>
                        }
                        {
                            type == 'grid' &&
                            <div className="mt-5 ci-info">
                                <span className="card-mail c-cinfo email">{data.email}</span> <br />
                                <span className="card-phone c-cinfo phone">{data.phone}</span> <br />
                                <a className="cursor-pointer" target="_blank" href={`/page-location-map?address=${data.address}&city=${data.city.city_name}&province=${data.province.province_name}`}>
                                    <span className="card-location c-cinfo">{data.address}, {data.city.city_name}, {data.province.province_name}</span>
                                </a>
                            </div>
                        }
                        <p className="ci-desc font-sm color-text-paragraph mt-15">
                            {strTruncate(data.description, 100)}
                        </p>
                        <div className="ci-cats mt-30">
                            {
                                data.categories.map((c, i) => {
                                    return (
                                        <a className="btn btn-grey-small mr-5 mt-1" key={i}>{c.name}</a>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const CompanyItem = (props) => {
    return (
        <Item {...props} />
    )
}

export default CompanyItem;