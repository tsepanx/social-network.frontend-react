import React from 'react';
import {NavLink, useHistory, withRouter} from 'react-router-dom';

import './header.css'

import InfoContainer from '../info/info-container';
import Login from '../login/login';
import Profile from '../profile/profile';
import TodoList from '../todo-list/todo-list';
import {compose} from "redux";
import {connect} from "react-redux";
import Logout from "../logout/logout";
import StartPage from "../start-page/start-page";
import Settings from "../settings/settings";
import Feed from "../feed/feed";
import SignUp from "../signup/signup";
import Friends from "../friends/friends";
import Messages from "../messages/messages";

const loginItem = {component: <Login/>, path: '/login', title: 'Login'}
const logoutItem = {component: <Logout/>, path: '/logout', title: 'Logout'}
const signupItem = {component: <SignUp/>, path: '/join', title: 'Sign Up'}

const startPageItem = {component: <StartPage/>, path: '/', title: null}
const settingsItem = {component: <Settings/>, path: '/settings', title: null}


const profileItem = {component: <Profile/>, path: '/profile', title: 'Profile', exact: false}
const feedItem = {component: <Feed/>, path: '/feed', title: 'News'}
const friendsItem = {component: <Friends/>, path: '/friends', title: 'Friends'}
const messagesItem = {component: <Messages/>, path: '/messages', title: 'Messages'}

const todoListItem = {component: <TodoList/>, path: '/todo', title: 'TODO'}
const info = {component: <InfoContainer/>, path: '/stats', title: 'Statistics'}


export const contentComponents = [
    profileItem,
    feedItem,
    friendsItem,
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
        <NavLink key={index} to={value.path}>
            {value.title}
        </NavLink>
    </li>)

const itemToButton = (value, index) => {
    return (<SidebarButton {...value}/>)
}

let mapStateToProps = (state) => ({
    ...state.auth
});

const SidebarButton = withRouter(({component, path, title}) => {
    let history = useHistory()

    const onClick = () => {
        history.push(path)
    }

    return (
        <div className="btn" onClick={onClick}>{title}</div>
    )
})

const Header = (props) => {

    const usernameToLoggedTitle = username => `Logged: ${username}`

    const settingsItem = {component: <Settings/>, path: '/settings', title: usernameToLoggedTitle(props.credentials.username)}
    const profileItem = {component: <Profile/>, path: `/profile/${props.credentials.id}`, title: 'My Profile'}

    const leftHeaderItems = props.authorized ?
        [profileItem, feedItem, friendsItem, messagesItem, todoListItem, info] :
        []

    const rightHeaderContent = props.authorized ?
        [settingsItem, logoutItem] :
        [signupItem, loginItem]

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