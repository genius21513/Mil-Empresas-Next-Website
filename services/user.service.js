import getConfig from "next/config";
const baseURL = getConfig().publicRuntimeConfig.apiUrl;
import { authHeader, globalHeader, postHeader, handleResponse, messageHandleResponse } from "../utils/fetchUtil";

export const userService = {
    signin,
    signout,
    signup,
    getUserById,
    update,

    setFavourite,
    removeFavourite,
    addCompany,
    addUserCompany,
    saveCompany,
    removeCompany,
    removeUserCompany,
    uploadBase64,
    getCompanyById,
    sendMail,

    sendMailCodeRecoveryPassword,
    recoveryPassword,
};


/** Signin */
function signin(user) {
    const requestOptions = {
        method: 'POST',
        headers: {            
            ...globalHeader(),
            ...postHeader(user),            
        },
        // credentials: "same-origin",
        // credentials: "include",
        body: JSON.stringify(user),
    };

    return fetch(`${baseURL}signin`, requestOptions)
        .then(handleResponse);
}

/** Signout */
function signout(username) {    
    const requestOptions = {
        method: 'POST',
        headers: {
            ...globalHeader(),
            ...authHeader(),
            ...postHeader(username)
        },
        // credentials: "include",
        body: JSON.stringify(username)
    };

    return fetch(`${baseURL}signout`, requestOptions)
        .then(handleResponse);
}


/** Get user data */
function getUserById(id) {
    const requestOptions = {
        method: 'GET',
        // headers: headers,
        headers: {
            ...globalHeader(),
            ...authHeader(),
        },
    };

    return fetch(`${baseURL}users/getUser/${id}`, requestOptions)
            .then(handleResponse);
}

/** Signup */
function signup(user) {
    const requestOptions = {
        method: 'POST',
        headers: {
            ...globalHeader(),
            ...postHeader(user)
        },
        body: JSON.stringify(user)
    };

    return fetch(`${baseURL}signup`, requestOptions).then(handleResponse);
}


/** Update */
function update(user) {
    const requestOptions = {
        method: 'PATCH',
        headers: { 
            ...globalHeader(),
            ...authHeader(),
            ...postHeader(user) 
        },
        body: JSON.stringify(user)
    };

    return fetch(`${baseURL}users/userUpdate`, requestOptions).then(handleResponse);
}


/** Add company */
function addCompany(data) {
    const requestOptions = {
        method: 'POST',
        headers: {
            ...globalHeader(),
            ...authHeader(),
            ...postHeader(data)
        },
        body: JSON.stringify(data)
    };

    return fetch(`${baseURL}companies/addcompany`, requestOptions).then(handleResponse);
}

function addUserCompany(data) {
    const requestOptions = {
        method: 'POST',
        headers: {
            ...globalHeader(),
            ...authHeader(),
            ...postHeader(data)
        },
        body: JSON.stringify(data)
    };

    return fetch(`${baseURL}companies/UserCompany`, requestOptions).then(handleResponse);
}

/** Get company by id */
function getCompanyById(companyId) {
    const requestOptions = {
        method: 'GET',
        headers: { 
            ...globalHeader(),
            ...authHeader(),    
        }
    };

    return fetch(`${baseURL}companies/getCompany/${companyId}`, requestOptions).then(handleResponse);
}

/** Save company */
function saveCompany(data) {
    const requestOptions = {
        method: 'PATCH',
        headers: {
            ...globalHeader(),
            ...authHeader(),
            ...postHeader(data)
        },
        body: JSON.stringify(data)
    };

    return fetch(`${baseURL}companies/companyUpdate`, requestOptions).then(handleResponse);
}

/** Remove Company */
function removeCompany(companyId) {
    const requestOptions = {
        method: 'GET',
        headers: {
            ...globalHeader(),
            ...authHeader(),
        }
    };

    return fetch(`${baseURL}companies/removeCompany/${companyId}`, requestOptions)
        .then(res => res.json())
        .catch(err => err);
}


/** RemoveUserCompany */
function removeUserCompany(userId, companyId) {
    const requestOptions = {
        method: 'GET',
        headers: {
            ...globalHeader(),
            ...authHeader(),
        }
    };

    return fetch(`${baseURL}companies/removeUserCompany/${userId}/${companyId}`, requestOptions)
        .then(res => res.json())
        .catch(err => err);
}


// Async function to set favour or unfavour function.
async function setFavourite(cid, uid) {
    const data = {
        "id_user": uid,
        "id_company": cid
    };

    const requestOptions = {
        method: 'POST',
        headers: { 
            ...globalHeader(),
            ...authHeader(),  
            ...postHeader(data)
        },
        body: JSON.stringify(data)
    };

    return fetch(`${baseURL}favourites/addfavourite`, requestOptions)
        .then(handleResponse);
}

function removeFavourite(cid, uid) {
    const requestOptions = {
        method: 'GET',
        headers: { 
            ...globalHeader(),
            ...authHeader(),
        },
    };

    return fetch(`${baseURL}favourites/removeFavourite/${uid}/${cid}`, requestOptions)
        .then(res => res)
    // .then(handleResponse);
}

function sendMailCodeRecoveryPassword(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 
            ...globalHeader(),
            ...authHeader(),
            ...postHeader(user)
        },
        body: JSON.stringify(user)
    };

    return fetch(`${baseURL}sendMailCodeRecoveryPassword`, requestOptions)
            .then(messageHandleResponse);
}


function recoveryPassword(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 
            ...globalHeader(),
            ...postHeader(user)
        },
        body: JSON.stringify(user)
    };

    return fetch(`${baseURL}recoveryPassword`, requestOptions)
        .then(messageHandleResponse);
}


/** Image Upload imageBase64 */
function uploadBase64(data) {
    const requestOptions = {
        method: 'POST',
        headers: {
            ...globalHeader(),
            ...postHeader(data),
        },
        body: JSON.stringify(data)
    };

    return fetch(`${baseURL}image/uploadBase64`, requestOptions).then(handleResponse);
}

/** send email */
async function sendMail(data) {
    const requestOptions = {
        method: 'POST',
        headers: {
            ...globalHeader(),
            ...authHeader(),
            ...postHeader(data),
        },
        body: JSON.stringify(data)
    };

    return fetch(`${baseURL}users/postSendEmail`, requestOptions)
            .then(messageHandleResponse);
}

