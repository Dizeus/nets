import {api} from "../API/api";
import {getPosts} from "./post-reducer";
import conversation from "../Components/Messages/Conversation";
import {addMessageProfile, getMessageProfiles} from "./messages-reducer";

const SET_USER = "SET_USER";
const SET_AVATAR = "SET_AVATAR";
const LOGOUT = "LOGOUT"
const ADD_FRIEND = "ADD_FRIEND";
const REMOVE_FRIEND = "REMOVE_FRIEND";
const SET_CONVERSATION = "SET_CONVERSATION"

const initialState = {
    data: {
        id: null,
        email: null,
        password: null,
        fullname: null,
        username: null,
        status: null,
        avatar: null,
        friends: [],
        conversations: []
    },
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
        case SET_AVATAR:
            return {
                ...state,
                data: {...state.data, avatar: action.payload}
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
        case SET_CONVERSATION:
            console.log([...state.data.conversations?.filter(conv=>conv.convId!=action.payload.convId), action.payload])
            return {
                ...state,
                data: {...state.data, conversations: [...state.data.conversations?.filter(conv=>conv.convId!=action.payload.convId), action.payload]}
            }
        default:
            return state;
    }
}
export const setUser = (user) => ({ type: SET_USER, payload: user});
export const addConversation = (conversation) => ({ type: SET_CONVERSATION, payload: conversation});

export const logout = ()=>({ type: LOGOUT})
export const setAvatar = (avatar) => ({ type: SET_AVATAR, payload: avatar});
export const addFriend = (id) => ({ type: ADD_FRIEND, payload: id});
export const removeFriend = (id) => ({ type: REMOVE_FRIEND, payload: id});

export const login = (email, password) => async (dispatch)=>{
     const response = await api.login(email, password)
     if(response?.status === 200){
        dispatch(setUser(response.data.user))
        localStorage.setItem('token', response.data.token)
         dispatch(getPosts(response.data.user.id, true))
         dispatch(getMessageProfiles(response.data.user.conversations))
    }
}
export const auth = () => async (dispatch)=>{
     const response = await api.auth()
        console.log(response)
     if(response?.status === 200) {
         localStorage.setItem('token', response.data.token)
         dispatch(setUser(response.data.user))
         dispatch(getPosts(response.data.user.id, true))
         dispatch(getMessageProfiles(response.data.user.conversations))
     }else {
         localStorage.removeItem('token')
     }
}

export const signup = (email, password, fullname) => async (dispatch)=>{
    const response = await api.signup(email, password, fullname)
    if(response?.status === 200) {
        localStorage.setItem('token', response.data.token)
        dispatch(setUser(response.data.user))
        dispatch(getPosts(response.data.user.id, true))
        dispatch(getMessageProfiles(response.data.user.conversations))
    }
}
export const updateUserData = (values, id) => async (dispatch)=>{
    const {user} = await api.updateUserData(values, id)
    dispatch(setUser(user))
}
export const uploadAvatar = (file) => async (dispatch) =>{
    const base64 = await convertToBase64(file)
    const res = await api.uploadAvatar(base64);
    if(res.status == 200)
        dispatch(setAvatar(res.data.user.avatar))
}

export const followUnfollow = (id, isFollow) => async (dispatch) =>{
    const res = await api.followUnfollow(id, isFollow)
    if(res.status == 200) {
        isFollow? dispatch(addFriend(id)): dispatch(removeFriend(id));
    }
}

export const addUserConversation = (convId, userId) => (dispatch) =>{
    dispatch(addConversation({convId, userId}))
    dispatch(addMessageProfile(userId))
}

export default userReducer;

function convertToBase64(file){
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result)
        };
        fileReader.onerror = (error) => {
            reject(error)
        }
    })
}