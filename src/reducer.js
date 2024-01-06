import {FormPassMatchSuccess} from "./actions";

const initState = {
    dataList: [],
    pageData:null,
    formPassMatchError: false,
    userId: null,
    userEmail: null,
    userUsername: null,
    userPassword: null,
    userToken: null,
    userBio: null,
    userImage: null,
    authorized: false,
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
        case 'userInfo':
            return {...state,
                userId: action.payload[3],
                userEmail: action.payload[1],
                userUsername: action.payload[0],
                userPassword: action.payload[2],
                userToken: action.payload[4],
                userBio: action.payload[6],
                userImage: action.payload[5],
                authorized: true,
            };
        case 'logOut':
            localStorage.clear();
            localStorage.setItem('authorized', false)
            return {...state,
                userId: initState.userId,
                userEmail: initState.userEmail,
                userUsername: initState.userUsername,
                userPassword: initState.userPassword,
                userToken: initState.userToken,
                userBio: initState.userBio,
                userImage: initState.userImage,
                authorized: false,
            };
        case 'updateUserInfo':
            console.log(action)
            console.log(state)
            return {...state,
                userEmail: initState.userEmail,
                userUsername: action.payload.userUsername,
                userPassword: initState.userPassword,
                userImage: action.payload.userImage,
            };
        default:
            return state;
    }
}
export default reducer;