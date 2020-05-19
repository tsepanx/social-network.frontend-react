import React from "react";

import './header.css'
import {NavLink} from "react-router-dom";
import TodoListContainer from "../todo-list/todo-list-container";

import InfoContainer from "../info/info-container";
import Login from "../login/login";
import Profile from "../profile/profile";

const leftItems = [
    {component: <Profile/>, path: '/profile', title: 'Profile'},
    {component: <TodoListContainer/>, path: '/todo', title: 'TODO'},
    {component: <InfoContainer/>, path: '/stats', title: 'Statistics'},
]

const rightItems = [
    {component: <Login/>, path: '/login', title: 'Login'}
]

export const contentComponents = [...leftItems, ...rightItems]

console.log(contentComponents)

const itemToNavLink = (value, index) =>
    (<li>
        <NavLink key={index} to={value.path}>
            {value.title}
        </NavLink>
    </li>)

let leftHeaderItems = leftItems.map(itemToNavLink)
let rightHeaderItems = rightItems.map(itemToNavLink)

const Header = () => {

    return (
        <div className='header'>
            <ul className='d-flex'>{leftHeaderItems}</ul>
            <ul className='d-flex'>{rightHeaderItems}</ul>
        </div>
    )
}

export default Header