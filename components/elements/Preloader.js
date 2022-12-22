/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { BounceLoader } from 'react-spinners';

const Preloader = ({ show = false }) => {
    return (
        <>
            {
            show && <div className="loading-spinner h-full">
                <BounceLoader color="#36d7b7" />
            </div>
            }
        </>
    );
};

export default Preloader;