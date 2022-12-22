import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';

const HeaderActiveLink = ({ link }) => {
    const router = useRouter();
    const currentRoute = router.pathname;

    return (
        <Link href={link.path}>
            <a className={`${currentRoute == link.path? 'active': ''}`}>
                {link.text}
            </a>
        </Link>
    )
}

export default HeaderActiveLink;