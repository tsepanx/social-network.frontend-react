import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import {addPost, setStatus, setUser} from "../../redux/profile-reducer";

const mapStateToProps = (state) => ({...state.profile})

const ProfileContainer = (props) => {
    return (<Profile {...props}/>)
}

const Profile = (props) => {
    let {profilePhoto, status, posts} = props

    console.log(props)

    return (
        <div>

        </div>
    )
}

export default compose(
    connect(mapStateToProps, {setStatus, addPost, setUser}),
    withAuthRedirect
)(ProfileContainer)