import Bio from "./Bio";
import React from "react";
import MyPostsContainer from "./MyPostsContainer";
import MyPosts from "./MyPosts";

const Home = React.memo(({user, isOwner, posts, mainUser}) => (
    <div className="main__page home">

        <Bio mainUser={mainUser} isOwner={isOwner} avatar={user.avatar} status={user.status} username={user.username} id={user.id} fullname={user.fullname}/>
        <MyPosts posts={posts} isOwner={isOwner} user={user}/>
    </div>
));

export default Home;