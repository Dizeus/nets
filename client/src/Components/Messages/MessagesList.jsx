import React from "react";
import defAvatar from '../../assets/avatar.webp'
import {API_URL} from "../../config";
import {NavLink} from "react-router-dom";
const MessagesList = React.memo(({conversations, messageProfiles}) => (


    <div className="messages__list">
        {messageProfiles?.map(profile=>(
            <NavLink key={profile.id} to={'/messages/'+ profile.id}>
            <div className="messages__profile">
                <img src={profile.avatar?`${API_URL}${profile.avatar}`:defAvatar} className="messages__profile-avatar"></img>
                <div className="messages__profile-name">{profile.fullname}</div>
            </div>
            </NavLink>))}
    </div>
));

export default MessagesList;