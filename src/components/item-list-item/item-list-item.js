import React from 'react'
import classes from './item-list-item.module.scss'
import  { Link, BrowserRouter } from "react-router-dom";
import {connect} from "react-redux";
import * as actions from '../../actions'
import logo from './imgs/Vector.svg';

const ItemListItem = ({ pageDataFoo, item }) => {
    const { index, author, description, favoritesCount, tagList, title, createdAt, slug } = item

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
            <div className={classes.main}>
                <div className={classes.textZone}>
                    <div className={classes.title}>
                        <div>
                            <Link onClick={() => pageDataFoo(item)} to={`/articles/${slug}`}>
                                <h2>{title}</h2>
                            </Link>
                        </div>
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
                    <div>
                        <h4 className={classes.authorName}>{author.username}</h4>
                        <h5 className={classes.authorDate}>March 5, 2020</h5>
                    </div>
                    <img className={classes.authorImage} src={author.image} alt="aGde"/>
                </div>
            </div>
    )
}
const mapStateToProps = (state) => {     //для переменных из стейт
    return {
        dataList: state.dataList,
    }
}
export default connect(mapStateToProps, actions)(ItemListItem)