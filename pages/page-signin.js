/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";

import Layout from "../components/layouts/Layout";
import { signin } from "../redux/actions/user.actions";
import { signInFormResolver } from "../utils/resolvers";
import VInput from "../components/elements/VInput";
import Preloader from "../components/elements/Preloader";
import AuthRoute from "../components/routes/AuthRoute";

const Signin = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [ waiting, setWaiting ] = useState(false);
    const { loggedIn, auth } = useSelector(state => state.auth);
    // const data = useSelector(s => s.data);
    // console.log('----------------signin: ', data);

    const { control, handleSubmit, formState : { errors } } = useForm({
        ...signInFormResolver,
        defaultValues: { username: "", password: "" }
    });

    const onSubmit = async (data) => {
        setWaiting(true);        
        dispatch(signin(data));        
    }

    useEffect(() => {
        if(auth?.operation && auth?.operation === 'success')
        {
            setWaiting(false);
            router.push('page-auth-profile');
        }
    }, [auth?.operation]);

    return (
        <AuthRoute>
            <Layout>
                <Preloader show={waiting} />
                <section className="pt-25 login-register">
                    <div className="container">
                        <div className="row login-register-cover">
                            <div className="col-lg-4 col-md-6 col-sm-12 mx-auto">
                                <div className="text-center">
                                    <p className="font-sm text-brand-2">Welcome back! </p>
                                    <h2 className="mt-10 mb-5 text-brand-1">Member Signin</h2>
                                    <p className="font-sm text-muted mb-30">Access to all features. No credit card required.</p>
                                </div>
                                <form className="login-register text-start mt-20" onSubmit={handleSubmit(onSubmit)}>
                                    <Controller
                                        render={({ field }) =>                                         
                                            <VInput
                                                label='User Name *'
                                                placeholder='User Name'
                                                error={errors.username}                                                
                                                {...field}
                                            />
                                        }
                                        name="username"
                                        control={control}
                                    />

                                    <Controller
                                        render={({ field }) =>                                         
                                            <VInput
                                                label='Password *'
                                                placeholder='Password'
                                                error={errors.password}
                                                type="password"
                                                {...field}
                                            />
                                        }
                                        name="password"
                                        control={control}
                                    />

                                    <div className="login_footer form-group d-flex justify-content-between">
                                        {/* <label className="cb-container">
                                            <input type="checkbox" />
                                            <span className="text-small">Remenber me</span>
                                            <span className="checkmark" />
                                        </label> */}
                                        <Link href="/page-reset-password">
                                            <a>Reset Password</a>
                                        </Link>
                                    </div>                             
                                    <div className="form-group">
                                        <button disabled={waiting} className="btn btn-brand-1 hover-up w-100" name="login">
                                            Sign
                                        </button>
                                    </div>
                                    <div className="text-muted text-center">
                                        Don't have an Account?
                                        <Link href="/page-signup">
                                            <a> Sign up</a>
                                        </Link>
                                    </div>
                                </form>
                            </div>
                            <div className="img-1 d-none d-lg-block">
                                <img className="shape-1" src="assets/imgs/page/login-register/img-4.svg" alt="milempresas.es" />
                            </div>
                            <div className="img-2">
                                <img src="assets/imgs/page/login-register/img-3.svg" alt="milempresas.es" />
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </AuthRoute>
    );
}

export default Signin;
