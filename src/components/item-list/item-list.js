import React from 'react'
import ItemListItem from "../item-list-item/item-list-item";
import PaginationPages from "../pagination/pagination";
import ItemListItemOpen from "../item-list-item-open/item-list-item-open";
import {connect} from "react-redux";
import * as actions from '../../actions'
import Spinn from "../spin/spin";
// import  { BrowserRouter, Route } from "react-router-dom";

const ItemList = ({ dataList }) => {
    if(dataList.length>0) {
        let index = 0;
        dataList.map((item) => {
            item.index = index;
            index++;
        });
    }
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
                {dataList.length <= 1 ? <Spinn></Spinn> :
                    <div>
                        {elements}
                    </div>}
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

