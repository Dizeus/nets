import {connect} from "react-redux";
import Friends from "./Friends";
import React, {useEffect, useState} from "react";
import {compose} from "redux";
import {withAuthNavigate} from "../../HOC/withAuthNavigate";
import friends from "./Friends";
import {followUnfollow, getPeople} from "../../redux/friend-reducer";

const FriendsContainer = ({people,friends, getPeople, followUnfollow}) => {

    useEffect(()=>getPeople, [])

    return(
            <Friends friends={friends} people={people} followUnfollow={followUnfollow}/>
        )
}

const mapStateToProps = (state)=>({
    people: state.friend.people,
    friends: state.user.data.friends
})
export default compose(
    withAuthNavigate,
    connect(mapStateToProps, {
       getPeople,
       followUnfollow,
    })
)(FriendsContainer);
