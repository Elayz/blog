import { useForm } from "react-hook-form"
import classes from './SignUp.module.scss'
import React from "react";
import { connect } from "react-redux";
import * as actions from '../../../actions'

const SignUp = ({ formPassMatchFail, formPassMatchSuccess, formPassMatchError }) => {
    let pass1;
    let pass2;
    const { register, handleSubmit, watch, getValues, formState: { errors } } = useForm()
    console.log(errors)
    const onSubmit = (data) => console.log(data)
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
        <div className={classes.main}>
            <h3>Create new account</h3>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>

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

                <input className={classes.submit} type="submit" value='Create'/>
            </form>
        </div>
    )
}
const mapStateToProps = (state) => {     //для переменных из стейт
    return {
        formPassMatchError: state.formPassMatchError,
    }
}
export default connect(mapStateToProps, actions)(SignUp);