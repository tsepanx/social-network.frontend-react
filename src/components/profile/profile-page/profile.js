import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {resetProfile, setProfile} from "../../../redux/profile-reducer";

import DEFAULT_PROFILE_IMAGE from '../../../assets/profile.png'
import TRANSPARENT_PROFILE_IMAGE from '../../../assets/transparent_profile.png'
import './profile.css'

import {ProfileApi} from "../../../api/api";
import withData from "../../hoc/with-data";

const getData = async (props) => {
    let r = await ProfileApi.getProfile(props.id)
    return r.data
}

const onLoaded = async (props, data) => {
    try {
        props.setProfile({...data,
            profilePhoto: data.profile_photo,
        })
    } catch (e) {
        props.resetProfile()
    }
}

const onError = async (props, err) => {
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


const ProfileContainer = (props) => {
    let {profilePhoto} = props.profile

    if (!profilePhoto)
        profilePhoto = props.auth.authorized ?
            DEFAULT_PROFILE_IMAGE :
            TRANSPARENT_PROFILE_IMAGE

    return (
        <div>
            Profile
            <Profile {...props.profile} profilePhoto={profilePhoto} />
        </div>
    )
}

const Profile = ({profilePhoto, status, posts}) => {

    return (
        <div className='profile'>
            <div className="row">
                <div className="col-md-3">
                    <div className="left bg-dark">
                        <ProfilePhoto src={profilePhoto}/>
                        {/*Username: {props.auth.credentials.username}*/}
                        <ProfileStatus text={status}/>
                    </div>
                </div>

                <div className="col-md-8">
                    <div className='right'>
                        <ProfilePosts items={posts}/>
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

const ProfileStatus = ({text}) => {
    return (
        <div className='status'>
            Status: {text}
        </div>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile
})

export default compose(
    connect(mapStateToProps, {resetProfile, setProfile}),
    withData(getData, onLoaded, onError),
)(ProfileContainer)