import {api} from "../API/api";
import {addConversation, addUserConversation} from "./user-reducer";

const SET_CURR_CONV = "SET_CURR_CONV"
const SET_MESSAGE_PROFILES = "SET_MESSAGE_PROFILES"
const ADD_MESSAGE_PROFILE = "ADD_MESSAGE_PROFILE"

const initialState = {
    conversationsList: [],
    currConv: {conversation: {messages: []}, userInfo: null},
    messageProfiles: []
};
function messagesReducer(state = initialState, action){
    switch (action.type) {
        case SET_CURR_CONV:
            return {
                ...state,
                currConv: action.payload
            }
        case SET_MESSAGE_PROFILES:
            return {
                ...state,
                messageProfiles: [...action.payload]
            }
        case ADD_MESSAGE_PROFILE:
            return {
                ...state,
                messageProfiles: [action.payload, ...state.messageProfiles.filter(profile=>profile.id!==action.payload.id)]
            }
        default:
            return state;
    }
}

const setMessageProfiles = (profiles) => ({ type: SET_MESSAGE_PROFILES, payload: profiles})
const addMessageProfileAC = (profile) => ({ type: ADD_MESSAGE_PROFILE, payload: profile})
const setCurrConv = (conv) =>({type: SET_CURR_CONV, payload: conv})

export const getMessageProfiles = (conversations) => async (dispatch)=>{
    const profiles = []
    for(let conv of conversations){
        const res = await api.getMessageProfiles(conv.userId);
        if(res.status == 200)
            profiles.push(res.data.user)
    }
    dispatch(setMessageProfiles(profiles))
}
export const addMessageProfile = (userId) => async(dispatch) =>{
    const res = await api.getMessageProfiles(userId);
    if(res.status == 200)
        dispatch(addMessageProfileAC(res.data.user))
}
export const getConversation = (receiverId) => async (dispatch) =>{
    const res = await api.getConversation(receiverId);
    if(res?.status == 200) {
        dispatch(setCurrConv(res.data.conversationInfo))
        dispatch(addUserConversation(res.data.conversationInfo.conversation._id, receiverId))
    }
}
export const sendMessage = (message, convId) => async (dispatch) =>{
    const res = await api.sendMessage(message, convId);
    if(res.status == 200) {
        dispatch(setCurrConv(res.data.conversationInfo))
    }
}
export default messagesReducer;