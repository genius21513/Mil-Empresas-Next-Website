import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import Select from 'react-select';

import { Alert, dataService, userService } from '../../services';
import { useDispatch, useSelector } from 'react-redux';
import Preloader from './Preloader';
import { getByteObjFromFile } from '../../utils/clientUtil';
import { addCompanyFormResolver } from '../../utils/resolvers';
import { userConstants } from '../../redux/constants';

const AddCompanyModal = ({ show, setShow, categories, provinces, company }) => {
    const dispatch = useDispatch();

    const { user, success } = useSelector(state => state.user);
    const [ loading, setLoading ] = useState(false);
    const [ waiting, setWaiting ] = useState(false);

    /** Select options */
    const [ selOptions, setSelOptions ] = useState({ categories: null, province: null, city: null });
    const [ cities, setCities ] = useState([]);

    // Select options values.
    const cts2options = categories? categories.map((ct, ix) => { return { value: ct.id, label: ct.name } }) : [];
    const pr2options = provinces? provinces.map((p, ix) => { return { value: p.province_id, label: p.province_name } }) : [];
    const sct = (company && company.categories)? company.categories.map(c => { return { value: c.id, label: c.name } }) : [];
    const spr = (company && company.province)? {value: company.province.province_id, label: company.province.province_name } : {};
    const sci = (company && company.city)? {value: company.city.city_id, label: company.city.city_name } : {};

    const changeCategory = async (e) => {
        if (!e) return;
        const cs = e.map(o => { return { id: o.value, name: o.label } });
        setSelOptions(s => {
            return { 
                ...s,
                categories: cs
            }
        })
    }

    const changeCity = async (e) => {
        if (!e) return;
        setSelOptions(s => { return { ...s, city: { city_id: e.value, city_name: e.label, province_id: e.pr_id } } })
    }

    const changeProvince = async (e) => {        
        if (!e) return;
        const pr = e.value;
        setCities([]);
        setSelOptions(s => { return { ...s, province: { province_id: e.value, province_name: e.label } } });
        const res = await dataService.loadCities(pr);
        if (res.success == 'true') {
            const cs = res.data.map((c, ix) => { return { value: c.city_id, label: c.city_name, pr_id: pr } });
            setCities(cs);                    
        } else {
            Alert.error();
        }
    }

    const refreshCities = async (pr) => {
        setLoading(true);
        dataService.loadCities(pr)
            .then(res => {            
                const cs = res.data.map((c, ix) => { return { value: c.city_id, label: c.city_name, pr_id: pr } });
                setCities(cs);
                setLoading(false);
            })
    }

    useEffect(() => {
        if (!company) return;
        refreshCities(company.province.province_id);
    }, [company]);


    const { register, handleSubmit, reset, formState : { errors }} = useForm({
        ...addCompanyFormResolver
    });

    // Upload image.    
    const [ image, setImage ] = useState(null);

    // const imageMimeType = /image\/(png|jpg|jpeg)/i;
    // const getBase64StringFromDataURL = (dataURL) => dataURL.replace('data:', '').replace(/^.+,/, '');

    /** upload to client */
    const uploadToClient = async (event) => {
        const oj = await getByteObjFromFile(event);
        setImage(oj);
    };

    /** upload to server */
    const uploadToServer = async () => {
        if(image) {            
            return await userService.uploadBase64(image)
                .then(res => { return res; })
                .catch( err => Alert.error() );
        }
        return null;
    }
    
    /** submit */
    const onSubmit = async (data) => {
        if (!selOptions.categories || !selOptions.province || !selOptions.city) {
            Alert.info('Please, select the box');
            return;
        }

        /***************** this is start */
        setWaiting(true);

        /** upload image to server */        
        const img = await uploadToServer();
        const objImg = img && { id: img.id, ...img };

        /**Validation */
        const add_data = {...data, ...selOptions, image: objImg };
        
        if (company) {
            // dispatch(saveMyCompany(add_data, user.id));
        } else {            
            await userService.addCompany(add_data)
                .then(
                    new_ => {
                        const rel = { id_user: user.id, id_company: new_.id };
                        userService.addUserCompany(rel)
                        .then(
                            res => {
                                Alert.success('Add company successful.');
                                dispatch({ type: userConstants.COMPANY_ADD_SUCCESS, data: { id: user.id, company: new_ } });
                            }
                        )
                    },
                    error => {
                        Alert.error('Add company failed.');          
                    }
                );                
            setWaiting(false);
            reset();
            setShow(false);
        }        
    }

    useEffect(() => {
        const body = document.getElementsByTagName('body')[0];
        if(show) {
           body.classList.add('modal-open');
        } else {
            if (body.classList.contains('modal-open'))
                body.classList.remove('modal-open');
        }
    }, [show])
    return (
        <>
            <div 
                className={`modal fade ${show && 'modal-show show'}`} 
                id="ModalApplyJobForm" 
                tabIndex={-1} 
                aria-hidden="true"                 
                onClick={(e) => {
                    e.stopPropagation();
                    // setShow(false);
                }}
            >
                <Preloader show={waiting} />
                <div className="modal-dialog modal-lg modal-add-company" onClick={(e) => { e.stopPropagation(); }}>
                    <div className="modal-content apply-job-form">
                        <button className="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShow(false)}/>
                        <div className="modal-body pl-30 pr-30 pt-50">                            
                            <div className="text-center">
                                <p className="font-sm text-brand-2">{company? 'Edit' : 'Add' } Company</p>                                
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)} className="text-start mt-20 pb-30">
                                <div className='row'>
                                    <div className='col-xl-3 col-md-4 col-sm-12'>
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="input-1">Company Name *</label>
                                            <input className={`form-control ${ errors.name? 'is-invalid' : '' }`} {...register('name')} type="text"  name="name" placeholder="" required defaultValue={company && company.name} />
                                            <div className={ errors.name? 'invalid-feedback' : 'valid-feedback' }>{ errors.name && errors.name.message }</div>
                                        </div>
                                    </div>
                                    <div className='col-xl-3 col-md-4 col-sm-12'>
                                        <div className="form-group">
                                            <label className="form-label" >Email *</label>
                                            <input className={`form-control ${ errors.email? 'is-invalid' : '' }`} {...register('email')}  type="email"  name="email" placeholder="" required  defaultValue={company && company.email} />
                                            <div className={ errors.email? 'invalid-feedback' : 'valid-feedback' }>{ errors.email && errors.email.message }</div>
                                        </div>
                                    </div>
                                    <div className='col-xl-3 col-md-4 col-sm-12'>
                                        <div className="form-group">
                                            <label className="form-label" >Address *</label>
                                            <input className={`form-control ${ errors.address? 'is-invalid' : '' }`} {...register('address')}  type="text"  name="address" placeholder="" required  defaultValue={company && company.address} />
                                            <div className={ errors.address? 'invalid-feedback' : 'valid-feedback' }>{ errors.address && errors.address.message }</div>
                                        </div>
                                    </div>
                                    <div className='col-xl-3 col-md-4 col-sm-12'>
                                        <div className="form-group">
                                            <label className="form-label" >Phone *</label>
                                            <input className={`form-control ${ errors.phone? 'is-invalid' : '' }`} {...register('phone')}  type="text"  name="phone" placeholder="" required  defaultValue={company && company.phone} />
                                            <div className={ errors.phone? 'invalid-feedback' : 'valid-feedback' }>{ errors.phone && errors.phone.message }</div>
                                        </div>
                                    </div>
                                    <div className='col-xl-12 col-md-12 col-sm-12'>
                                        <div className="form-group">
                                            <label className="form-label" >Categories *</label>
                                            <Select
                                                id="ars1"
                                                instanceId="ars1"
                                                className={`form-input input-industry ra-select sel-category ${ errors.category? 'is-invalid' : '' }`}
                                                {...register('category')} 
                                                classNamePrefix="select"
                                                isMulti
                                                isClearable={true}
                                                isSearchable={true}                                          
                                                options={cts2options}
                                                name="category_select"
                                                onChange={(e) => changeCategory(e)}
                                                // defaultValue={}                                                
                                                // value={sct}
                                                // label="sssSingle select"
                                                placeholder={"Category"}
                                            />
                                            <div className={errors.category? 'invalid-feedback' : 'valid-feedback' }>{ errors.category && errors.category?.value.message }</div>
                                        </div>
                                    </div>                           
                                    <div className='col-xl-3 col-md-4 col-sm-12'>
                                        <div className="form-group">
                                            <label className="form-label" >Province *</label>
                                            {/* {JSON.stringify(spr)} */}
                                            <Select
                                                id="brs2"
                                                instanceId="brs2"
                                                className={`form-input input-industry ra-select sel-category ${ errors.province? 'is-invalid' : '' }`}
                                                {...register('province')} 
                                                classNamePrefix="select"
                                                isClearable={true}
                                                isSearchable={true}        
                                                onChange={(e) => changeProvince(e)}
                                                options={pr2options}
                                                // defaultValue={{ value: '-1', label: 'Province', isDisabled: true }}
                                                // value={spr}
                                                placeholder={"Province"}
                                            />
                                            <div className={errors.province? 'invalid-feedback' : 'valid-feedback' }>{ errors.province && errors.province?.value.message }</div>
                                        </div>
                                    </div>
                                    <div className='col-xl-3 col-md-4 col-sm-12'>
                                        <div className="form-group">
                                            <label className="form-label" >City *</label>
                                            <Select
                                                id="crs3"
                                                instanceId="crs3"
                                                isDisabled={loading}
                                                className={`form-input input-industry ra-select sel-category ${ errors.city? 'is-invalid' : '' }`}
                                                {...register('city')} 
                                                classNamePrefix="select"                                                
                                                isClearable={true}    
                                                isSearchable={true}                                                
                                                options={cities}
                                                onChange={(e) => changeCity(e)}                                             
                                                // defaultValue={{ value: '-1', label: 'City', isDisabled: true }}
                                                // value={sci}
                                                placeholder={"City"}
                                            />
                                            <div className={errors.city? 'invalid-feedback' : 'valid-feedback' }>{ errors.city && errors.city?.value.message }</div>
                                        </div>
                                    </div>
                                    <div className='col-xl-3 col-md-4 col-sm-12'>
                                        <div className="form-group">                                         
                                            <label className="form-label" htmlFor="file">Upload Image</label>
                                            <input className={`form-control ${ errors.imageCompany? 'is-invalid' : '' }`} {...register('imageCompany')} accept="image/*" name="image" type="file" onChange={(e) => uploadToClient(e)} />
                                            <div className={ errors.imageCompany? 'invalid-feedback' : 'valid-feedback' }>{ errors.imageCompany && errors.imageCompany.message }</div>
                                        </div>
                                    </div>
                                    <div className='col-xl-3 col-md-4 col-sm-12 add-com-image-col'>
                                        {
                                            image && <img className="" src={`data:image;base64,${image.imageBase64}`} alt="milempresas.es" />
                                        }
                                    </div>
                                    <div className='col-xl-12 col-md-12 col-sm-12'>
                                        <div className="form-group">
                                            <label className="form-label" >Description *</label>                                            
                                            <textarea className={`form-control ${ errors.description? 'is-invalid' : '' }`} {...register('description')}  name="description" placeholder="Company description."  defaultValue={company && company.description} />
                                            <div className={ errors.description? 'invalid-feedback' : 'valid-feedback' }>{ errors.description && errors.description.message }</div>
                                        </div>
                                    </div>
                                </div>                                
                                <div className="form-group">
                                    <button disabled={waiting && 'disabled'} className="w-25 btn btn-default hover-up" type="submit" name="login" > {waiting? 'Saving...' : 'Save'} </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default AddCompanyModal;