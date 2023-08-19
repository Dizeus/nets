import defAvatar from "../../assets/avatar.webp";
import {useDispatch} from "react-redux";
import {API_URL} from "../../config";
import {deletePost, like} from "../../redux/post-reducer";

function Post({post, isOwner, avatar, userId}) {
    const dispatch = useDispatch()
    return (
        <div className="post">
            <div style={{display:'flex', columnGap: '20px'}}>
                <img src={avatar?`${API_URL}${avatar}`:defAvatar} className="post__avatar" />
                    <div className="post__content">
                        <div className="post__text">
                            {post.text}
                            <br/>
                            <br/>
                            <div className="post__date">{post.date.slice(0,10)}</div>
                        </div>
                        <button className="post__like" onClick={()=>dispatch(like(post._id, userId))}>{post.likes.count} &#x2764;</button>
                    </div>
            </div>
            {isOwner && <button className="post__delete" onClick={() => dispatch(deletePost(post._id))}>&#x2716;</button>}
        </div>
    );
}

export default Post;
