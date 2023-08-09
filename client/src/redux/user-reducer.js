import {api} from "../API/api";

const SET_USER = "SET_USER";
const SET_POSTS = "SET_POSTS"
const REMOVE_POST = "REMOVE_POST"
const SET_LIKE = "SET_LIKE"
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
        case REMOVE_POST:
             return {
                ...state,
                data: {...state.data, posts: state.data.posts.filter(x=>x._id !== action.payload)}
        }
        case SET_LIKE:
             return {
                ...state,
                data: {...state.data, posts: [...state.data.posts.map(x=> {
                    console.log(x._id !== action.payload._id?x:action.payload)
                    return x._id !== action.payload._id?x:action.payload;}
                    )]
          }
        }
        default:
            return state;
    }
}
export const setUser = (user) => ({ type: SET_USER, payload: user});
export const setLike = (post) => ({ type: SET_LIKE, payload: post});
export const logout = ()=>({ type: LOGOUT})

export const setPosts = (posts) => ({ type: SET_POSTS, payload: posts});
export const removeDeleted = (postId) => ({ type: REMOVE_POST, payload: postId});

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
export const signup = (email, password, fullname) => async (dispatch)=>{
    const res = await api.signup(email, password, fullname)
}
export const updateUserData = (values, id) => async (dispatch)=>{
    const {user} = await api.updateUserData(values, id)
    dispatch(setUser(user))
}


export const getPosts = (id) => async (dispatch)=>{
    const res = await api.getPosts(id)
    if(res.status == 200){
        dispatch(setPosts(res.data.sortedPosts))
    }
}
export const addPost = (text, author) => async (dispatch)=>{
    const res = await api.addPost(text, author)
    if(res.status == 200){
        dispatch(getPosts(author))
    }
}
export const deletePost = (postId) => async (dispatch)=>{
    const res = await api.deletePost(postId)
    console.log(res)
    if(res.status == 200){
        dispatch(removeDeleted(postId))
    }
}

export const like = (postId) => async (dispatch)=>{
    const res = await api.like(postId)
    if(res.status == 200){
        dispatch(setLike(res.data))
    }
}

export const getPeople = () => async (dispatch) =>{
    const res = await api.getPeople();
    console.log(res)
}
export default userReducer;