import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {resetProfile, setProfile} from "../../../redux/profile-reducer";

import './profile.css'
import DEFAULT_PROFILE_IMAGE from '../../../assets/profile.png'

import {FriendsApi, ProfileApi} from "../../../api/api";
import withData from "../../hoc/with-data";
import ProfileCard from "../profile-card/profile-card";
import {submitLogout} from "../../../redux/auth-reducer";

const shouldObtainData = props => {
    return (props.id !== props.profile.id)
}


const getData = async (props) => {
    let id = props.id

    let profile = await ProfileApi.getProfile(id)
    let friends = await FriendsApi.getRelationships(id)

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
        props.resetProfile();
    }
}

const onError = async (props, status) => {
    const UNAUTHORIZED = 401
    const NOT_FOUND = 404

    if (status === UNAUTHORIZED)
        props.submitLogout()
    if (status === NOT_FOUND)
        props.resetProfile(true)
}

let Profile = ({profile}) => { // TODO /profile/id:userId link to profile
    let {profilePhoto, username, status, posts, friends} = profile

    if (!profilePhoto) {
        profilePhoto = DEFAULT_PROFILE_IMAGE
    }

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

const Friends = ({list}) => {
    const friendsToCards = (value, index) => {
        return <ProfileCard
            key={index}
            {...value}
        />
    }

    return (
        <div>
            <h3>Friends</h3>
            {list.map(friendsToCards)}
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
    profile: state.profile
})

Profile = compose(
    connect(mapStateToProps, {resetProfile, setProfile, submitLogout}),
    withData(
        getData, onLoaded, onError,
        shouldObtainData,
        props => [props.id],
        null),
)(Profile)

export {Friends}

export default Profile