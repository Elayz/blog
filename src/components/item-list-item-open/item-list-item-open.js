import React from 'react'
import classes from './item-list-item-open.module.scss'
import {connect} from "react-redux";
import * as actions from '../../actions'
import ReactMarkdown from 'react-markdown';
import logo from '../item-list-item/imgs/Vector.svg';

const ItemListItemOpen = ({ pageData }) => {
    if (pageData !== null){
        const br = document.createElement('br');
        const { body, author, description, favoritesCount, tagList, title, createdAt } = pageData
        // console.log(pageData)
        const newBody = body.split('\\n')
        const elements = newBody.map((item) => (
            <div>
                <span>{item}</span>
                <br/>
            </div>
        ));
        // console.log(newBody)
        // let newBody = body.replace(/\\/g, 'n');
        // newBody = newBody.replace(/nn/g, br);
        // console.log(body)
        // console.log(newBody)
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
                                <p>{favoritesCount}</p>
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
                        <div>
                            <h4 className={classes.authorName}>{author.username}</h4>
                            <h5 className={classes.authorDate}>March 5, 2020</h5>
                        </div>
                        <img className={classes.authorImage} src={author.image} alt="aGde"/>
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
