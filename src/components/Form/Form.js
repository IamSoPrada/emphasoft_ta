import React from "react";
import { connect } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Helmet } from "react-helmet";
import { editUser } from "../../actions/users";
import PropTypes from "prop-types";
import styles from "../../Pages/Login.module.css";

const EditUserForm = ({ editUser, authenticated, idUser, username, firstName,  lastName }) => {
    const initialValues = {
        username: "",
        firstName: "",
        lastName: "",
        password: "",
    };
    const validationSchema = Yup.object({
        username: Yup.string()
            .max(15, "Не более 15 символов")
            .required("Введите username."),
        firstName: Yup.string()
            .max(15, "Не более 15 символов")
            .required("Введите Имя."),
        lastName: Yup.string()
            .max(20, "Не более 20 символов.")
            .required("Введите Фамилию."),
        password: Yup.string()
            .required("Введите пароль.")
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&<>])[A-Za-z\d@$!%*#?&<>]{8,}$/,
                "Пароль должен содержать не менее 8 символов,\nзаглавную букву,\nцифру и один из специальных символов @$!%*#?&<> !"
            ),
    });

    const onSubmit = (e) => {
        const formData = {
            id: idUser,
            username: e.username,
            first_name: e.firstName,
            last_name: e.lastName,
            password: e.password,
            is_active: true,
        };
        editUser(formData);
    };
        return (
            <div className={styles.auth}>
                <Helmet>
                    <title>Добавить пользователя</title>
                    <meta name='description' content='create user page' />
                </Helmet>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(e) => onSubmit(e)}
                >
                    <Form className={styles.auth__form}>
                        <div>
                            <label htmlFor='username'>Username</label>
                            <Field
                                className={styles.auth__form__input}
                                name='username'
                                type='text'
                                placeholder ={username}
                            />
                            <div className={styles.auth__form_error}>
                                <ErrorMessage name='username' />
                            </div>
                        </div>
                        <div>
                            <label htmlFor='firstName'>Имя</label>
                            <Field
                                className={styles.auth__form__input}
                                name='firstName'
                                type='text'
                                placeholder ={firstName}
                            />
                            <div className={styles.auth__form_error}>
                                <ErrorMessage name='firstName' />
                            </div>
                        </div>

                        <div>
                            <label htmlFor='lastName'>Фамилия</label>
                            <Field
                                className={styles.auth__form__input}
                                name='lastName'
                                type='text'
                                placeholder ={lastName}
                            />
                            <div className={styles.auth__form_error}>
                                <ErrorMessage name='lastName' />
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
                            Сохранить
                        </button>
                    </Form>
                </Formik>
            </div>
        );
    }


EditUserForm.propTypes = {
    editUser: PropTypes.func.isRequired,
    authenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
    authenticated: state.appAuth.authenticated,
});

export default connect(mapStateToProps, { editUser })(EditUserForm);