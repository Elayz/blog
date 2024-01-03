import React from 'react'
import ItemListItem from "../item-list-item/item-list-item";
import PaginationPages from "../pagination/pagination";
import ItemListItemOpen from "../item-list-item-open/item-list-item-open";
import {connect} from "react-redux";
import * as actions from '../../actions'
// import  { BrowserRouter, Route } from "react-router-dom";

const ItemList = ({ dataList }) => {
    // const fakeData = [{key:1},{key:2},{key:3},{key:4},{key:5}]
    let index = 0;
    dataList.map((item) => {
        item.index = index;
        index++;
    });
    const elements = dataList.map((item) => (
        <ItemListItem
            key={item.index}
            index={item.index}
            author={item.author}
            description={item.description}
            favoritesCount={item.favoritesCount}
            tagList={item.tagList}
            title={item.title}
            createdAt={item.createdAt}
            item={item}
        >
        </ItemListItem>
    ));


    return (
        <div>
            {elements}
            <PaginationPages></PaginationPages>
        </div>
    )
}
const mapStateToProps = (state) => {     //для переменных из стейт
    return {
        dataList: state.dataList,
    }
}
export default connect(mapStateToProps, actions)(ItemList)