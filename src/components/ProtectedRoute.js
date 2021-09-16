import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class ProtectedRoute extends Component {
    render() {
        const Component = this.props.component;


        const isAuthenticated = this.props.authenticated;

        return isAuthenticated ? (
            <Component />
        ) : (
                <Redirect to='/login' />
            );
    }
}

const mapStateToProps = ({ appAuth: { authenticated } }) => ({
    authenticated
});

export default connect(mapStateToProps, null)(ProtectedRoute);