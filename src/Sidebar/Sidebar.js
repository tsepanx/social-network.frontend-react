import React from "react";

import s from './Sidebar.module.css'
import {NavLink} from "react-router-dom";

const Sidebar = (props) => {
    return (
        <div className={s.sidebar}>
            Sidebar

            <div className={s.item}><NavLink to='/posts'>Posts</NavLink></div>
            <div className={s.item}><NavLink to='/messages'>Messages</NavLink></div>

        </div>
    )
}

export default Sidebar