import React from 'react';
import {NavLink} from 'react-router-dom';

import './header.css'

import {compose} from "redux";
import {connect} from "react-redux";

import InfoContainer from '../info/info-container';
import Login from '../login/login';
import AuthedUserPage from "../content/authed-user-page";
import TodoList from '../todo-list/todo-list';
import Logout from "../logout/logout";
import StartPage from "../start-page/start-page";
import Settings from "../settings/settings";
import Feed from "../feed/feed";
import SignUp from "../signup/signup";
import Messages from "../messages/messages";
import {ProfileContainer} from "../profile/profile-page/profile";

const loginItem = {component: Login, path: '/login', title: 'Login'}
const logoutItem = {component: Logout, path: '/logout', title: 'Logout'}
const signupItem = {component: SignUp, path: '/join', title: 'Sign Up'}

const startPageItem = {component: StartPage, path: '/'}
const settingsItem = {component: Settings, path: '/settings'}


const authedProfileItem = {component: AuthedUserPage, path: '/me', title: 'Profile'}
const profileItem = {component: ProfileContainer, path: '/profile/:userId', exact: false}
const feedItem = {component: Feed, path: '/feed', title: 'News'}
const messagesItem = {component: Messages, path: '/messages', title: 'Messages'}

const todoListItem = {component: TodoList, path: '/todo', title: 'TODO'}
const info = {component: InfoContainer, path: '/stats', title: 'Statistics'}

export const contentComponents = [
    authedProfileItem,
    profileItem,
    feedItem,
    messagesItem,

    todoListItem,
    info,

    loginItem,
    logoutItem,
    signupItem,

    startPageItem,
    settingsItem
]

const itemToNavLink = (value, index) =>
    (<li>
        <NavLink key={index} to={{pathname: value.path}}>
            {value.title}
        </NavLink>
    </li>)

let mapStateToProps = (state) => ({
    ...state.auth
});

const Header = (props) => {

    const usernameToLoggedTitle = username => `Logged: ${username}`

    let leftHeaderItems = []
    let rightHeaderContent = [signupItem, loginItem]

    if (props.authorized) {
        const settingsItem = {component: Settings, path: '/settings', title: usernameToLoggedTitle(props.credentials.username)}

        leftHeaderItems = [authedProfileItem, feedItem, messagesItem, todoListItem, info]
        rightHeaderContent = [settingsItem, logoutItem]
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