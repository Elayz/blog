import React from 'react';
import { Pagination } from 'antd';
const PaginationPages = () => {
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
        />
        </div>
    )
};
export default PaginationPages;