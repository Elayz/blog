import { useForm } from "react-hook-form"
import ApiSevice from '../../../apiSevice'
import classes from './newArticle.module.scss'

import React from "react";
import { connect } from "react-redux";
import * as actions from '../../../actions'
import { Link } from "react-router-dom";

const apiRes = new ApiSevice;

const NewArticle = () => {
    const userStorage = JSON.parse(localStorage.getItem('user'));
    const { register, handleSubmit, formState: { errors } } = useForm()
    const onSubmit = (data) => {
        console.log(data)
        apiRes.createNewArticle(data.Title, data.description, data.Text, '1', userStorage.userToken)
            .then((res) => console.log(res))
    }


    return (
            <div className={classes.main}>
                <h3>Create new article</h3>
                <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>

                    <p>Title</p>
                    <input className={errors.Title ? classes.inputInputError : classes.inputInput} {...register("Title", { required: true })} placeholder='Title'/>

                    <p>Short description</p>
                    <input className={errors.description ? classes.inputInputError : classes.inputInput} {...register("description", { required: true })} placeholder='Title'/>

                    <p>Text</p>
                    <textarea className={errors.Text ? classes.texAreaError : classes.texArea} {...register("Text", { required: true })} placeholder='Text'/>

                    <p>Tags</p>
                    <div className={classes.footer}>
                        <input className={errors.tags ? classes.inputInputError : classes.inputInput} {...register("tags", { })} placeholder='Title'/>
                        <button className={classes.delete}>Delete</button>
                        <button className={classes.add}>Add tag</button>
                    </div>
                    <input className={classes.submit} type="submit" value='Send'/>


                </form>
            </div>
    )
}
const mapStateToProps = (state) => {     //для переменных из стейт
    return {

    }
}
export default connect(mapStateToProps, actions)(NewArticle);