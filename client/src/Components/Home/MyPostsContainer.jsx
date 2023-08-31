import MyPosts from "./MyPosts";
import {connect} from "react-redux";


const mapStateToProps = (state)=>({
        posts: state.content.home.posts,
})

const MyPostsContainer = connect(mapStateToProps, )(MyPosts);

export default MyPostsContainer;
