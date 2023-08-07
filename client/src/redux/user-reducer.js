import {api} from "../API/api";

const SET_USER = "SET_USER";
const SET_POSTS = "SET_POSTS"
const LOGOUT = "LOGOUT"

const initialState = {
    data: {},
    token: null,
    isAuth: false,
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
        case SET_POSTS:
             return {
                ...state,
                data: {...state.data, posts: action.payload}
        }
        default:
            return state;
    }
}
export const setUser = (user) => ({ type: SET_USER, payload: user});
export const logout = ()=>({ type: LOGOUT})

export const setPosts = (posts) => ({ type: SET_POSTS, payload: posts});

export const login = (email, password) => async (dispatch)=>{
     const response = await api.login(email, password)
     if(response.status === 200){
        dispatch(setUser(response.data.user))
        localStorage.setItem('token', response.data.token)
         dispatch(getPosts(response.data.user.id))
    }
}
export const auth = () => async (dispatch)=>{
     const response = await api.auth()
     if(response?.status === 200) {
         dispatch(setUser(response.data.user))
         localStorage.setItem('token', response.data.token)
         dispatch(getPosts(response.data.user.id))
     }else {
         localStorage.removeItem('token')
     }
}
export const signup = (email, password) => async (dispatch)=>{
    const res = await api.signup(email, password)
    dispatch()
    console.log(res)
}

export const getPosts = (id) => async (dispatch)=>{
    const res = await api.getPosts(id)
    if(res.status == 200){
        dispatch(setPosts(res.data.posts))
    }
    console.log(res)
}
export const addPost = (text, author) => async (dispatch)=>{
    const res = await api.addPost(text, author)
    if(res.status == 200){
        dispatch(getPosts(author))
    }
}
export default userReducer;