import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {withAuthNavigate} from "../../HOC/withAuthNavigate";
import Home from "./Home";
import {withRouter} from "../../HOC/withRouter";
import {getPosts} from "../../redux/post-reducer";
import {getProfile} from "../../redux/friend-reducer";



const HomeContainer = (props) => {

    const isOwner= !props.match.params.userId

    const initializeApp = () =>{
        if(!isOwner) {
            props.getProfile(props.match.params.userId)
        }

    }
    useEffect(()=>initializeApp,[])


    return isOwner?<Home user={props.user} posts={props.posts} isOwner={isOwner}/>:<Home user={props.friendProfile} posts={props.friendPosts} isOwner={isOwner}/>
}


const mapStateToProps = (state) => ({
    user: state.user.data,
    posts: state.post.posts,
    friendProfile: state.friend.friendProfile,
    friendPosts: state.friend.friendPosts
})
export default compose(
    connect(mapStateToProps,{getProfile, getPosts}),
    withAuthNavigate,
    withRouter,
    )(HomeContainer);
