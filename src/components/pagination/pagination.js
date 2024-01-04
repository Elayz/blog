import React from 'react';
import { Pagination } from 'antd';
import ApiSevice from '../../apiSevice'
import {connect} from "react-redux";
import * as actions from '../../actions'

const apiRes = new ApiSevice;

const PaginationPages = ({ dataToState, pageDataNull }) => {
    const onChange = (page) => {
        pageDataNull()
        apiRes.getRes(page)
            .then((res) => {
                dataToState(res)
            })
    };
    const style = {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '20px'
    }
    return (
        <div style={style}>
            <Pagination
            defaultCurrent={1}
            total={50}
            onChange={onChange}
        />
        </div>
    )
};
const mapStateToProps = (state) => {     //для переменных из стейт
    return {
        value: state,
    }
}
export default connect(mapStateToProps, actions)(PaginationPages);