import cookie from "js-cookie";

export const token_name = "bezkoder";
export const server_token = "server_token";
export const client_token = "client_token";
export const secret = 'secret';

export const setCookie = (key, value) => {
    if (typeof window !== "undefined") {
        cookie.set(key, value, {
            expires: 1,
            path: "/"
        });
    }
};

export const removeCookie = (key) => {
    if (typeof window !== "undefined") {
        cookie.remove(key, {
            expires: 1
        });
    }
};

export const getCookie = (key, req) => {
    return typeof window !== "undefined"
        ? getCookieFromBrowser(key)
        : getCookieFromServer(key, req);
};

export const getCookieFromBrowser = (key) => {
    return cookie.get(key);
};

export const getCookieFromServer = (key, req) => {    
    if (!req.headers.cookie) {
        return undefined;
    }
    const rawCookie = req.headers.cookie
        .split(";")
        .find((c) => c.trim().startsWith(`${key}=`));

    if (!rawCookie) {
        return undefined;
    }
    return rawCookie.split("=")[1];
};

/*** get token from response body using key */
export const getTokenFromCookie = (key, cookie) => {
    const rawCookie = cookie
        .split(";")
        .find((c) => c.trim().startsWith(`${key}=`));
    if (!rawCookie) {
        return undefined;
    }
    return rawCookie.split("=")[1];
}
