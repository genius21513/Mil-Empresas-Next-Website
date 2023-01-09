import * as cookieUtil from "./cookieUtil";

/***************************************************/
export const authHeader = () => {
    const token = cookieUtil.getCookie(cookieUtil.server_token, null);
    return {
        "server_cookie": token,
    }
}

export const postHeader = (data) => {
    return {
        'Content-Length': JSON.stringify(data).length
    }
}

export const globalHeader = (data) => {
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
}

export function handleResponse(response) {
    // console.log('handleResponse ------------', response);
    if (!response.ok) {
        // if (response.status === 401) {
        //     // auto logout if 401 response returned from api    
        //     logout();    
        //      return Promise.reject(response.statusText);
        // }
        const error = response.statusText;
        return Promise.reject(error);
    }

    return response.text().then(text => {
        return JSON.parse(text);
    })
}

export function messageHandleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }
    return response.text().then(text => text);
}


