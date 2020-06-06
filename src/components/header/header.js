import React from 'react';
import {NavLink} from 'react-router-dom';

import './header.css'

import {compose} from "redux";
import {connect} from "react-redux";
import pages from "../content/content-items";

const items = {
    login: [...pages.login, 'Login'],
    logout: [...pages.logout, 'Logout'],
    signup: [...pages.signup, 'Sign Up'],

    me: [...pages.me, 'My profile'],
    feed: [...pages.feed, 'News'],
    messages: [...pages.messages, 'Messages'],
    tasks: [...pages.tasks, 'My tasks'],
    info: [...pages.info, 'My info']
}

const itemToNavLink = (value, index) => {
    const path = value[1]
    const title = value[2]

    return (<li>
        <NavLink key={index} to={path}>{title}</NavLink>
    </li>)
}

let mapStateToProps = (state) => ({
    ...state.auth
});

const Header = (props) => {

    let leftHeaderItems = []
    let rightHeaderContent = [
        items.signup,
        items.login
    ]

    if (props.authorized) {
        const loggedTitle = name => `Logged: ${name}`

        leftHeaderItems = [
            items.me,
            items.feed,
            items.messages,
            items.tasks,
            items.info
        ]

        rightHeaderContent = [
            [...pages.settings, loggedTitle(props.credentials.username)],
            items.logout
        ]
    }

    return (
        <div className='header'>
            <ul className='d-flex left'>{leftHeaderItems.map(itemToNavLink)}</ul>
            <ul className='d-flex right'>{rightHeaderContent.map(itemToNavLink)}</ul>
        </div>
    )
}



export default compose(
    connect(mapStateToProps)
)(Header)