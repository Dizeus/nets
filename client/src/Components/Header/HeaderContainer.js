import Header from "./Header";
import React from "react";
import {connect} from "react-redux";
import {logout} from "../../redux/user-reducer";

const HeaderContainer = (props) =>{
    return (
        <Header {...props}/>
    )
}

const mapStateToProps = (state) =>({
    fullname: state.user.data.fullname,
    email: state.user.data.email,
    isAuth: state.user.isAuth,
    avatar: state.user.data.avatar
})
export default connect(mapStateToProps,{logout})(HeaderContainer);