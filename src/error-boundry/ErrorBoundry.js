import React, { Component } from 'react'
import ErrorIndicator from "../error-indicator"

export default class ErrorBoundry extends Component {
    state = {
        errorOccur: false
    }

    componentDidCatch() {
        this.setState({
            errorOccur: true
        })
    }

    render() {
        if (this.state.errorOccur) {
            return (
                <ErrorIndicator />
            )
        }
        return this.props.children
    }
}
