/* eslint-disable @next/next/no-html-link-for-pages */
import Link from 'next/link';
import React from 'react';
import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import HeaderActiveLink from '../elements/HeaderActiveLink';
import { signout } from '../../redux/actions/user.actions';
import { ProfileUserName } from '../../utils/formatter';

const HeaderLinks = [
    {
        path: '/',
        text: 'Home'
    },
    {
        path: '/page-find-company',
        text: 'Find a Company'
    },
    {
        path: '/page-about',
        text: 'About Us'
    },
    {
        path: '/page-contact',
        text: 'Contact Us'
    },
];

const Header = ({handleOpen, handleRemove, openClass}) => {
    const dispatch = useDispatch();
    const { loggedIn, auth } = useSelector( state => state.auth );
    const [ scroll, setScroll ]  = useState(0);    

    useEffect(() => {
        document.addEventListener("scroll", () => {
          const scrollCheck = window.scrollY > 100
          if (scrollCheck !== scroll) {
            setScroll(scrollCheck)
          }
        })
    })
    
    const handleSignout = (e) => {
        dispatch(signout(auth.name));
    }
    
    // useEffect(() => {
    //     if(auth?.operation && auth.operation === 'success') {
    //         setWaiting(false);
    //     }
    // }, [auth.operation])

    return (
        <>
            <header className={scroll ? "header sticky-bar stick" : "header sticky-bar"}>
                <div className="container">
                    <div className="main-header">
                        <div className="header-left">
                            <div className="header-logo">
                            <Link href="/"><a className="d-flex"><img alt="milempresas.es" src="assets/imgs/template/logo.jpg" /></a></Link>
                            </div>
                        </div>
                        <div className="header-nav">
                            <nav className="nav-main-menu">
                                <ul className="main-menu">
                                    {
                                        HeaderLinks.map((link, idx) =>
                                            <li key={idx}>                                                
                                                <HeaderActiveLink link={link} />
                                            </li>
                                        )
                                    }                                    
                                </ul>
                            </nav>
                            <div className={`burger-icon burger-icon-white ${openClass && "burger-close"}`} 
                            onClick={()=>{handleOpen(); handleRemove()}}>
                                <span className="burger-icon-top" /><span className="burger-icon-mid" /><span className="burger-icon-bottom" /></div>
                        </div>
                        <div className="header-right">
                            <div className="block-signin">
                                {
                                    auth?
                                        <>
                                            <a className='cursor-pointer text-link-bd-btom hover-up' onClick={() => handleSignout()}> Sign Out</a>
                                            <Link href="/page-auth-profile">
                                                <a className="btn btn-default btn-shadow ml-40 hover-up"> {ProfileUserName(auth && auth.name)} </a>
                                            </Link>
                                        </>
                                    :
                                        <>
                                            <Link href="/page-signup"><a className="text-link-bd-btom hover-up">Sign up</a></Link>
                                            <Link href="/page-signin"><a className="btn btn-default btn-shadow ml-40 hover-up">Sign in</a></Link>
                                        </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;