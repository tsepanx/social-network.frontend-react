import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {addPost, resetProfile} from "../../../redux/profile-reducer";

import DEFAULT_PROFILE_IMAGE from '../../../assets/profile.png'
import TRANSPARENT_PROFILE_IMAGE from '../../../assets/transparent_profile.png'
import './profile.css'

import {withAuth} from "../../hoc/with-auth";

const ProfileContainer = (props) => {
    let {profilePhoto} = props

    let [fetching, setFetching] = useState(false)
    let [loaded, setLoaded] = useState(false)

    let imgSrc = !loaded ? (TRANSPARENT_PROFILE_IMAGE) : (profilePhoto ? profilePhoto : DEFAULT_PROFILE_IMAGE)
    profilePhoto = <img src={imgSrc} alt='Profile photo'/>


    const getCurrentId = () => {
        let url = window.location.pathname

        try {
            let id = Number(url.split('/').slice(-1))
            if (!id) { throw 1}
            return id
        } catch (e) { return e }
    }

    // const fetchProfile = async (id) => {
    //     let r = await ProfileApi.getProfile(id)
    //
    //     if (r.data) {
    //         props.setProfile({
    //             profilePhoto: r.data.profile_photo,
    //             status: r.data.status,
    //             posts: r.data.posts
    //         })
    //     } else {
    //         let status = r.response.status
    //
    //         switch (status) {
    //             case 401:
    //                 props.submitLogout()
    //                 break
    //             case 404:
    //                 props.resetProfile()
    //                 props.setProfile({
    //                     loaded: true
    //                 })
    //         }
    //     }
    // }

    // useEffect(() => {
    //     if (!fetching && !loaded) {
    //         setFetching(true)
    //         fetchProfile(getCurrentId())
    //             .then(() => { setLoaded(true) })
    //     }
    // })

    return (
        <div>
            Profile
            {/*<Profile {...props} profilePhoto={profilePhoto}/>*/}
        </div>
    )
}

const Profile = ({profilePhoto, status, posts, addPost, ...props}) => {

    return (
        <div className='profile'>
            <div className="row">
                <div className="col-md-3">
                    <div className="left bg-dark">
                        <ProfilePhoto profilePhoto={profilePhoto}/>
                        {/*Username: {props.auth.credentials.username}*/}
                        <ProfileStatus text={status}/>
                    </div>
                </div>

                <div className="col-md-8">
                    <div className='right'>
                        <ProfilePosts items={posts} addPost={addPost}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

const ProfilePosts = ({items, addPost}) => {
    let posts = items.map((value, index) =>
        <ProfilePost
            key={index}
            title={value.title}
            text={value.text}
        />
    )

    return (
        <div className="posts">
            <div>
                {posts}
            </div>
            <div>
                {/*{defaultForm(addPost).newPost}*/}
            </div>
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

const ProfilePhoto = ({profilePhoto}) => {
    return (
        <div className='photo'>
            {profilePhoto}
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
    auth: state.auth
})

export default compose(
    connect(mapStateToProps, {addPost, resetProfile}),
    withAuth,
)(ProfileContainer)