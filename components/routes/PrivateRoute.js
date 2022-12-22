import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../layouts/Layout';

const PrivateRoute = ({ children }) => {
    const { auth } = useSelector(state => state);
    /************* if user is not logged in, please, signin */
    useEffect(() => {
        if (!auth.loggedIn) {
            router.push('page-signin');
        }
    }, []);
    /************************************** */
    return (
        <>
            {children} 
        </>
    );
};

export default PrivateRoute;