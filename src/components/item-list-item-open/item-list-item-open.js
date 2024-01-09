import React from 'react'
import classes from './item-list-item-open.module.scss'
import {connect} from "react-redux";
import * as actions from '../../actions'
import logo from '../item-list-item/imgs/Vector.svg';
import ApiSevice from "../../apiSevice";
import {editArticle, tapDel} from "../../actions";
import {Link} from "react-router-dom";

const apiRes = new ApiSevice();
const user = JSON.parse(localStorage.getItem('user'));

const ItemListItemOpen = ({ tapDelete, tapDel, dataToState, pageData, userUsername, editArticle, dataForEditArticle }) => {
    const deleteArticle = () => {
        apiRes.deleteAnArticle(user.userToken, pageData.slug)
            .then((res) => {
                apiRes.getRes(1, user.userToken)
                    .then((res) => {
                        tapDel()
                        dataToState(res)
                    })

            })
            .catch((er)=>{
                apiRes.getRes(1, user.userToken)
                    .then((res) => {
                        tapDel()
                        dataToState(res)
                    })
            })
    }
    const tapOnDelete = () =>{
        tapDel()
    }
    if (pageData !== null){
        setTimeout(() => {
            editArticle(pageData)
        }, 0)
        const { body, author, description, favoritesCount, tagList, title } = pageData
        const newBody = body.split('\\n')
        const elements = newBody.map((item) => (
            <div
            key={Math.floor(Math.random() * 10000)}>
                <span>{item}</span>
                <br/>
            </div>
        ));
        const tags = tagList.map((tag) => (
            <div key={Math.floor(Math.random() * 10000)}>
                <h5
                    className={classes.tag}
                >
                    {tag}
                </h5>
            </div>
        ));
        return (
            <div className={classes.prime}>
                <div className={classes.main}>
                    <div className={classes.textZone}>
                        <div className={classes.title}>
                            <h2>{title}</h2>
                            <div className={classes.likes}>
                                <img src={logo} alt="aGde"/>
                                <p className={classes.likesP}>{favoritesCount}</p>
                            </div>
                        </div>
                        <div className={classes.tagSection}>
                            {tags}
                        </div>
                        <p className={classes.overv}>
                            {description}
                        </p>
                    </div>
                    <div className={classes.userInfoZone}>
                        <div className={classes.nameZone}>
                            <div>
                                <h4 className={classes.authorName}>{author.username}</h4>
                                <h5 className={classes.authorDate}>March 5, 2020</h5>
                            </div>
                            <img className={classes.authorImage} src={author.image} alt="aGde"/>
                        </div>
                        {pageData.author.username === user.userUsername
                            ?<div className={classes.editDelete}>
                                {tapDelete
                                    ?<div className={classes.modalFrame}>
                                    <span>Are you sure to delete this article?</span>
                                    <div>
                                        <p onClick={tapOnDelete}>No</p>
                                        <p onClick={deleteArticle}>Yes</p>
                                    </div>
                                </div>
                                :<div></div>}
                                <span onClick={tapOnDelete} className={classes.delete}>Delete</span>
                                <Link to={`/articles/${pageData.slug}/edit`}><span className={classes.edit}>Edit</span></Link>
                            </div>
                            :<div></div>
                        }

                    </div>
                </div>
                <span>{elements}</span>
            </div>
        )
    }

}
const mapStateToProps = (state) => {     //для переменных из стейт
    return {
        pageData: state.pageData,
        userUsername: state.userUsername,
        dataForEditArticle: state.dataForEditArticle,
        tapDelete: state.tapDelete
    }
}
export default connect(mapStateToProps, actions)(ItemListItemOpen)
