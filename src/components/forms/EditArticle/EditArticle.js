import { useForm } from "react-hook-form"
import ApiSevice from '../../../apiSevice'
import classes from './EditArticle.module.scss'
import React from "react";
import { connect } from "react-redux";
import * as actions from '../../../actions'

const apiRes = new ApiSevice;
let addTags = false;


const EditArticle = ({ deleteTagFromTagList, editArticle, editArticleTagList, dataForEditArticle, articleTagInputValue, newArticleTagInputValue, tagList, addToTagList, dataToState }) => {
    let idx = -1;
    let copyDataForEditArticle = dataForEditArticle
    const deleteTag = (e) => {
        deleteTagFromTagList(e.target.id);
    }
    const titleChange = (e) => {
        copyDataForEditArticle.title = e.target.value
        editArticle(copyDataForEditArticle)
    }
    const bodyChange = (e) => {
        copyDataForEditArticle.body = e.target.value
        editArticle(copyDataForEditArticle)
    }
    const descriptionChange = (e) => {
        copyDataForEditArticle.description = e.target.value
        editArticle(copyDataForEditArticle)
    }
    if(!addTags){
        setTimeout(() => {
            editArticleTagList(dataForEditArticle.tagList);
            addTags = true;
        }, 0)
    }
    const userStorage = JSON.parse(localStorage.getItem('user'));
    const { register, handleSubmit, formState: { errors } } = useForm()
    const onSubmit = (data) => {
        apiRes.updateAnArticle(data.Title, data.description, data.Text, tagList, userStorage.userToken, dataForEditArticle.slug)
            .then((res) => {
                apiRes.getRes(1, userStorage.userToken)
                    .then((res) => {
                        dataToState(res);
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
            <h3>Edit article</h3>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>

                <p>Title</p>
                <input className={errors.Title ? classes.inputInputError : classes.inputInput} {...register("Title", { required: true })} placeholder='Title' value={copyDataForEditArticle.title} onChange={titleChange}/>

                <p>Short description</p>
                <input className={errors.description ? classes.inputInputError : classes.inputInput} {...register("description", { required: true })} placeholder='Title' value={dataForEditArticle.description} onChange={descriptionChange}/>

                <p>Text</p>
                <textarea className={errors.Text ? classes.texAreaError : classes.texArea} {...register("Text", { required: true })} placeholder='Text' value={dataForEditArticle.body} onChange={bodyChange}/>

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
        dataForEditArticle: state.dataForEditArticle,
        state: state,
    }
}
export default connect(mapStateToProps, actions)(EditArticle);