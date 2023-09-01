import {Field, Formik} from "formik";
import React from "react";
import Post from "./Post";
import {useDispatch} from "react-redux";
import {addPost} from "../../redux/post-reducer";
import '../../styles/css/MyPosts.css'

function MyPosts({user, posts, isOwner, mainUser}) {

    const dispatch = useDispatch()

    const onAddPost = (text) =>{
        dispatch(addPost(text, user.id))
    }

    return <div className="home__posts posts">

        {isOwner && <NewPostForm onAddPost={onAddPost}/>}
        <h2 className="posts__title">Posts</h2>
        {posts.length !== 0 ?
            posts?.map((post) => (
                <Post fullname={user.fullname} isOwner={isOwner} key={post._id} post={post} avatar={user.avatar}
                      userId={isOwner ? user.id : mainUser.id}/>
            ))
            :<div className='none'>No posts yet</div>
        }
    </div>
}


const NewPostForm = ({onAddPost}) =>{
    return <Formik
        initialValues={{ newPostText: ''}}
        validate={values => {
            const errors = {};
            if (!values.newPostText) {
                errors.newPostText = 'Post can\'t be empty';
            } else if (values.newPostText.length>500) {
                errors.newPostText = 'Post text is too long!';
            }
            return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
            onAddPost(values.newPostText)
            values.newPostText = ''
            setSubmitting(false);
        }}
    >

        {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
          }) => (
            <form className="posts__form" onSubmit={handleSubmit}>
                <label className="posts__title">New post</label>
                <Field
                    as="textarea"
                    name="newPostText"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.newPostText}
                    className="posts__input"
                    placeholder="What do you think about?"
                />
                {errors.newPostText && touched.newPostText && errors.newPostText}
                <button className="posts__button" type="submit" disabled={isSubmitting}>
                    Add post
                </button>
            </form>
        )}
    </Formik>
}
export default MyPosts;
