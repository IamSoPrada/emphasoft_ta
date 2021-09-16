import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import { login } from "../actions/auth";
import styles from "./Login.module.css";

const Login = ({ login, authenticated }) => {
  const initialValues = {
    username: "",
    password: "",
  };
  const validationSchema = Yup.object({
    username: Yup.string()
      .max(15, "Не более 15 символов")
      .required("Введите username."),
    password: Yup.string().required("Введите пароль."),
  });

  const onSubmit = (e) => {
    const formData = {
      username: e.username,
      password: e.password,
    };
    login(formData);
  };

  if (authenticated) return <Redirect to='/' />;

  return (
    <div className={styles.auth}>
      <Helmet>
        <title>Emphasoft Авторизация</title>
        <meta name='description' content='login page' />
      </Helmet>

      <h1 className='auth__title'>Авторизация</h1>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(e) => onSubmit(e)}>
        <Form className={styles.auth__form}>
          <div>
            <label htmlFor='username'>Username</label>
            <Field
              className={styles.auth__form__input}
              name='username'
              type='text'
            />
            <div className={styles.auth__form_error}>
              <ErrorMessage name='username' />
            </div>
          </div>

          <div>
            <label htmlFor='password'>Пароль</label>
            <Field
              className={styles.auth__form__input}
              name='password'
              type='password'
            />
            <div className={styles.auth__form_error}>
              <ErrorMessage name='password' />
            </div>
          </div>

          <button className={styles.auth__form__button} type='submit'>
            Войти
          </button>
        </Form>
      </Formik>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  authenticated: PropTypes.bool,
};

const mapStateToProps = ({ appAuth: { authenticated } }) => {
  return {
    authenticated,
  };
};

export default connect(mapStateToProps, { login })(Login);
