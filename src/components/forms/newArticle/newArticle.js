import { useForm } from "react-hook-form"
import ApiSevice from '../../../apiSevice'
import classes from './newArticle.module.scss'
import React from "react";
import { connect } from "react-redux";
import * as actions from '../../../actions'
import {addToTagList} from "../../../actions";

const apiRes = new ApiSevice;

const NewArticle = ({ deleteTagFromTagList, articleTagInputValue, newArticleTagInputValue, tagList, addToTagList, dataToState }) => {
    let idx = -1;
    const userStorage = JSON.parse(localStorage.getItem('user'));
    const { register, handleSubmit, formState: { errors } } = useForm()
    const deleteTag = (e) => {
        deleteTagFromTagList(e.target.id);
    }
    const onSubmit = (data) => {
        apiRes.createNewArticle(data.Title, data.description, data.Text, tagList, userStorage.userToken)
            .then((res) => {
                apiRes.getRes(1, userStorage.userToken)
                    .then((res) => {
                        dataToState(res)
                    })
            })
    }
    const onChange = (a) => {
        if (a.target.value !== ''){
            articleTagInputValue(a.target.value)
        }

    }
    const addTagToTagList = (a) => {
        if (newArticleTagInputValue !== ''){
            addToTagList(a)
        }
    }
    const tagsElements = tagList.map((item) => {
        idx++
        return (
            <div
                key={Math.floor(Math.random() * 10000)}
            >
                <input className={classes.inputInput} readOnly value={item}/>
                <span onClick={deleteTag} id={idx} className={classes.delete}>Delete</span>
            </div>)
    })


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
                    <div className={classes.tagList}>
                        {tagsElements}
                    </div>
                    <div className={classes.footer}>
                        <input className={errors.tags ? classes.inputInputError : classes.inputInput} {...register("tags", { })} onChange={onChange} placeholder='Tag'/>
                        <span className={classes.delete}>Delete</span>
                        <span onClick={addTagToTagList} className={classes.add}>Add tag</span>
                    </div>
                    <input className={classes.submit} type="submit" value='Send'/>


                </form>
            </div>
    )
}
const mapStateToProps = (state) => {     //для переменных из стейт
    return {
        newArticleTagInputValue: state.newArticleTagInputValue,
        tagList: state.tagList,
    }
}
export default connect(mapStateToProps, actions)(NewArticle);