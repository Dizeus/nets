import { Formik } from 'formik';
import {login, signup} from "../../redux/user-reducer";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import React, {useState} from "react";
function Login({isAuth, login, signup}){

    const [isLoginForm, setIsLoginForm] = useState(true)

    return isAuth?
        <Navigate to="/home" replace={true}/>:
        (
            <div>
                <div className="auth-container">
                    <div className="auth-container-box">
                        <Formik
                            initialValues={{ email: '', password: '', confirmPassword: '',}}
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
                                isLoginForm?login(values.email, values.password): signup(values.email, values.password);
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
                                    <h2>{isLoginForm  ? 'Please log in' : 'Please sign up!'}</h2>
                                    <input
                                        type="email"
                                        name="email"
                                        className='auth-input'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                        placeholder={"Email"}
                                    />
                                    {errors.email && touched.email && errors.email}
                                    <input
                                        type="password"
                                        name="password"
                                        className='auth-input'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                        placeholder={"Password"}
                                    />
                                    {errors.password && touched.password && errors.password}
                                    {!isLoginForm && <input
                                        className='auth-input'
                                        required
                                        type="password"
                                        name='confirmPassword'
                                        placeholder="Confirm password"
                                        onBlur={handleBlur}
                                        value={values.title}
                                        onChange={handleChange}
                                    />}
                                    {status && <div>{status.error}</div>       }
                                    <input type="submit" className="auth-submit" disabled={isSubmitting}/>
                                </form>
                            )}
                        </Formik>
                        <div className="auth-options">
                            <button
                                onClick={() => setIsLoginForm(false)}
                                style={{backgroundColor : !isLoginForm ? 'rgb(255, 255, 255)' : 'rgb(188, 188, 188)'}}
                            >Sign Up</button>
                            <button
                                onClick={() => setIsLoginForm(true)}
                                style={{backgroundColor : isLoginForm ? 'rgb(255, 255, 255)' : 'rgb(188, 188, 188)'}}
                            >Login</button>
                        </div>
                    </div>
                </div>
            </div>
        );
}

const mapStateToProps = (state) =>({
    isAuth: state.user.isAuth,
})
export default connect(mapStateToProps, {login, signup})(Login);