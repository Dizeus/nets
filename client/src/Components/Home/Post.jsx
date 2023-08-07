import postAvatar from "../../assets/avatar.webp";

function Post({post}) {
    return (
        <div className="post">
            <img src={postAvatar} className="post__avatar" />
            <div className="post__content">
                <div className="post__text">'{post.text}'</div>
                <button className="post__like">'{post.likes} &#x2764;'</button>
            </div>
        </div>
    );
}

export default Post;
