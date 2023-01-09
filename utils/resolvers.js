import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export const getCodeFormResolver = {
    resolver:
        yupResolver(Yup.object().shape({
            username: Yup.string().required('Username is required')
                .max(20, 'Username must be at maximum 20 characters.'),
        }))
}


export const signInFormResolver = {
    resolver:
        yupResolver(Yup.object().shape({
            username: Yup.string().required('Username is required')
                .max(20, 'Username must be at maximum 20 characters.'),
            password: Yup.string().required('Password is required')
                .transform(x => x === '' ? undefined : x)
                .concat(Yup.string().required('Password is required.'))
                .min(6, 'Password must be at least 6 characters.')
                .max(40, 'Password must be at maximum 40 characters.'),
        }))
}

export const signUpFormResolver = {
    resolver:
        yupResolver(Yup.object().shape({
            username: Yup.string().required('Name is required.')
                .max(20, 'Username must be at maximum 20 characters.'),
            email: Yup.string().required('Email is required.')
                .email('Email type is incorrect.')
                .max(50, 'Email must be at maximum 50 characters.'),
            password: Yup.string().transform(x => x === '' ? undefined : x)
                .concat(Yup.string().required('Password is required.'))
                .min(6, 'Password must be at least 6 characters.')
                .max(40, 'Password must be at maximum 40 characters.'),
            confirm_password: Yup.string()
                .required('Password is required.')
                .oneOf([Yup.ref('password'), null], 'Passwords must match.'),
        }))

}


export const resetPasswordFormResolver = {
    resolver:
        yupResolver(Yup.object().shape({
            username: Yup.string().required('Name is required.')
                .max(20, 'Username must be at maximum 20 characters.'),
            code: Yup.string().required('Code is required.'),
            password: Yup.string().transform(x => x === '' ? undefined : x)
                .concat(Yup.string().required('Password is required.'))
                .min(6, 'Password must be at least 6 characters.')
                .max(40, 'Password must be at maximum 40 characters.'),
            confirm_password: Yup.string()
                .required('Password is required.')
                .oneOf([Yup.ref('password'), null], 'Passwords must match.'),
        }))

}



export const updateUserFormResolver = {
    resolver:
        yupResolver(Yup.object().shape({
            username: Yup.string().required('Name is required.')
                .max(20, 'Username must be at maximum 20 characters.'),
            password: Yup.string().transform(x => x === '' ? undefined : x)
                .concat(Yup.string().required('Password is required.'))
                .min(6, 'Password must be at least 6 characters.')
                .max(40, 'Password must be at maximum 40 characters.'),
            confirm_password: Yup.string()
                .required('Password is required.')
                .oneOf([Yup.ref('password'), null], 'Passwords must match.'),
        }))

}


export const addCompanyFormResolver = {
    resolver:
        yupResolver(Yup.object().shape({
            name: Yup.string()
                .required('Name is required.')
                .min(18, 'Minimal length 18.')
                .max(40, 'Maximum length 40.'),
            email: Yup.string()
                .email('Email type is incorrect.')
                .required('Email is required.')
                .max(50, 'Email must be at maximum 50 characters.'),
            address: Yup.string()
                .required('Address is required.'),
            phone: Yup.string()
                .required('Phone is required.'),
            imageCompany: Yup.mixed()
                .nullable()
                .notRequired()
                .test("FILE_FORMAT", "Uploaded file has unsupported format.",
                    value => value || (value && value.type && !value.type.match(/image\/(png|jpg|jpeg)/i))),
            description: Yup.string()
                .required('Description is required.')
                .min(100, 'Minimal length 100.')
                .max(255, 'Maximum length 255.'),
        }))
}



export const contactFormResolver = {
    resolver:
        yupResolver(Yup.object().shape({
            name: Yup.string()
                .required('Name is required.'),
            // .min(10, 'Minimal length 10.'),            
            company: Yup.string()
                .required('Company is required.'),
            phone: Yup.string()
                .required('Phone is required.')
                .max(20, 'Exceed phone maximum length 20.'),
            email: Yup.string()
                .email('Email type is incorrect.')
                .required('Email is required.'),
            description: Yup.string()
                .required('Description is required.')
            // .min(100, 'Minimal length 100.')
            // .max(255, 'Maximum length 255.'),
        }))
}