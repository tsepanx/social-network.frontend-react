import React from "react";

import './header.css'
import {NavLink} from "react-router-dom";
import TodoListContainer from "../todo-list/todo-list-container";

import InfoContainer from "../info/info-container";
import Login from "../login/login";
import Profile from "../profile/profile";

export const contentComponents = [
    {component: <Profile/>, path: '/profile', title: 'Profile'},
    {component: <TodoListContainer/>, path: '/todo', title: 'TODO'},
    {component: <InfoContainer/>, path: '/info', title: 'Statistics'},
    {component: <Login/>, path: '/login', title: 'Login'}
]

const Header = () => {
    let headerItems = contentComponents.map((value, index) =>
        <li>
            <NavLink key={index} to={value.path}>
                {value.title}
            </NavLink>
        </li>
    )

    return (
        <div className='header'>
            <ul className='d-flex'>
                {headerItems}
            </ul>
        </div>
    )
}

export default Header