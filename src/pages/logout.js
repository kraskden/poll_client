import React, { Component } from 'react'
import Net from '../net/net';

export default class LogoutPage extends Component {

    constructor(props) {
        super(props);
        Net.logout()
        props.onUserChange();
        props.history.replace('/');
    } 

    render() {
        return <> </>;
    }
}