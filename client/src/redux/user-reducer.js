import {api} from "../API/api";
import {getPosts} from "./post-reducer";

const SET_USER = "SET_USER";
const SET_AVATAR = "SET_AVATAR";
const LOGOUT = "LOGOUT"


const initialState = {
    data: {},
    token: null,
    isAuth: false
};
function userReducer(state = initialState, action){
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                isAuth: true,
                data: {...action.payload}
            }
        case LOGOUT:
            localStorage.removeItem('token')
             return {
                ...state,
                isAuth: false,
                data: {}
        }
        case SET_AVATAR:
            return {
                ...state,
                data: {...state.data, avatar: action.payload}
            }
        default:
            return state;
    }
}
export const setUser = (user) => ({ type: SET_USER, payload: user});
export const logout = ()=>({ type: LOGOUT})

export const setAvatar = (avatar) => ({ type: SET_AVATAR, payload: avatar});


export const login = (email, password) => async (dispatch)=>{
     const response = await api.login(email, password)
     if(response.status === 200){
        dispatch(setUser(response.data.user))
        localStorage.setItem('token', response.data.token)
         dispatch(getPosts(response.data.user.id, true))
    }
}
export const auth = () => async (dispatch)=>{
     const response = await api.auth()
     if(response?.status === 200) {
         localStorage.setItem('token', response.data.token)
         dispatch(setUser(response.data.user))
         dispatch(getPosts(response.data.user.id, true))
     }else {
         localStorage.removeItem('token')
     }
}

export const signup = (email, password, fullname) => async (dispatch)=>{
    const res = await api.signup(email, password, fullname)
}
export const updateUserData = (values, id) => async (dispatch)=>{
    const {user} = await api.updateUserData(values, id)
    dispatch(setUser(user))
}
export const uploadAvatar = (file) => async (dispatch) =>{
    const res = await api.uploadAvatar(file);
    if(res.status == 200)
        dispatch(setAvatar(res.data.user.avatar))
}

export default userReducer;