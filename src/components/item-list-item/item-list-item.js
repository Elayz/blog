import React from 'react'
import classes from './item-list-item.module.scss'
import  { Link } from "react-router-dom";
import {connect} from "react-redux";
import * as actions from '../../actions'
import logo from './imgs/Vector.svg';
import likeLogo from './imgs/Heart_corazón 1.svg';
import ApiSevice from "../../apiSevice";

const apiServ = new ApiSevice();
const user = JSON.parse(localStorage.getItem('user'));
const ItemListItem = ({ pageDataFoo, item }) => {
    const { favorited, index, author, description, favoritesCount, tagList, title, createdAt, slug } = item;

    const onFavor = () => {
        apiServ.favorArticle(user.userToken, slug)
            .then((res) => console.log(res))
    };
    const onUnFavor = () => {
        apiServ.unFavorArticle(user.userToken, slug)
            .then((res) => console.log(res))
    }
    function formatDate(isoDate) {
        const date = new Date(isoDate);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

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
                            <img onClick={favorited ? onUnFavor : onFavor} src={favorited ? likeLogo : logo} alt="aGde"/>
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
                        <h5 className={classes.authorDate}>{formatDate(createdAt)}</h5>
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