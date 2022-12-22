import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkCookieForAuthentication } from '../../redux/actions/user.actions';
import { dataConstants, userConstants } from '../../redux/constants';
import { Alert, dataService, userService } from '../../services';
import Preloader from '../elements/Preloader';
import { store } from '../../redux';

const DataRoute = ({ children }) => {
    const { auth, user } = useSelector(state => state);
    const dispatch = useDispatch();

    /******************* load global data */
    const { data } = useSelector(state => state.data);
    useEffect(() => {
        const load = async () => {
            // console.log('-----------go to load');
            await dataService.loadGlobalPageData()
                .then(data => {
                    // console.log('------------data loaded');
                    dispatch({
                        type: dataConstants.DATA_LOAD_SUCCESS,
                        data,
                    })
                });
        }
        if (!data.categories.length) load();
    }, []);
    /************************************* */

    /************ if user not logged in, check authentication */
    useEffect(() => {
        if (!auth.loggedIn)
        {
            checkCookieForAuthentication(store, null);
        }
    }, [!auth.loggedIn]);
    /************************************** */

    /************ if user logged in, get profile */
    useEffect(() => {
        if (auth.loggedIn && !user.user)
        {            
            userService.getUserById(auth.auth.id)
                  .then(
                        user => {
                            dispatch({ type: userConstants.GET_PROFILE_SUCCESS, user });
                            Alert.success('Success to get user.');
                        },
                        error => {
                            Alert.error('Failed to get user.');
                        }
                    )
        }
    }, [auth.loggedIn]);
    /************************************** */
    
    if (!data.categories.length) return <Preloader show={true} />;
    return (
        <>
            {children}
        </>
    );
};

export default DataRoute;