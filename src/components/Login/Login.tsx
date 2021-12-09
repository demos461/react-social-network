import React, {FC} from 'react';
import s from '../../styles/Login.module.css'
import {useFormik} from "formik";
import {connect} from 'react-redux';
import {login} from "../../redux/reducers/auth-reducer";
import {AppRootStateType} from "../../redux/store";
import {Redirect} from "react-router-dom";
import {memo} from 'react';


type LoginProps = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
    isAuth: boolean
    captchaUrl: string
}


type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}


const Login: FC<LoginProps> = memo(({login, isAuth, captchaUrl}) => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
            captcha: ''
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required'
            } else if (values.password && values.password.length <= 2) {
                errors.password = 'Password length must be more than two'
            }
            return errors;
        },

        onSubmit: values => {
            login(values.email, values.password, values.rememberMe, values.captcha)
            formik.resetForm()
        },
    })

    if (isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <form className={s.form} onSubmit={formik.handleSubmit}>
            <div>ACCOUNT LOGIN</div>

            <input
                type="text"
                placeholder={'E-mail'}
                {...formik.getFieldProps('email')}
            />

            {formik.touched.email &&
            formik.errors.email ? <div className={s.error}>{formik.errors.email}</div> : null}
            <input
                type="password"
                placeholder={'Password'}
                {...formik.getFieldProps('password')}
            />
            {formik.touched.password &&
            formik.errors.password ? <div className={s.error}>{formik.errors.password}</div> : null}

            {captchaUrl
                ? <div className={s.captcha}><img src={captchaUrl} alt="captcha"/>
                    <input
                        type="text"
                        placeholder={'Enter captcha'}
                        {...formik.getFieldProps('captcha')}
                    />
                </div>
                : null}

            <label>
                <input
                    type="checkbox"
                    onChange={formik.handleChange}
                    checked={formik.values.rememberMe}
                    name={'rememberMe'}/>
                remember me
            </label>

            <button className={s.btn} type={'submit'}>LOG IN</button>
        </form>
    );
});

const mapStateToProps = (state: AppRootStateType) => {
    return {
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl,
    }
}


export default connect(mapStateToProps, {login})(Login);