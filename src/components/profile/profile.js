import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {addPost, setProfile, obtainProfile} from "../../redux/profile-reducer";

import './profile.css'
import {commonReduxForm, commonFormField, input, textarea} from "../common/form-control/form-control";
import {withAuthRedirect} from "../hoc/with-auth-redirect";
import withData from "../hoc/with-data";

const SubmitNewPostContext = React.createContext(null)

const ProfileContainer = (props) => {

    const onSubmitNewPost = (formData) => {
        props.addPost(formData)
    }

    return (
        <SubmitNewPostContext.Provider value={onSubmitNewPost}>
            <><Profile {...props}/></>
        </SubmitNewPostContext.Provider>
    )
}

const Profile = ({profilePhoto, status, posts}) => {

    return (
        <div className='profile'>
            <div className="row">
                <div className="col-md-6">
                    My Profile
                    <div className="left bg-dark">
                        <ProfilePhoto src={profilePhoto}/>
                        <ProfileStatus text={status}/>
                    </div>
                </div>

                <div className="col-md-6">
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
                    Posts
                    {commonReduxForm('new-post',
                        value,
                        fields,
                        'Create new post')}
                    {posts}
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

const ProfilePhoto = ({src}) => {
    return (
        <div className='photo'>
            <img src={src} alt='Profile image'/>
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
})

export default compose(
    connect(mapStateToProps, {addPost, setProfile}),
    withAuthRedirect,
    // withData(obtainProfile)
)(ProfileContainer)