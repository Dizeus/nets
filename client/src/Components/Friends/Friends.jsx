import React from "react";
import Friend from "./Friend";
import '../../styles/css/Friends.css'
const Friends = ({people, friends, followUnfollow})=>{
    return <div className="friends">
        {people.map(user => {
            return <Friend friends={friends} key={user._id} user={user} followUnfollow={followUnfollow}/>
        })}
    </div>
}

export default Friends;
