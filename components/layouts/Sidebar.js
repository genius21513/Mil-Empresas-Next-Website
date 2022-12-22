import Link from "next/link";
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../../redux/actions/user.actions";

const Sidebar = ({ openClass }) => {
    const dispatch = useDispatch();   

    const { loggedIn, user } = useSelector(state =>  state.auth);
    // const [ isActive, setIsActive ] = useState({ status: false, key: "", });
    // const handleToggle = (key) => {
    //     if (isActive.key === key) {
    //         setIsActive({
    //             status: false,
    //         });
    //     } else {
    //         setIsActive({
    //             status: true,
    //             key,
    //         });
    //     }
    // };

    const handleSignout = () => {
        dispatch(signout(user.username));
    }

    return (
        <>
            <div className={`mobile-header-active mobile-header-wrapper-style perfect-scrollbar ${openClass}`}>
                <div className="mobile-header-wrapper-inner">
                    <div className="mobile-header-content-area">
                        <div className="perfect-scroll">                            
                            <div className="mobile-menu-wrap mobile-header-border">
                                {/* mobile menu start*/}
                                <nav>
                                    <ul className="mobile-menu font-heading">
                                        <li>
                                            <Link href="/"><a className="active">Home</a></Link>
                                        </li>
                                        <li>
                                            <Link href="/page-find-company"><a>Find a Company</a></Link>
                                        </li>
                                        <li>
                                            <Link href="/page-about"><a>About Us</a></Link>
                                        </li>
                                        <li>
                                            <Link href="/page-contact"><a>Contact Us</a></Link>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                            <div className="mobile-account">
                                <h6 className="mb-10">Your Account</h6>
                                <ul className="mobile-menu font-heading">                                    
                                    {
                                        loggedIn?
                                        (
                                            <>
                                            <li>
                                                <a className="cursor-pointer" onClick={ () => handleSignout() }>Sign Out</a>
                                            </li>
                                            <li>
                                                <Link href="/page-auth-profile"><a>Profile</a></Link>
                                            </li>
                                            </>
                                        ):
                                        (
                                            <>
                                            <li>
                                                <Link href="/page-signup"><a>Sign Up</a></Link>
                                            </li>
                                            <li>
                                                <Link href="/page-signin"><a>Sign In</a></Link>
                                            </li>
                                            </>
                                        )
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default Sidebar;