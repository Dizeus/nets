import postAvatar from "../../assets/avatar.webp";
import {useDispatch} from "react-redux";
import {deletePost, like} from "../../redux/user-reducer";

function Post({post}) {
    const dispatch = useDispatch()
    return (
        <div className="post">
            <div style={{display:'flex', columnGap: '20px'}}>
                <img src={postAvatar} className="post__avatar" />
                    <div className="post__content">
                        <div className="post__text">
                            {post.text}
                            <br/>
                            <br/>
                            <div className="post__date">{post.date.slice(0,10)}</div>
                        </div>
                        <button className="post__like" onClick={()=>dispatch(like(post._id))}>{post.likes} &#x2764;</button>
                    </div>
            </div>
            <button className="post__delete" onClick={()=>dispatch(deletePost(post._id))}>&#x2716;</button>
        </div>
    );
}

export default Post;
