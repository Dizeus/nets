import defAvatar from '../../assets/avatar.webp'
import {NavLink} from "react-router-dom";
import {followUnfollow} from "../../redux/user-reducer";
import {API_URL} from "../../config";
function Friend({user, friends,followUnfollow}) {

    return (
        <div className="user">
            <NavLink to={"/home/"+user._id}>
                <div className='user__image-container'>
                    <img className="user__image" src={user.avatar?`${API_URL}${user.avatar}`:defAvatar} alt="image"/>
                </div>
            </NavLink>
            <div className="user__info">
                <div className="user__name">{user.fullname}</div>
                <div className="user__status">{user.status || ""}</div>
            </div>
            {friends.includes(user._id)?<button className="button" onClick={()=>followUnfollow(user._id, false)}>unfollow</button>:
                <button className="button" onClick={()=>followUnfollow(user._id, true)}> follow</button>}
        </div>
    );
}

export default Friend;