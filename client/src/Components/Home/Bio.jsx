import defAvatar from '../../assets/avatar.webp'
import {useState} from "react";
import {Formik} from "formik";

const Bio = ({avatar, status, username}) => {

    const [editMode, setEditMode] = useState(false)
    const saveNewProfileData = (values) =>{
        alert(values.status)
    }
    return (
            <div className="home__bio bio">
                <div className='bio__photo'>
                    <img src={avatar|| defAvatar}
                         className="bio__avatar"/>
                    <input className="bio__avatar-edit" placeholder='value' type="file"/>
                </div>
                {editMode?<BioDescriptionForm saveNewProfileData={saveNewProfileData} avatar={avatar} status={status} username={username} setEditMode={setEditMode}/>:<BioDescription  avatar={avatar} status={status} username={username} setEditMode={setEditMode}/>}
            </div>
    );
}

const BioDescription = ({status, username, name, setEditMode})=>{

    return <div className="bio__description description">
        <div className="description__name">{name || "User"}</div>
        <div className="description__info">
            <div className="description__status">
                <span className="description__categories">Status: </span>
                {status || "something" }
            </div>
            <div className="description__username">
                <span className="description__categories">Username: </span>
                {username || "Something about me"}
            </div>
            <button onClick={()=>setEditMode(true)}>Edit</button>
        </div>
    </div>
}


const BioDescriptionForm = ({status, username, name, setEditMode, saveNewProfileData}) => {
    return (<Formik
        initialValues={{status, username, name}}
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
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
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