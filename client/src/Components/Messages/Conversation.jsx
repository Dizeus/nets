import React, {useEffect} from "react";
import {API_URL} from "../../config";
import defAvatar from "../../assets/avatar.webp";
import {Formik} from "formik";
const Conversation = ({conversationInfo, sendMessage, profile}) => {


    return (<div className='messages__conversation conversation'>
                <div className="conversation__header">
                        <img src={conversationInfo.userInfo?.avatar?`${API_URL}${conversationInfo.userInfo.avatar}`:defAvatar} className="messages__profile-avatar"></img>
                        <div className="messages__profile-name">{conversationInfo.userInfo?.fullname}</div>
                </div>
                <div className="conversation__content">
                    {conversationInfo.conversation.messages?.map(message=> {
                           return message.author === profile.id? <div key={message._id} className={'conversation__message_my'}>{message.text}</div>:<div key={message._id} className={'conversation__message'}>{message.text}</div>
                        }
                    )}
                </div>
                <NewMessageForm sendMessage={sendMessage} conversationId={conversationInfo.conversation._id}/>
            </div>)
};

const NewMessageForm = ({sendMessage, conversationId})=>{
    return (<Formik
                initialValues={{ message: ''}}
                validate={values => {
                    const errors = {};
                    if (!values.message)
                        errors.message = 'Message cannot be empty';
                    return errors;
                }}
                onSubmit={(values, { setSubmitting}) => {
                    sendMessage(values.message, conversationId)
                    values.message = ''
                    setSubmitting(false);
                }}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                      status,
                      /* and other goodies */
                  }) => (

                    <form className="conversation__form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="message"
                            className='conversation__input'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.message}
                            placeholder={"Write message..."}
                        />
                        <input value='Send' type="submit" className="conversation__send" disabled={isSubmitting}/>
                    </form>
                )}
            </Formik>)
}

export default Conversation;