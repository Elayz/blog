import {FormPassMatchSuccess} from "./actions";

const initState = {
    dataList: [],
    pageData:null,
    formPassMatchError: false,
}
const reducer = (state = initState, action) => {
    switch (action.type) {
        case 'dataToState':
            return {...state,
                dataList: action.payload.articles,
            };
        case 'pageData':
            return {...state,
                pageData: action.payload,
            };
        case 'pageDataNull':
            return {...state,
                dataList: [],
            };
        case 'FormPassMatchFail':
            return {...state,
                formPassMatchError: true,
            };
        case 'FormPassMatchSuccess':
            return {...state,
                formPassMatchError: false,
            };
        default:
            return state;
    }
}
export default reducer;