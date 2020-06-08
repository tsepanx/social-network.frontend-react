import React from "react";
import {NavLink} from "react-router-dom";
import {compose} from "redux";
import {connect} from "react-redux";

import './profile-card.css'
import DEFAULT_PROFILE_IMAGE from '../../../assets/profile.png'

const ProfileCard = ({id, username, status, profile_photo, onClick}) => {
    let key = id

    if (!profile_photo)
        profile_photo = DEFAULT_PROFILE_IMAGE

    return (
        <div className='profile-card bg-dark'>
            <img src={profile_photo}/>
            <div className="info">
                <h6>Username: {username}</h6>
                <h6>Status: {status}</h6>
                <NavLink key={key} to={`/profile/${id}`}>Profile page</NavLink>
            </div>
            {onClick && <div><div className="btn btn-info" id={key} onClick={onClick}>Follow</div></div>}
        </div>
    )
}

const mapStateToProps = (state) => ({

})

export default compose(
    connect(mapStateToProps, {})
)(ProfileCard)