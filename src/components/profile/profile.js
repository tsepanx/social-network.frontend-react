import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {addPost} from "../../redux/profile-reducer";

import DEFAULT_PROFILE_IMAGE from '../../assets/profile.png'
import TRANSPARENT_PROFILE_IMAGE from '../../assets/transparent_profile.png'
import './profile.css'

import {commonReduxForm, commonFormField, input, textarea} from "../common/form-control/form-control";
import {withAuthRedirect} from "../hoc/with-auth-redirect";

import {AuthApi} from "../../api/api";

const SubmitNewPostContext = React.createContext(null)

const ProfileContainer = (props) => {
    let {profilePhoto} = props

    let [fetching, setFetching] = useState(true)

    let imgSrc = fetching ? (TRANSPARENT_PROFILE_IMAGE) : (profilePhoto ? profilePhoto : DEFAULT_PROFILE_IMAGE)
    profilePhoto = <img src={imgSrc} alt='Profile photo'/>


    const getCurrentId = () => {
        let url = window.location.pathname

        try {
            let id = Number(url.split('/').slice(-1))
            if (!id) { throw 1}
            return id
        } catch (e) { return e }
    }

    const fetchProfile = async (id) => {
        // const id = props.auth.credentials.id
        let r = await AuthApi.getProfile(id)

        if (r.data) {
            props.setProfile({
                profilePhoto: r.data.profile_photo,
                status: r.data.status,
                posts: r.data.posts
            })
        } else {
            let status = r.response.status

            switch (status) {
                case 401:
                    props.submitLogout()
                    break
                case 404:
                    props.setProfile({
                        loaded: true
                    })
            }
        }
    }

    useEffect(() => {
        if (fetching) {
            fetchProfile(getCurrentId())
                .then(() => { setTimeout(() => { setFetching(false)}) })
        }
    }, [])

    const onSubmitNewPost = (formData) => {
        props.addPost(formData)
    }

    return (<SubmitNewPostContext.Provider value={onSubmitNewPost}>
        <><Profile {...props} profilePhoto={profilePhoto}/></>
    </SubmitNewPostContext.Provider>)

}

const Profile = ({profilePhoto, status, posts, ...props}) => {

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

    const fields = [
        commonFormField('title', input, 'Post title'),
        commonFormField('text', textarea, 'Post text')
    ]

    return (
        <SubmitNewPostContext.Consumer>
            {value => (
                <div className="posts">
                    <div>
                        {posts}
                    </div>
                    <div>
                        {commonReduxForm('new-post',
                            value,
                            fields,
                            'Create new post')}
                    </div>
                </div>
            )}
        </SubmitNewPostContext.Consumer>

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
    ...state.profile,
    auth: state.auth
})

export default compose(
    connect(mapStateToProps, {addPost}),
    withAuthRedirect,
    // withData(obtainProfile)
)(ProfileContainer)