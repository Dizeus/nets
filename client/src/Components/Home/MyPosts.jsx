import {Field, Formik} from "formik";
import React from "react";
import Post from "./Post";
import {useDispatch} from "react-redux";
import {addPost} from "../../redux/user-reducer";


function MyPosts({user}) {

    const dispatch = useDispatch()

    const onAddPost = (text) =>{
        dispatch(addPost(text, user.id))
    }

    return <div className="home__posts posts">
        <NewPostForm onAddPost={onAddPost}/>
        <h2 className="posts__title">My posts</h2>
        {user.posts?.map((post) => (
            <Post key={post._id} post={post}/>
        ))}
    </div>
}


let NewPostForm = ({onAddPost}) =>{



    return <Formik
        initialValues={{ newPostText: ''}}
        validate={values => {
            const errors = {};
            if (!values.newPostText) {
                errors.newPostText = 'Post can\'t be empty';
            } else if (values.newPostText.length>100) {
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
            <form className="posts__form form" onSubmit={handleSubmit}>
                <label className="form__title">New post</label>
                <Field
                    as="textarea"
                    name="newPostText"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.newPostText}
                    className="form__input"
                    placeholder="What do you think about?"
                />
                {errors.newPostText && touched.newPostText && errors.newPostText}
                <button className="form__btn" type="submit" disabled={isSubmitting}>
                    Add post
                </button>
            </form>
        )}
    </Formik>
}
export default MyPosts;
