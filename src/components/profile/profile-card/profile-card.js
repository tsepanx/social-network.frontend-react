import React from "react";
import {NavLink} from "react-router-dom";
import {compose} from "redux";
import {connect} from "react-redux";

import './profile-card.css'
import DEFAULT_PROFILE_IMAGE from '../../../assets/profile.png'

const ProfileCard = (props) => {
    let key = props.id
    let {profile_photo} = props

    if (!profile_photo)
        profile_photo = DEFAULT_PROFILE_IMAGE

    return (
        <div className='profile-card bg-dark'>
            <img src={profile_photo}/>
            <div className="info">
                <h6>Username: {props.username}</h6>
                <h6>Status: {props.status}</h6>
                {/*<a href={`/profile/${props.id}`}>Profile page</a>*/}
                <NavLink key={key} to={`/profile/${props.id}`}>Profile page</NavLink>
            </div>
            <div><div className="btn btn-info">Follow</div></div>
        </div>
    )
}

const mapStateToProps = (state) => ({

})

export default compose(
    connect(mapStateToProps, {})
)(ProfileCard)