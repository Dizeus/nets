import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {withAuthNavigate} from "../../HOC/withAuthNavigate";
import {withRouter} from "../../HOC/withRouter";
import MessagesList from "./MessagesList";
import Conversation from "./Conversation";
import {getConversation, getMessageProfiles, sendMessage} from "../../redux/messages-reducer";
import usePrevious from "../../Hook/usePrevious";




const MessagesContainer = (props) => {


    const receiverId= props.match.params.receiver
    const prevId = usePrevious(receiverId)

    if(prevId != receiverId){
        props.getConversation(receiverId)
    }

    return (<div className='messages'>
                <MessagesList messageProfiles={props.messageProfiles} conversations={props.conversations}/>
                {receiverId != undefined?<Conversation sendMessage={props.sendMessage} conversationInfo={props.conversationInfo}/>:<div>Choose conversation</div>}
            </div>)
}


const mapStateToProps = (state) => ({
    conversations: state.user.data.conversations,
    messageProfiles: state.messages.messageProfiles,
    conversationInfo: state.messages.currConv

})
export default compose(
    connect(mapStateToProps,{getConversation, sendMessage, getMessageProfiles}),
    withAuthNavigate,
    withRouter,
)(MessagesContainer);
