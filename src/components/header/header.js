import React from "react";

import './header.css'
import {NavLink} from "react-router-dom";
import TodoListContainer from "../todo-list/todo-list-container";
import Messages from "../messages/messages";
import InfoContainer from "../info/info-container";

export const contentComponents = [
    {component: <Messages/>, path: '/login', title: 'Login'},
    {component: <TodoListContainer/>, path: '/todo', title: 'TODO'},
    {component: <InfoContainer/>, path: '/info', title: 'Statistics'}
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