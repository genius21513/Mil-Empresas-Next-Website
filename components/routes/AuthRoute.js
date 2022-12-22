import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../layouts/Layout';

const AuthRoute = ({ children }) => {
    const { auth } = useSelector(state => state);
    const router = useRouter();
    
    /************* if user is not logged in, please, signin */
    useEffect(() => {
        if (auth.loggedIn) {
            router.push('/');
        }
    }, []);
    /************************************** */
    return (
        <>
            {children} 
        </>
    );
};

export default AuthRoute;