import {api} from "../API/api";
import {getPosts} from "./post-reducer";

const SET_FRIEND_PROFILE = "SET_FRIEND_PROFILE";
const SET_FRIEND_POSTS = "SET_FRIEND_POSTS"
const SET_PEOPLE = "SET_PEOPLE";
const ADD_FRIEND = "ADD_FRIEND";
const REMOVE_FRIEND = "REMOVE_FRIEND";

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
        case ADD_FRIEND:
            return {
                ...state,
                data: {...state.data, friends: [...state.data.friends, action.payload]}
            }
        case REMOVE_FRIEND:
            return {
                ...state,
                data: {...state.data, friends: [...state.data.friends.filter(x=>x!=action.payload)]}
            }
        default:
            return state;
    }
}

export const setFriendProfile = (data) => ({ type: SET_FRIEND_PROFILE, payload: data});
export const setFriendPosts = (posts) => ({ type: SET_FRIEND_POSTS, payload: posts});
export const setPeople = (people) => ({ type: SET_PEOPLE, payload: people});

export const addFriend = (id) => ({ type: ADD_FRIEND, payload: id});

export const removeFriend = (id) => ({ type: REMOVE_FRIEND, payload: id});


export const getProfile = (id) => async (dispatch)=>{
    const response = await api.getProfile(id)
    if(response.status === 200){
        dispatch(setFriendProfile(response.data.user))
        dispatch(getPosts(id, false))
    }
}
export const getPeople = () => async (dispatch) =>{
    const res = await api.getPeople();
    if(res.status == 200)
        dispatch(setPeople(res.data.users))
}

export const followUnfollow = (id, isFollow) => async (dispatch) =>{
    const res = await api.followUnfollow(id, isFollow)
    if(res.status == 200) {
        isFollow? dispatch(addFriend(id)): dispatch(removeFriend(id));
    }
}
export default friendReducer;