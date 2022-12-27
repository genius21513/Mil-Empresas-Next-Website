// pages/_document.js

import { Html, Head, Main, NextScript } from "next/document";

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

export default function Document() {
    return (
        <Html>
            <Head>
                {/* <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta> */}
                <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;800&display=swap" rel="stylesheet" />
            </Head>
            <body>
                <Main />                
                <NextScript />
            </body>
        </Html>
    );
}
