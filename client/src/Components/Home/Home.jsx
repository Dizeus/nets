import Bio from "./Bio";
import React from "react";
import MyPostsContainer from "./MyPostsContainer";
import MyPosts from "./MyPosts";

const Home = React.memo(({user}) => (
    <div className="main__page home">
        <Bio avatar={user.avatar} status={user.status} username={user.username} id={user.id} fullname={user.fullname}/>
        <MyPosts user={user}/>
    </div>
));

export default Home;