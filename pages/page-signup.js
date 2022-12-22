import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Preloader from "../components/elements/Preloader";
import VInput from "../components/elements/VInput";
import Layout from "../components/layouts/Layout";
import { Alert, userService } from "../services";
import { signUpFormResolver } from "../utils/resolvers";
import { getByteObjFromFile } from "../utils/clientUtil";
import AuthRoute from "../components/routes/AuthRoute";

export default function Signup() {
    const router = useRouter();
    const [waiting, setWaiting] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const { control, register, handleSubmit, reset, formState: { errors } } = useForm({
        ...signUpFormResolver,
        defaultValues: { username: "", email: "", password: "", confirm_password: "" }
    });


    const onSubmit = async (data) => {
        setWaiting(true);
        const user = { ...data };

        //uploadImage to server.
        if (avatar) {
            await userService.uploadBase64(avatar)
                .then(res => { user.image = { id: res.id }; })
                .catch(err => err);
        }

        await userService.signup(user)
            .then(data => {
                setWaiting(false);
                Alert.success('Registeration success.').then(b => {
                    router.push('/page-signin')
                });
            },
                error => {
                    setWaiting(false);
                    Alert.error('User information is not correct. Please, fix them and try again.');
                }
            );
    }

    const uploadToClient = async (event) => {
        const obj = await getByteObjFromFile(event);
        setAvatar(obj);
    }

    return (
        <AuthRoute>
            <Layout>
                <Preloader show={waiting} />
                <section className="pt-25 login-register">
                    <div className="container">
                        <div className="row login-register-cover">
                            <div className="col-lg-4 col-md-6 col-sm-12 mx-auto">
                                <div className="text-center">
                                    <p className="font-sm text-brand-2">Register </p>
                                    <h2 className="mt-10 mb-5 text-brand-1">Sign up</h2>
                                    <p className="font-sm text-muted mb-30">You can sign up at here.</p>
                                </div>
                                <form className="login-register text-start mt-20" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col-3">
                                                {avatar ?
                                                    <img src={`data:image;base64,${avatar.imageBase64}`} alt="milempresas.es" /> :
                                                    <img src='/assets/imgs/avatar/avatar_128x.png' alt="milempresas.es" />
                                                }
                                            </div>
                                            <div className="col-9 d-flex align-items-center">
                                                <input className="form-control mb-10 image-select" type="file" name="myImage" onChange={uploadToClient} />
                                            </div>
                                        </div>
                                    </div>

                                    <Controller
                                        render={({ field }) =>
                                            <VInput
                                                label='User Name *'
                                                placeholder='User Name'
                                                maxLength={20}
                                                error={errors?.username}
                                                {...field}
                                            />
                                        }
                                        name="username"
                                        control={control}
                                    />
                                    <Controller
                                        render={({ field }) =>
                                            <VInput
                                                label='Email *'
                                                placeholder='Email'
                                                maxLength={50}
                                                error={errors.email}
                                                {...field}
                                            />
                                        }
                                        name="email"
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
                                    <Controller
                                        render={({ field }) =>
                                            <VInput
                                                label='Re Password *'
                                                placeholder='Re Password'
                                                error={errors.confirm_password}
                                                type="password"
                                                {...field}
                                            />
                                        }
                                        name="confirm_password"
                                        control={control}
                                    />
                                    {/* <div className="mt-10">Register password length 6 ~ 20.</div> */}
                                    <div className="form-group mt-30">
                                        <button disabled={waiting} className="btn btn-brand-1 hover-up w-100" type="submit" name="login">
                                            Sign up
                                        </button>
                                    </div>
                                    <div className="text-muted text-center">
                                        Already have an account?
                                        <Link href="/page-signin">
                                            <a> Sign in</a>
                                        </Link>
                                    </div>
                                </form>
                            </div>
                            <div className="img-1 d-none d-lg-block">
                                <img className="shape-1" src="assets/imgs/page/login-register/img-1.svg" alt="milempresas.es" />
                            </div>
                            <div className="img-2">
                                <img src="assets/imgs/page/login-register/img-2.svg" alt="milempresas.es" />
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </AuthRoute>
    );
}
