import defAvatar from "../../assets/avatar.webp";
import {useDispatch} from "react-redux";
import {API_URL} from "../../config";
import {deletePost, like} from "../../redux/post-reducer";
import {likeFriendPost} from "../../redux/friend-reducer";

function Post({post, isOwner, avatar, userId, fullname}) {
    const dispatch = useDispatch()
    return (
        <div className="post">
            <div className="post__avatar-container">
                <img src={avatar?avatar:defAvatar} className="post__avatar" />
            </div>
            <div className="post__content">
                <div className="post__author">{fullname} <span className="post__date">{post.date.slice(0,10).replaceAll('-','.')}</span></div>
                <div className="post__text">
                    {post.text}
                </div>
                <button className="post__like" onClick={()=> isOwner?dispatch(like(post._id, userId)):dispatch(likeFriendPost(post._id, userId))}>{post.likes.count} &#x2764;</button>
                {isOwner && <button className="post__delete" onClick={() => dispatch(deletePost(post._id))}>&#x2716;</button>}
            </div>

        </div>
    );
}

export default Post;
