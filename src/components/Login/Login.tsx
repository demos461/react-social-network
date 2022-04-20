import React, { FC } from 'react';
import s from 'components/Login/style/Login.module.scss';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { login } from 'redux/reducers/auth-reducer';
import { AppRootStateType } from 'redux/store';
import { Redirect } from 'react-router-dom';
import { FormikErrorType } from './types';

export const Login: FC = () => {
  const isAuth = useSelector<AppRootStateType, boolean>(state => state.auth.isAuth);
  const captchaUrl = useSelector<AppRootStateType, string>(
    state => state.auth.captchaUrl,
  );
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
      captcha: '',
    },
    validate: values => {
      const errors: FormikErrorType = {};
      if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }
      if (!values.password) {
        errors.password = 'Required';
      } else if (values.password && values.password.length <= 2) {
        errors.password = 'Password length must be more than two';
      }
      return errors;
    },

    onSubmit: values => {
      dispatch(login(values.email, values.password, values.rememberMe, values.captcha));
      formik.resetForm();
    },
  });

  if (isAuth) {
    return <Redirect to={'/profile'} />;
  }

  return (
    <form className={s.form} onSubmit={formik.handleSubmit}>
      <div className={s.account}>
        <p>Test account:</p>
        <p>Email: free@samuraijs.com</p>
        <p>Password: free</p>
      </div>
      <div className={s.title}>Login into your account</div>

      <input
        type="text"
        placeholder={'Your E-mail Address'}
        {...formik.getFieldProps('email')}
      />
      <div className={s.error}>
        {formik.touched.email && formik.errors.email ? formik.errors.email : ''}
      </div>
      <input
        type="password"
        placeholder={'Password'}
        {...formik.getFieldProps('password')}
      />
      <div className={s.error}>
        {formik.touched.password && formik.errors.password ? formik.errors.password : ''}
      </div>
      {captchaUrl ? (
        <div className={s.captcha}>
          <img src={captchaUrl} alt="captcha" />
          <input
            type="text"
            placeholder={'Enter captcha'}
            {...formik.getFieldProps('captcha')}
          />
        </div>
      ) : null}

      <label>
        <input
          type="checkbox"
          onChange={formik.handleChange}
          checked={formik.values.rememberMe}
          name={'rememberMe'}
        />
        remember me
      </label>

      <button className={s.btn} type={'submit'}>
        LOG IN
      </button>
    </form>
  );
};
