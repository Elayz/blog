import { useForm } from "react-hook-form"
import classes from '../SignUp/SignUp.module.scss'
import ApiSevice from '../../../apiSevice'
import React from "react";
import { connect } from "react-redux";
import * as actions from '../../../actions'
import {Link, Redirect} from "react-router-dom";
import {updateUserInfo} from "../../../actions";

const apiRes = new ApiSevice;
const EditProfile = ({ updateUserInfo }) => {
    const userStorage = JSON.parse(localStorage.getItem('user'));
    const { register, handleSubmit, formState: { errors } } = useForm()
    const onSubmit = (data) => {
        apiRes.updateUser(data.Username, data.EmailAddress, data.Password, userStorage.userToken, data.Avatar)
            .then((res) => {
                console.log(res)
                if(res.error){
                    alert('Error in email or password');
                }else{
                    let user = {
                        userUsername: res.user.username,
                        userImage: res.user.image,
                        userEmail: data.EmailAddress,
                        userPassword: data.Password,
                        userToken: res.user.token,
                        userBio: res.user.bio
                    };
                    localStorage.setItem('user', JSON.stringify(user));
                    updateUserInfo(
                        [
                            res.user.username,
                            data.EmailAddress,
                            data.Password,
                            res.user.image,
                        ]);
                }

            })
            .catch((error) => alert(`Error in email or password or: ${error}`));

    }



    return (
            <div className={classes.main}>
                <h3>Edit profile</h3>
                <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                    <p>Username</p>
                    <input className={errors.Username ? classes.inputInputError : classes.inputInput} {...register("Username", { required: true, pattern: /^[a-z0-9_-]{3,20}$/ })} placeholder='Username'/>
                    <p className={errors.Username ? classes.buttomErrorText : classes.buttomErrorTextDisabled}>Your username must contain from 3 to 20 characters.</p>

                    <p>Email address</p>
                    <input className={errors.EmailAddress ? classes.inputInputError : classes.inputInput} {...register("EmailAddress", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i })} placeholder='Email address'/>
                    <p className={errors.EmailAddress ? classes.buttomErrorText : classes.buttomErrorTextDisabled}>Please insert real email address.</p>

                    <p>Password</p>
                    <input className={errors.Password ? classes.inputInputError : classes.inputInput} {...register("Password", { required: true, pattern: /^[a-z0-9_-]{6,40}$/ })} placeholder='Password'/>
                    <p className={errors.Password ? classes.buttomErrorText : classes.buttomErrorTextDisabled}>Your password must contain from 6 to 40 characters.</p>

                    <p>Avatar image (url)</p>
                    <input className={errors.Avatar ? classes.inputInputError : classes.inputInput} {...register("Avatar", { required: true, pattern: /^(http|https):\/\/[^ "]+(\.jpg|\.jpeg|\.png|\.gif)$/gm })} placeholder='Avatar image'/>

                    <input className={classes.submit} type="submit" value='Save'/>
                </form>
            </div>
    )
}
const mapStateToProps = (state) => {     //для переменных из стейт
    return {
        formPassMatchError: state.formPassMatchError,
        authorized: state.authorized
    }
}
export default connect(mapStateToProps, actions)(EditProfile);