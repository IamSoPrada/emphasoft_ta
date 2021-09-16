import React from 'react'
import { Link } from "react-router-dom"
import styles from "./Header.module.css"
import { logout } from "../../actions/auth"
import {connect} from "react-redux"

const Header = ({logout, authenticated}) => {

    return (
        <div className={styles.header}>
            <Link className={styles.header__title} to='/'> Emphasoft Test Assignment</Link>
            {
                authenticated ? <button onClick={()=> logout()} className={styles.header__close__btn}>Выйти</button> : null
            }
        </div>
    )
}

const mapStateToProps = ({appAuth:{token}}) => {
    return {
        authenticated: token
    }
}



export default connect(mapStateToProps, {logout})(Header);