import {api} from "../API/api";
import {getPosts, setLike} from "./post-reducer";

const SET_FRIEND_PROFILE = "SET_FRIEND_PROFILE";
const SET_FRIEND_POSTS = "SET_FRIEND_POSTS"
const SET_PEOPLE = "SET_PEOPLE";
const SET_FRIEND_LIKE = 'SET_FRIEND_LIKE'

const initialState = {
    people: [],
    friendProfile: {},
    friendPosts: [],
};
function friendReducer(state = initialState, action){
    switch (action.type) {
        case SET_FRIEND_PROFILE:
            return {
                ...state,
                friendProfile: {...action.payload}
            }
        case SET_FRIEND_POSTS:
            return {
                ...state,
                friendPosts: [...action.payload]
            }
        case SET_PEOPLE:
            return {
                ...state,
                people: action.payload
            }
        case SET_FRIEND_LIKE:
            return {
                ...state,
                friendPosts: [...state.friendPosts.map(x=>x._id !== action.payload._id?x:action.payload)]
            }
        default:
            return state;
    }
}

export const setFriendProfile = (data) => ({ type: SET_FRIEND_PROFILE, payload: data});
export const setFriendLike = (post) => ({ type: SET_FRIEND_LIKE, payload: post});
export const setFriendPosts = (posts) => ({ type: SET_FRIEND_POSTS, payload: posts});
export const setPeople = (people) => ({ type: SET_PEOPLE, payload: people});

export const getProfile = (id) => async (dispatch)=>{
    const response = await api.getProfile(id)
    console.log(response)
    if(response.status === 200){
        dispatch(setFriendProfile(response.data.user))
        dispatch(getPosts(id, false))
    }
}
export const getPeople = () => async (dispatch) =>{
    const res = await api.getPeople();
    if(res?.status == 200)
        dispatch(setPeople(res.data.users))
}
export const likeFriendPost = (postId, userId) => async (dispatch)=>{
    const res = await api.like(postId, userId)
    console.log(res)
    if(res.status == 200){
        dispatch(setFriendLike(res.data))
    }
}

export default friendReducer;