import { useForm } from "react-hook-form"
import classes from '../SignUp/SignUp.module.scss'
import ApiSevice from '../../../apiSevice'
import React from "react";
import { connect } from "react-redux";
import * as actions from '../../../actions'
import {Link, Redirect} from "react-router-dom";

const apiRes = new ApiSevice;
const SignIn = ({ addUserInfo, authorized }) => {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const onSubmit = (data) => {
        apiRes.existingUser(data.EmailAddress, data.Password)
            .then((res) => {
                if (res.errors){
                    alert('Error in email or password')
                }else{
                    addUserInfo([res.user.username, res.user.email, data.Password, res.user.id, res.user.token, res.user.image, res.user.bio]);
                    {
                        let user = {
                            userUsername: res.user.username,
                            userImage: res.user.image,
                        }
                        localStorage.setItem('user', JSON.stringify(user))
                    }
                }
            });
    }



    return (
        authorized
            ? <Redirect to='/articles'/>
            : <div className={classes.main}>
            <h3>Sign Up</h3>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>


                <p>Email address</p>
                <input className={errors.EmailAddress ? classes.inputInputError : classes.inputInput} {...register("EmailAddress", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i })} placeholder='Email address'/>
                <p className={errors.EmailAddress ? classes.buttomErrorText : classes.buttomErrorTextDisabled}>Please insert real email address.</p>

                <p>Password</p>
                <input className={errors.Password ? classes.inputInputError : classes.inputInput} {...register("Password", { required: true, pattern: /^[a-z0-9_-]{6,40}$/ })} placeholder='Password'/>
                <p className={errors.Password ? classes.buttomErrorText : classes.buttomErrorTextDisabled}>Your password must contain from 6 to 40 characters.</p>

                <p className={classes.footerText}>Already have an account?
                    <Link to={`/sign-up`}>Sign Up.</Link>
                </p>
                <input className={classes.submit} type="submit" value='Create'/>
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
export default connect(mapStateToProps, actions)(SignIn);