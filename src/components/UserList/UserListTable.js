import React, { Component, useState } from 'react'
import Spinner from "../spinner"
import { WithUsersService } from "../../hoc"
import { compose } from "../../utils"
import { connect } from "react-redux"
import ErrorIndicator from "../../error-indicator"
import styles from "./UserListTable.module.css"
import { Helmet } from "react-helmet"

import { fetchUsers } from "../../actions/users"
import { onFindUsername } from '../../actions/find'
import { sortById } from "../../actions/sort"

import _ from "lodash"


const UserListTable = ({ users, find, sortAsc }) => {

    const [findUsername, setFindUsername] = useState("")

    const onSort = (e) => {
        let res;
        e.target.dataset.id === "asc" ?
            res = _.orderBy(users, ['id', 'id'], ['asc', 'desc']) : res = _.orderBy(users, ['id', 'id'], ['desc', 'asc'])
        sortAsc(res)
    }

    return (
        <React.Fragment>
            <Helmet>
                <title>Emphasoft Пользователи</title>
                <meta
                    name='description'
                    content='login page'
                />
            </Helmet>
            <div className={styles.container}>
                <h4 className={styles.users__search}>Поиск по username:</h4>
                <div className={styles.users__form}>
                    <input className={styles.users__form__input} type="text" onChange={e => setFindUsername(e.target.value)} />
                    <button className={styles.users__form__button} onClick={() => find(findUsername)}>Найти</button>
                </div>
                <div className={styles.users__sort_btns}>
                    <button className={styles.users__sort_btn}><small data-id="asc" onClick={(e) => onSort(e)}>▲</small></button>
                    <button className={styles.users__sort_btn}><small data-id="desc" onClick={(e) => onSort(e)}>▼</small></button>
                </div>
                <table>
                    <thead >
                        <tr >
                            <th>#</th>
                            <th style={{ cursor: "pointer" }}><small data-id="asc" onClick={(e) => onSort(e)}>▲</small>
                                <small data-id="desc" onClick={(e) => onSort(e)}>▼</small> ID </th>
                            <th>Username</th>
                            <th>Имя</th>
                            <th>Фамилия</th>
                        </tr>
                    </thead>
                    <tbody >
                        {
                            users.map((user, idx) => {
                                const { id, username, first_name, last_name } = user
                                return (
                                    <tr key={id}>
                                        <td data-label="#">{idx + 1}</td>
                                        <td data-label="ID">{id}</td>
                                        <td data-label="Username">{username}</td>
                                        <td data-label="Имя">{first_name}</td>
                                        <td data-label="Фамилия">{last_name}</td>
                                    </tr>
                                )
                            })
                        }


                    </tbody>
                </table>
            </div>
        </React.Fragment>

    )
}

class UsersListContainer extends Component {


    componentDidMount() {
        this.props.fetchUsers()
    }

    render() {
        const { users, loading, error, find, sortAsc, authenticated } = this.props

        if (loading) {
            return <Spinner />
        }
        if (error) {
            return <ErrorIndicator />
        }
        return <UserListTable authenticated={authenticated} users={users} find={find} sortAsc={sortAsc} />
    }
}

const mapStateToProps = ({ appUsers: { users, loading, error }, appFind: { findUsername }, appAuth : {authenticated} }) => {

    return {
        users: users.filter(user => user["username"].toLowerCase().includes(findUsername.toLowerCase())),
        loading,
        error,
        findUsername,
        authenticated
    }
}


const mapDispatchToProps = (dispatch, ownProps) => {

    const { usersService } = ownProps

    return {
        fetchUsers: fetchUsers(usersService, dispatch),
        find: (input) => dispatch(onFindUsername(input)),
        sortAsc: (sorted) => dispatch(sortById(sorted))
    }

}


export default compose(
    WithUsersService(),
    connect(mapStateToProps, mapDispatchToProps))(UsersListContainer)