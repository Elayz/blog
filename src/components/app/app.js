import React from 'react'
import Header from "../header/header";
import ItemList from "../item-list/item-list";
import classes from './app.module.scss'
import ApiSevice from '../../apiSevice'
import {connect} from "react-redux";
import * as actions from '../../actions'
import  { BrowserRouter, Route } from "react-router-dom";
import ItemListItemOpen from "../item-list-item-open/item-list-item-open";
import SignUp from "../forms/SignUp/SignUp";
import SignIn from "../forms/SiginIn/SiginIn";
import EditProfile from "../forms/EditProfile/EditProfile";
import NewArticle from "../forms/newArticle/newArticle";

const user = JSON.parse(localStorage.getItem('user'));
const App = ({ dataToState, state }) => {
    const apiRes = new ApiSevice;
    window.onload = () => {
        apiRes.getRes(1, user.userToken)
            .then((res) => {
                dataToState(res)
            })
    };
    return (
        <div className={classes.main}>
            <BrowserRouter>
                <Header></Header>
                <Route path='/create-article' exact component={NewArticle}></Route>
                <Route path='/profile' exact component={EditProfile}></Route>
                <Route path='/articles' exact component={ItemList}></Route>
                <Route path='/sign-in' exact component={SignIn}></Route>
                <Route path='/sign-up' exact component={SignUp}></Route>
                <Route exact path='/articles/:id'
                       render={({ match }) => {
                           const { id } = match.params
                           return <ItemListItemOpen itemID={id} />
                       }}>
                </Route>
            </BrowserRouter>
        </div>
    )
}

const mapStateToProps = (state) => {     //для переменных из стейт
    return {
        pageData: state.pageData,
        state: state,
    }
}
export default connect(mapStateToProps, actions)(App)