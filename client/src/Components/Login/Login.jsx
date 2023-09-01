import { Formik } from 'formik';
import {login, signup} from "../../redux/user-reducer";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import React, {useState} from "react";
import '../../styles/css/Login.css'
function Login({isAuth, login, signup}){

    const [isLoginForm, setIsLoginForm] = useState(true)

    return isAuth?
        <Navigate to="/home" replace={true}/>:
        (
            <div className="auth">
                <div className="auth__content">
                    <Formik
                            initialValues={{ email: '', fullname: '', password: '', confirmPassword: '',}}
                            validate={values => {
                                const errors = {};
                                if (!isLoginForm && values.password != values.confirmPassword) {
                                    errors.confirmPassword = 'Passwords should be identical';
                                }else if(!isLoginForm && values.password === values.confirmPassword){
                                    delete errors.confirmPassword
                                }else if(values.password.length<3 ||  values.password.length>20){
                                    errors.password = "Password length should be longer than 3 and shorter than 20"
                                }
                                return errors;

                            }}
                            onSubmit={(values, { setSubmitting, setStatus }) => {
                                isLoginForm?login(values.email, values.password): signup(values.email, values.password, values.fullname);
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
                                  /* and other goodies */
                              }) => (

                                <form style={{display: 'flex', flexDirection: 'column', rowGap:'10px'}} onSubmit={handleSubmit}>
                                    <p className='auth__label'>Email</p>
                                    <input
                                        type="email"
                                        name="email"
                                        className='auth__input'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                        placeholder={"Email"}
                                    />
                                    {errors.email && touched.email && errors.email}
                                    {!isLoginForm &&
                                        <>
                                            <p className='auth__label'>Fullname</p>
                                            <input
                                                type="text"
                                                name="fullname"
                                                className='auth__input'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.fullname}
                                                placeholder={"Fullname"}
                                            />
                                        </>}
                                    <p className='auth__label'>Password</p>
                                    <input
                                        type="password"
                                        name="password"
                                        className='auth__input'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                        placeholder={"Password"}
                                    />
                                    {errors.password && touched.password && errors.password}
                                    {!isLoginForm &&
                                        <>
                                            <p className='auth__label'>Confirm password</p>
                                            <input
                                                className='auth__input'
                                                required
                                                type="password"
                                                name='confirmPassword'
                                                placeholder="Confirm password"
                                                onBlur={handleBlur}
                                                value={values.title}
                                                onChange={handleChange}
                                            />
                                        </>}

                                    {status && <div>{status.error}</div>       }
                                    <input type="submit" value={isLoginForm?'Sign in': "Sign up"} className="auth__submit button" disabled={isSubmitting}/>
                                    {isLoginForm && <button type='button' onClick={()=>login('JohnDoe@gmail.com', 'test123')} className='auth__test'>Use test account</button>}
                                </form>
                            )}
                        </Formik>
                        <div className="auth__options">
                            <button className={isLoginForm?'auth__option':'auth__option_active'}
                                onClick={() => setIsLoginForm(false)}
                                style={{backgroundColor : !isLoginForm ? '#447094' : 'rgb(255, 255, 255)'}}
                            >Sign Up</button>
                            <button className={isLoginForm?'auth__option_active':'auth__option'}
                                onClick={() => setIsLoginForm(true)}
                                style={{backgroundColor : isLoginForm ? '#447094' : 'rgb(255, 255, 255)'}}
                            >Login</button>
                        </div>
                    </div>
            </div>
        );
}

const mapStateToProps = (state) =>({
    isAuth: state.user.isAuth,
})
export default connect(mapStateToProps, {login, signup})(Login);