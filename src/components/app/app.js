import React from 'react'
import Header from "../header/header";
import ItemList from "../item-list/item-list";
import classes from './app.module.scss'
import ApiSevice from '../../apiSevice'
import {connect} from "react-redux";
import * as actions from '../../actions'
import  { BrowserRouter, Route } from "react-router-dom";
import ItemListItemOpen from "../item-list-item-open/item-list-item-open";

const App = ({ dataToState }) => {
    const apiRes = new ApiSevice;
    window.onload = () => {
        apiRes.getRes()
            .then((res) => {
                dataToState(res)
            })
    };
    return (
        <div className={classes.main}>
            <BrowserRouter>
                <Header></Header>
                <Route path='/list' exact component={ItemList}></Route>
                <Route exact path='/list/:id'
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
        value: state,
    }
}
export default connect(mapStateToProps, actions)(App)