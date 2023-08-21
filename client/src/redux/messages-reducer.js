import {api} from "../API/api";
import conversation from "../Components/Messages/Conversation";
import messageProfile from "../Components/Messages/MessageProfile";
import {addConversation, addUserConversation} from "./user-reducer";

const SET_CURR_CONV = "SET_CURR_CONV"
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
        case ADD_MESSAGE_PROFILE:
            return {
                ...state,
                messageProfiles: [...state.messageProfiles, action.payload]
            }
        default:
            return state;
    }
}

const addMessageProfile = (profile) => ({ type: ADD_MESSAGE_PROFILE, payload: profile})
const setCurrConv = (conv) =>({type: SET_CURR_CONV, payload: conv})
export const getMessageProfiles = (conversations) => async (dispatch)=>{

    for(let conv of conversations){
        const res = await api.getMessageProfiles(conv.userId);
        if(res.status == 200)
            dispatch(addMessageProfile(res.data.user))
    }
}
export const getConversation = (receiverId) => async (dispatch) =>{

    const res = await api.getConversation(receiverId);
    if(res?.status == 200) {
        dispatch(setCurrConv(res.data.conversationInfo))
        dispatch(addUserConversation(res.data.conversationInfo.conversation._id, receiverId))
    }
}
export const sendMessage = (message, convId) => async (dispatch) =>{
    console.log('sendMessage')
    const res = await api.sendMessage(message, convId);
    console.log(res)
    if(res.status == 200) {

    }
}
export default messagesReducer;