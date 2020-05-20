import React from 'react';
import {NavLink} from 'react-router-dom';

import './header.css'

import InfoContainer from '../info/info-container';
import Login from '../login/login';
import Profile from '../profile/profile';
import TodoList from '../todo-list/todo-list';

const leftItems = [
    {component: <Profile/>, path: '/profile', title: 'Profile'},
    {component: <TodoList/>, path: '/todo', title: 'TODO'},
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