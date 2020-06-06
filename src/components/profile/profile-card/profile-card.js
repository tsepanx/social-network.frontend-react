import {compose} from "redux";
import {connect} from "react-redux";
import React from "react";

import './profile-card.css'

const ProfileCard = (props) => {

    return (
        <div className='profile-card bg-dark'>
            <img src={props.profile_photo}/>
            <div className="info">
                <h6>Username: {props.username}</h6>
                <h6>Status: {props.status}</h6>
                <a href={`/profile/${props.id}`}>Profile page</a>
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