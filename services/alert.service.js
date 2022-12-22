import { toast } from 'react-toastify';

export const Alert = {
    success,
    error,
    info,      
};

const defaultConfig = {
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    position: "top-right",
    theme: "light",
}

function success(message = 'Successful Operation.') {
    toast.success(<>{message}</>, {
        ...defaultConfig,
        autoClose: 800,
    });

    return new Promise(res => {
       setTimeout(() => res(true), 500);
    });
}

function error(message = 'Sorry, failed operation.') {
    toast.error(<>{message}</>, {
        ...defaultConfig,
        autoClose: 1000,
    });
    return new Promise(res => {
        setTimeout(() => res(true), 100);
     });
}

function info(message = 'Please, check information.') {
    toast.info(<>{message}</>, {
        ...defaultConfig,
        autoClose: 1000,
    });
    return new Promise(res => {
        setTimeout(() => res(true), 100);
    });
}
