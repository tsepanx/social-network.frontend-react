import React from 'react';
import {NavLink} from 'react-router-dom';

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

const loginItem = {component: <Login/>, path: '/login', title: 'Login'}
const logoutItem = {component: <Logout/>, path: '/logout', title: 'Logout'}

const startPageItem = {component: <StartPage/>, path: '/', title: null}
const settingsItem = {component: <Settings/>, path: '/settings', title: null}


const profileItem = {component: <Profile/>, path: '/profile', title: 'Profile'}
const todoListItem = {component: <TodoList/>, path: '/todo', title: 'TODO'}
const info = {component: <InfoContainer/>, path: '/stats', title: 'Statistics'}

export const contentComponents = [profileItem, todoListItem, info, loginItem, logoutItem, startPageItem, settingsItem]

const leftItems = [profileItem, todoListItem, info]
const rightItems = [loginItem]

const itemToNavLink = (value, index) =>
    (<li>
        <NavLink key={index} to={value.path}>
            {value.title}
        </NavLink>
    </li>)

let mapStateToProps = (state) => ({
    ...state.auth
});

const Header = (props) => {

    const userProfileItem = {component: <Settings/>, path: '/settings', title: props.credentials.username}

    const rightHeaderContent = props.authorized ?
        [userProfileItem, logoutItem] :
        rightItems

    return (
        <div className='header'>
            <ul className='d-flex'>{leftItems.map(itemToNavLink)}</ul>
            <ul className='d-flex'>{rightHeaderContent.map(itemToNavLink)}</ul>
        </div>
    )
}



export default compose(
    connect(mapStateToProps)
)(Header)