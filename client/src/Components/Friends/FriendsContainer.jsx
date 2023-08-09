import {connect} from "react-redux";
import Friends from "./Friends";
import React, {useEffect, useState} from "react";
import {compose} from "redux";
import {getPeople} from "../../redux/user-reducer";
import {withAuthNavigate} from "../../HOC/withAuthNavigate";

const FriendsContainer = (props) => {

    useEffect(()=>props.getPeople, [])

    return(
            <Friends/>
        )
}

const mapStateToProps = (state)=>{
    return {

    }
}
export default compose(
    withAuthNavigate,
    connect(mapStateToProps, {
       getPeople
    })
)(FriendsContainer);
