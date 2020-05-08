import React from "react";

import s from './Sidebar.module.css'
import {NavLink} from "react-router-dom";

const Sidebar = (props) => {
    return (
        <div className={s.sidebar}>
            Sidebar

            <div className={s.item}><NavLink to='/posts' activeClassName={s.activeLink}>Posts</NavLink></div>
            <div className={s.item}><NavLink to='/messages' activeClassName={s.activeLink}>Messages</NavLink></div>

        </div>
    )
}

export default Sidebar