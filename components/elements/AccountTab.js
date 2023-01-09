
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";

import { updateUser } from "../../redux/actions/user.actions";
import { Alert, userService } from "../../services";
import { getByteObjFromFile } from "../../utils/clientUtil";
import { updateUserFormResolver } from "../../utils/resolvers";
import { Images } from "../../public/assets/imgs/images";
import VInput from "./VInput";

const AccountTab = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const { user } = useSelector(state => state.user);
    const [avatar, setAvatar] = useState(null);

    const ref = useRef(null);
    const uploadToClient = async (event) => {
        const oj = await getByteObjFromFile(event);
        setAvatar(oj);
    };

    const [loading, setLoading] = useState(false);
    const { control, setValue, register, handleSubmit, reset, formState: { errors } } = useForm({
        ...updateUserFormResolver,
        defaultValues: { username: "", password: "", confirm_password: "" }
    });

    const onSubmit = async (data) => {
        setLoading(true);
        // send data.        
        const { password } = data;
        const sdata = { password, username: user.username, email: user.email };

        // if (avatar) {
        //     userService.uploadBase64(avatar)
        //         .then(res => {
        //             xdata.image_id = res.id;
        //         })
        //         .catch( err => Alert.error() );
        // }

        dispatch(updateUser(sdata));
    }

    useEffect(() => {
        if (!user) return;
        clearImage();
        reset();
        setLoading(false);
        router.push('/page-auth-profile');
    }, [user])

    const clearImage = () => {
        ref.current.value = '';
        setAvatar(null);
    }

    useEffect(() => {
        if (user) {
            setValue('username', user.username);
        }
    });



    return (
        <div className="profile-content">
            <div className="mt-35 mb-40 box-info-profie">
                <div className="image-profile">
                    {
                        (user && user.image) ?
                            <img src={`data:${user.image.type};base64,${user.image.imageBase64}`} alt="milempresas.es" /> :
                            <img src='/assets/imgs/avatar/avatar_128x.png' alt="milempresas.es" />
                    }
                </div>
                {
                    avatar && <img className="image-profile" src={`data:image;base64,${avatar.imageBase64}`} alt="milempresas.es" />
                }
                <input className="hidden" type="file" name="myImage" onChange={uploadToClient} ref={ref} />
                <a className="btn btn-apply" onClick={() => { ref.current.click() }}>Upload Avatar</a>
                <a className="btn btn-link" onClick={clearImage}>Delete</a>
            </div>
            <div className="row form-contact">
                <div className="col-lg-6 col-md-12">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* <Controller
                            render={({ field }) =>
                                <VInput
                                    label='User Name *'
                                    placeholder='User Name'
                                    error={errors?.username}
                                    {...field}
                                />
                            }
                            name="username"
                            control={control}
                        /> */}

                        <div className="form-group">
                            <label className="form-label"> User Name </label>
                            <input className="form-control" defaultValue={user && user.username} disabled readOnly />
                        </div>

                        <div className="form-group">
                            <label className="form-label"> Email </label>
                            <input className="form-control" defaultValue={user && user.email} disabled readOnly />
                        </div>

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
                        <div className="border-bottom pt-10 pb-10" />
                        <div className="box-button mt-15">
                            <button disabled={loading && 'disabled'} className="btn btn-apply-big font-md font-bold" type="submit">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AccountTab;

