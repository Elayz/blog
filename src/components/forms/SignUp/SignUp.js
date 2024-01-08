import { useForm } from "react-hook-form"
import classes from './SignUp.module.scss'
import ApiSevice from '../../../apiSevice'
import React from "react";
import { connect } from "react-redux";
import * as actions from '../../../actions'
import {Link, Redirect} from "react-router-dom";


const SignUp = ({ authorized, formPassMatchFail, formPassMatchSuccess, formPassMatchError, addUserInfo, userId, userEmail, userUsername, userImage, userPassword, userToken, userBio}) => {
    const userStorage = JSON.parse(localStorage.getItem('authorized'));
    const apiRes = new ApiSevice;
    let pass1;
    let pass2;
    const newUserFoo = ({ Username, EmailAddress, Password }) => {
        apiRes.newUser(Username, EmailAddress, Password)
            .then((res) => {
                console.log(res)
                if (res.user === undefined) {
                    alert("Sorry, but this username or email is already registered")
                } else {
                    addUserInfo([res.user.username, res.user.email, Password, res.user.id, res.user.token, res.user.image, res.user.bio]);
                    {
                        let user = {
                            userUsername: res.user.username,
                            userImage: res.user.image,
                            userEmail: res.user.email,
                            userPassword: Password,
                            userToken: res.user.token,
                            userBio: res.user.bio

                        }
                        localStorage.setItem('user', JSON.stringify(user))
                        localStorage.setItem('authorized', true)
                    }
                }
            })
            .catch(() => {
            })
    }
    const { register, handleSubmit, formState: { errors } } = useForm()
    const validateCheck1 = (value) => {
        pass1 = value;
    }
    const validateCheck2 = (value) => {
        pass2 = value;
        if(pass1 !== pass2){
            formPassMatchFail()
        }else if (pass1 === pass2){
            formPassMatchSuccess()
        }
    }


    return (
        userStorage
            ? <Redirect to='/articles'/>
            : <div className={classes.main}>
                <h3>Create new account</h3>
                <form className={classes.form} onSubmit={handleSubmit(newUserFoo)}>

                    <p>Username</p>
                    <input className={errors.Username ? classes.inputInputError : classes.inputInput} {...register("Username", { required: true, pattern: /^[a-z0-9_-]{3,20}$/ })} placeholder='Username'/>
                    <p className={errors.Username ? classes.buttomErrorText : classes.buttomErrorTextDisabled}>Your username must contain from 3 to 20 characters.</p>

                    <p>Email address</p>
                    <input className={errors.EmailAddress ? classes.inputInputError : classes.inputInput} {...register("EmailAddress", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i })} placeholder='Email address'/>
                    <p className={errors.EmailAddress ? classes.buttomErrorText : classes.buttomErrorTextDisabled}>Please insert real email address.</p>

                    <p>Password</p>
                    <input className={errors.Password ? classes.inputInputError : classes.inputInput} {...register("Password", { required: true, validate: validateCheck1, pattern: /^[a-z0-9_-]{6,40}$/ })} placeholder='Password'/>
                    <p className={errors.Password ? classes.buttomErrorText : classes.buttomErrorTextDisabled}>Your password must contain from 6 to 40 characters.</p>

                    <p>Repeat Password</p>
                    <input className={ formPassMatchError ? classes.inputInputError : classes.inputInput} {...register("RepeatPassword", { required: true, validate: validateCheck2 })} placeholder='Repeat Password' />
                    <p className={formPassMatchError ? classes.buttomErrorText : classes.buttomErrorTextDisabled}>Passwords must match.</p>

                    <input type="checkbox" id="myCheckbox" className={classes['styled-checkbox']} {...register("check", { required: true })}/>
                    <label className={errors.check ? classes.checkboxError : classes.checkbox} htmlFor="myCheckbox">I agree to the processing of my personal information</label>

                    <input
                        className={classes.submit}
                        type="submit"
                        value='Create'/>

                    <p className={classes.footerText}>Already have an account?
                        <Link to={`/sign-in`}>Sign In.</Link>
                    </p>
                </form>
            </div>

    )
}
const mapStateToProps = (state) => {     //для переменных из стейт
    return {
        formPassMatchError: state.formPassMatchError,
        userId: state.userId,
        userEmail: state.userEmail,
        userUsername: state.userUsername,
        userPassword: state.userPassword,
        userToken: state.userToken,
        userBio: state.userBio,
        userImage: state.userImage,
        authorized: state.authorized
    }
}
export default connect(mapStateToProps, actions)(SignUp);