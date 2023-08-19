import defAvatar from '../../assets/avatar.webp'
import {useState} from "react";
import {Formik} from "formik";
import {useDispatch} from "react-redux";
import {updateUserData, uploadAvatar} from "../../redux/user-reducer";
import {API_URL} from "../../config";

const Bio = ({avatar, status, username, id, fullname, isOwner}) => {

    const [editMode, setEditMode] = useState(false)
    const dispatch = useDispatch();
    const saveNewProfileData = (values) =>{
        dispatch(updateUserData(values, id))
    }
    return (
            <div className="home__bio bio">
                <div className='bio__photo'>
                    <img src={avatar?`${API_URL}${avatar}`:defAvatar}
                         className="bio__avatar"/>
                    {isOwner && <input className="bio__avatar-edit" placeholder='value' onChange={(e)=> {
                        dispatch(uploadAvatar(e.target.files[0]))
                    }} type="file"/>}
                </div>
                {editMode?
                        <BioDescriptionForm fullname={fullname} saveNewProfileData={saveNewProfileData} avatar={avatar}
                                            status={status} username={username} setEditMode={setEditMode}/> :
                        <BioDescription isOwner={isOwner} avatar={avatar} fullname={fullname} status={status} username={username}
                                        setEditMode={setEditMode}/>
                }
            </div>
    );
}

const BioDescription = ({status, username, fullname, setEditMode, isOwner})=>{

    return <div className="bio__description description">
        <div className="description__name">{fullname || "User"}</div>
        <div className="description__info">
            <div className="description__status">
                <span className="description__categories">Status: </span>
                {status || "something" }
            </div>
            <div className="description__username">
                <span className="description__categories">Username: </span>
                {username || "Something about me"}
            </div>
            {isOwner && <button onClick={() => setEditMode(true)}>Edit</button>}
        </div>
    </div>
}


const BioDescriptionForm = ({status, username, fullname, setEditMode, saveNewProfileData}) => {
    return (<Formik
        initialValues={{status: status || '', username: username || '', fullname: fullname || ''}}
        validate={values => {
            const errors = {};

            /*if (!values.aboutMe) {
                errors.aboutMe = 'Required';
            } else if (!values.fullName) {
                errors.aboutMe = 'Required';
            }else if (!values.lookingForAJobDescription) {
                errors.lookingForAJobDescription = 'Required';
            }
            */
            return errors;

        }}
        onSubmit={(values, { setSubmitting, setStatus }) => {
            saveNewProfileData(values)
            setEditMode(false)
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
              status,
          }) => (

            <form style={{display: 'flex', flexDirection: 'column', rowGap:'10px'}} onSubmit={handleSubmit}>
                <div className="">Fullname</div>
                <input
                    type="text"
                    name="fullname"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.fullname}
                    placeholder={"Fullname"}
                />
                <div className="">Status:</div>
                <input
                    type="text"
                    name="status"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.status}
                    placeholder={"Status"}
                />
                {errors.aboutMe && touched.aboutMe && errors.aboutMe}
                <div className="">Username</div>
                <input
                    type="text"
                    name="username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                />
                {errors.lookingForAJobDescription && touched.lookingForAJobDescription && errors.lookingForAJobDescription}
                <button type="submit" disabled={isSubmitting}>
                    save
                </button>
            </form>
        )}
    </Formik>)
}
export default Bio;