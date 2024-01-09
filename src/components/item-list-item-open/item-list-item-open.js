import React from 'react'
import classes from './item-list-item-open.module.scss'
import {connect} from "react-redux";
import * as actions from '../../actions'
import logo from '../item-list-item/imgs/Vector.svg';

const ItemListItemOpen = ({ pageData }) => {
    if (pageData !== null){
        const { body, author, description, favoritesCount, tagList, title, createdAt } = pageData
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
                        <div className={classes.editDelete}>
                            <span className={classes.delete}>Delete</span>
                            <span className={classes.edit}>Edit</span>
                        </div>

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
    }
}
export default connect(mapStateToProps, actions)(ItemListItemOpen)
