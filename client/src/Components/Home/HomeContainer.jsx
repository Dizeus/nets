import React from "react";
import {connect} from "react-redux";
import {useParams} from 'react-router-dom';
import {compose} from "redux";
import {withAuthNavigate} from "../../HOC/withAuthNavigate";
import Home from "./Home";

const HomeContainer = (props)=>{
    return <Home {...props}/>
}

export function withRouter(Children){
    return(props)=>{
        const match  = {params: useParams()};
        return <Children {...props}  match = {match}/>
    }
}
let mapStateToProps = (state) => ({
    user: state.user.data,
})
export default compose(
    connect(mapStateToProps,{}),
    withAuthNavigate,
    )(HomeContainer);
