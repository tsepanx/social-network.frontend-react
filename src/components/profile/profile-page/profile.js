import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {resetProfile, setProfile} from "../../../redux/profile-reducer";

import './profile.css'

import {FriendsApi, ProfileApi} from "../../../api/api";
import withData from "../../hoc/with-data";
import {Friends} from "../friends/friends";
import {withAuth} from "../../hoc/with-auth";

const getData = async (props) => {
    let profile = await ProfileApi.getProfile(props.id)
    let friends = await FriendsApi.getRelationships(props.id)

    profile = profile.data
    friends = friends.data

    return {profile, friends}
}

const onLoaded = async (props, data) => {
    let {profile, friends} = data

    try {
        props.setProfile({
            ...profile,
            profilePhoto: profile["profile_photo"],
            friends
        })
    } catch (e) {
        debugger
        props.resetProfile();
    }
}

const onError = async (props, err) => {
    debugger
    let status = err.response.status

    switch (status) {
        case 401:
            props.submitLogout()
            break
        case 404:
            props.resetProfile()
            props.setProfile({
                loaded: true
            })
    }
}

let ProfileContainer = (props) => {
    let id = props.match.params.userId

    return (<Profile {...props} id={id}/>)
}

let Profile = ({profile}) => { // TODO /profile/id:userId link to profile
    let {profilePhoto, username, status, posts, friends} = profile

    return (
        <div className='profile'>
            <div className="row">
                <div className="col-md-3">
                    <div className="left bg-dark">
                        <ProfilePhoto src={profilePhoto}/>
                        <ProfileInfo status={status} username={username}/>
                    </div>
                </div>

                <div className="col-md-8">
                    <div className='right'>
                        <ProfilePosts items={posts}/>
                        <div className="profile-friends">
                            <Friends list={friends}/>
                        </div>
                    </div>
                </div>
            </div>
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
            <div>{posts}</div>
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

const ProfilePhoto = ({src}) => {
    return (
        <div className='photo'>
            <img src={src} alt={'alt'}/>
        </div>
    )
}

const ProfileInfo = ({username, status}) => {
    return (
        <div className='profile-info'>
            <h6>Username: {username}</h6>
            <h6>Status: {status}</h6>
        </div>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile
})

ProfileContainer = compose(
    withAuth(false)
)(ProfileContainer)

Profile = compose(
    connect(mapStateToProps, {resetProfile, setProfile}),
    withData(getData, onLoaded, onError, null),
)(Profile)

export {Profile, ProfileContainer}