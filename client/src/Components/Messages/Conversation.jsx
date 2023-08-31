import React, {useEffect} from "react";
import {API_URL} from "../../config";
import defAvatar from "../../assets/avatar.webp";
import {Formik} from "formik";
const Conversation = ({conversationInfo, sendMessage, profile}) => {


    return <div className='messages__conversation conversation'>
            <div className="messages__profile">
                    <img src={conversationInfo.userInfo?.avatar?`${API_URL}${conversationInfo.userInfo.avatar}`:defAvatar} className="messages__profile-avatar"></img>
                    <div className="messages__profile-name">{conversationInfo.userInfo?.fullname}</div>
            </div>
                <div className="conversation__content">
                    {conversationInfo.conversation.messages?.map(message=> {
                           return message.author === profile.id? <div style={{float: 'right'}}>{message.text}</div>:<div style={{backgroundColor: 'skyblue'}}>{message.text}</div>
                        }
                    )}
                </div>
        <Formik
            initialValues={{ message: ''}}
            validate={values => {
                const errors = {};
                if (!values.message)
                    errors.message = 'Message cannot be empty';
                return errors;
            }}
            onSubmit={(values, { setSubmitting}) => {
                sendMessage(values.message, conversationInfo.conversation._id)
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

                <form className="conversation__message" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="message"
                        className='message__input'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.message}
                        placeholder={"Write message..."}
                    />
                    <input type="submit" className="" disabled={isSubmitting}/>
                </form>
            )}
        </Formik>
            </div>
};

export default Conversation;