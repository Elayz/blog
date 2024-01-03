const initState = {
    dataList: [],
    pageData:null,
}
const reducer = (state = initState, action) => {
    switch (action.type) {
        case 'dataToState':
            // console.log(action.payload.articles)
            return {...state,
                dataList: action.payload.articles,
            };
        case 'pageData':
            return {...state,
                pageData: action.payload,
            };
        default:
            return state;
    }
}
export default reducer;