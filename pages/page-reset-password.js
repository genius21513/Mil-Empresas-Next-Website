/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

import { useForm, Controller } from "react-hook-form";
import Layout from "../components/layouts/Layout";
import VInput from "../components/elements/VInput";
import { getCodeFormResolver, resetPasswordFormResolver } from "../utils/resolvers";
import { Alert, userService } from "../services";
import AuthRoute from "../components/routes/AuthRoute";

export default function Reset() {
    const router = useRouter();
    
    const [ waiting, setWaiting ] = useState(false);
    const [ step, setStep ] = useState(0);

    const { control, handleSubmit, formState : { errors }, reset } = useForm({
        ...getCodeFormResolver,
        defaultValues: { username: "" }
    });

    const { control: control2, handleSubmit: handleSubmit2, formState : { errors: errors2 }, reset: reset2 } = useForm({
        ...resetPasswordFormResolver,
        defaultValues: { username: "", password: "", confirm_password: "", code: "" }
    });

    const _onSubmit = (user) => {
        setWaiting(true);
        userService.sendMailCodeRecoveryPassword(user)
            .then( 
                res => {
                    Alert.success('Success, Please, check your email.');
                    setStep(1); setWaiting(false);
                },
                error => { Alert.error(); setWaiting(false); }
            )
    }

    const _onSubmit2 = (user) => {
        setWaiting(true);
        userService.recoveryPassword(user)
            .then( 
                res => {
                    Alert.success();
                    setWaiting(false);
                    setTimeout(() => router.push('/page-signin') , 1500);
                },
                error => { Alert.error(); setWaiting(false); }
            )
    }

    return (
        <AuthRoute>
            <Layout>
                <section className="pt-100 login-register">
                    <div className="container">
                        <div className="row login-register-cover">
                            <div className="col-lg-4 col-md-6 col-sm-12 mx-auto">
                                <div className="text-center">
                                    <p className="font-sm text-brand-2">Forgot Password</p>
                                    <h2 className="mt-10 mb-5 text-brand-1">Reset Your Password</h2>
                                    <p className="font-sm text-muted mb-30">Enter Your account name and we'll send you a code to reset your password</p>
                                </div>
                                {
                                    step == 0 && 
                                    <form className="login-register text-start mt-20" onSubmit={handleSubmit(_onSubmit)}>
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

                                        <div className="form-group">
                                            <button disabled={waiting} className="btn btn-brand-1 hover-up w-100" type="submit">
                                                Continue
                                            </button>
                                        </div>

                                        <div className="text-muted text-center">
                                            Don't have an Account?
                                            <Link href="/page-signup">
                                                <a> Sign up</a>
                                            </Link>
                                        </div>
                                    </form>
                                }

                                {
                                    step == 1 && 
                                    <form className="login-register text-start mt-20" onSubmit={handleSubmit2(_onSubmit2)}>
                                        <Controller
                                            render={({ field }) =>
                                                <VInput
                                                    label='Code *'
                                                    placeholder='Code'
                                                    error={errors2.code}
                                                    {...field}
                                                />
                                            }
                                            name="code"
                                            control={control2}
                                        />

                                        <Controller
                                            render={({ field }) =>
                                                <VInput
                                                    label='User Name *'
                                                    placeholder='User Name'
                                                    error={errors2.username}
                                                    {...field}
                                                />
                                            }
                                            name="username"
                                            control={control2}
                                        />

                                        <Controller
                                            render={({ field }) =>
                                                <VInput
                                                    label='Password *'
                                                    placeholder='Password'
                                                    error={errors2.password}
                                                    type="password"
                                                    {...field}
                                                />
                                            }
                                            name="password"
                                            control={control2}
                                        />

                                        <Controller
                                            render={({ field }) =>
                                                <VInput
                                                    label='Re Password *'
                                                    placeholder='Re Password'
                                                    error={errors2.confirm_password}
                                                    type="password"
                                                    {...field}
                                                />
                                            }
                                            name="confirm_password"
                                            control={control2}
                                        />

                                        <div className="form-group">
                                            <button disabled={waiting} className="btn btn-brand-1 hover-up w-100" type="submit">
                                                Save
                                            </button>
                                        </div>

                                        <div className="text-muted text-center">
                                            Don't have an Account?
                                            <Link href="/page-signup">
                                                <a> Sign up</a>
                                            </Link>
                                        </div>
                                    </form>
                                }
                            </div>
                            <div className="img-1 d-none d-lg-block">
                                <img className="shape-1" src="assets/imgs/page/login-register/img-5.svg" alt="milempresas.es" />
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
