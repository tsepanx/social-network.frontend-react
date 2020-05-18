import React from "react";

import s from './Sidebar.module.css'
import {NavLink} from "react-router-dom";
import CardsContainer from "../cards/CardsContainer";
import Messages from "../messages/Messages";
import InfoContainer from "../info/InfoContainer";

export const contentComponents = [
    {component: <CardsContainer/>, path: '/posts', title: 'Cards'},
    {component: <Messages/>, path: '/messages', title: 'Messages'},
    {component: <InfoContainer/>, path: '/info', title: 'Statistics'}
]

const Sidebar = () => {
    let sidebarItems = contentComponents.map((value, index) =>
        <div className={s.item}>
            <NavLink
                key={index}
                to={value.path}
                activeClassName={s.activeLink}>
                {value.title}
            </NavLink>
        </div>
    )

    return (
        <div className={s.sidebar}>
            Sidebar
            {sidebarItems}
        </div>
    )
}

export default Sidebar