import {Navigate} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";

const mapStateToProps = (state)=>({
    isAuth: state.user.isAuth
})
export const withAuthNavigate = (Component)=>{
    const RedirectComponent = (props)=>{
        return(props.isAuth ?
            <Component {...props}/>
            :<Navigate to="/login" replace={true}/>)


    }
    return connect(mapStateToProps)(RedirectComponent);
}