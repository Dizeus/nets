import defAvatar from '../../assets/avatar.webp'
import {NavLink} from "react-router-dom";
import {followUnfollow} from "../../redux/user-reducer";
import {API_URL} from "../../config";
function Friend({user, friends,followUnfollow}) {

    return (
        <div className="user">
            <div className="user__avatar-follow">
                <NavLink to={"/home/"+user._id}><img className="user__image" src={user.avatar?`${API_URL}${user.avatar}`:defAvatar} alt="image"/></NavLink>

               {friends.includes(user._id)?<button className="user__follow" onClick={()=>followUnfollow(user._id, false)}>unfollow</button>:
                   <button className="user__follow" onClick={()=>followUnfollow(user._id, true)}> follow</button>}
            </div>
            <div className="user__info">
                <div className="user__name">{user.fullname}</div>
                <div className="user__status">{user.status || "Status"}</div>
            </div>
        </div>
    );
}

export default Friend;