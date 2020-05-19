import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import {addPost, setStatus, setUser} from "../../redux/profile-reducer";

import './profile.css'

const mapStateToProps = (state) => ({...state.profile})

const ProfileContainer = (props) => {
    return (
        <React.Fragment>
            My Profile
            <Profile {...props}/>
        </React.Fragment>
    )
}

const Profile = (props) => {
    let {profilePhoto, status, posts} = props

    console.log(props)

    return (
        <div className='profile'>
            <div className="left bg-dark">
                <ProfilePhoto src={props.profilePhoto}/>
                <ProfileStatus text={props.status}/>
            </div>
            <div className='right'>
                <ProfilePosts items={props.posts}/>
            </div>
        </div>
    )
}

const ProfilePhoto = ({src}) => (
    <div className='photo'>
        <img src={src} alt='Profile image'/>
    </div>
)

const ProfileStatus = ({text}) => {
    return (
        <div className='status'>
            Status: {text}
        </div>
    )
}

const ProfilePosts = ({items}) => {
    let posts = items.map((value, index) =>
        <ProfilePost
            key={index}
            title={value.title}
            text={value.text}
        />
    )

    return (
        <div className="posts">
            Posts
            {posts}
        </div>
    )
}

const ProfilePost = ({title, text}) => {
    return (
        <div className="post card bg-dark">
            <div className="card-header">
                Title: {title}
            </div>
            <div className="card-body">
                Text: {text}
            </div>
        </div>
    )
}

export default compose(
    connect(mapStateToProps, {setStatus, addPost, setUser}),
    // withAuthRedirect
)(ProfileContainer)