import {api} from "../API/api";
import {setFriendPosts} from "./friend-reducer";

const SET_POSTS = "SET_POSTS";
const REMOVE_POST = "REMOVE_POST"
const SET_LIKE = "SET_LIKE"


const initialState = {
    posts: []
};
function postReducer(state = initialState, action){
    switch (action.type) {
        case SET_POSTS:
            return {
                ...state,
                posts: action.payload?[...action.payload]:action.payload
            }
        case REMOVE_POST:
            return {
                ...state,
                posts: [...state.posts.filter(x=>x._id !== action.payload)]
            }
        case SET_LIKE:
            return {
                ...state,
                posts: [...state.posts.map(x=>x._id !== action.payload._id?x:action.payload)]
            }
        default:
            return state;
    }
}

export const setLike = (post) => ({ type: SET_LIKE, payload: post});
export const setPosts = (posts) => ({ type: SET_POSTS, payload: posts});
export const removeDeleted = (postId) => ({ type: REMOVE_POST, payload: postId});


export const getPosts = (id, isOwner) => async (dispatch)=>{
    const res = await api.getPosts(id)
    isOwner?dispatch(setPosts(res.data.sortedPosts)):dispatch(setFriendPosts(res.data.sortedPosts))
}
export const addPost = (text, author) => async (dispatch)=>{
    const res = await api.addPost(text, author)
    if(res.status == 200){
        dispatch(getPosts(author, true))
    }
}
export const deletePost = (postId) => async (dispatch)=>{
    const res = await api.deletePost(postId)
    if(res.status == 200){
        dispatch(removeDeleted(postId))
    }
}

export const like = (postId, userId) => async (dispatch)=>{
    const res = await api.like(postId, userId)
    if(res.status == 200){
        dispatch(setLike(res.data))
    }
}


export default postReducer;


