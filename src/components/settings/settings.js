import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom"

import './settings.css'

import {withAuth} from "../hoc/with-auth";
import {defaultField, defaultInputField, defaultTextareaField} from "../common/form/form-field/form-field";
import {ProfileApi, UserApi} from "../../api/api";
import {commonReduxForm} from "../common/form/form/form";
import {submitChangePassword, submitChangeUsername} from "../../redux/auth-reducer";
import {submitChangePhoto, submitChangeStatus} from "../../redux/profile-reducer";

const Settings = (props) => {

    let userId = props.auth.credentials.id

    return (<div className='settings'>
        <h2>Settings</h2>
        <ul>
            <ChangeStatus {...props} userId={userId}/>
            <ChangeProfilePhoto {...props} userId={userId}/>
            <ChangeUsername {...props} userId={userId}/>
            <ChangePassword {...props} userId={userId}/>
            <DangerZone {...props} userId={userId}/>
        </ul>
    </div>)
}

const ChangeStatus = (props) => {
    const onSubmit = (formData) => {
        props.submitChangeStatus(props.userId, formData.status)
    }

    const statusField = defaultInputField('status', 'New status')

    return (
        <li>
            <h4>Change status</h4>
            {commonReduxForm('change-status', onSubmit, [statusField])}
        </li>
    )
}
const ChangeProfilePhoto = (props) => {
    const onSubmit = (formData) => {
        props.submitChangePhoto(props.userId, formData.url)
    }

    const urlField = defaultTextareaField('url', 'New photo url', null)

    return (
        <li>
            <h4>Change photo</h4>
            {commonReduxForm('change-photo', onSubmit, [urlField])}
        </li>
    )
}

const ChangeUsername = (props) => {

    const onSubmit = (formData) => {
        props.submitChangeUsername(props.userId, formData.username)
    }

    const usernameField = defaultField.username

    return (
        <li>
            <h4>Change username</h4>
            {commonReduxForm('change-username', onSubmit, [usernameField])}
        </li>
    )
}

const ChangePassword = (props) => {

    const onSubmit = (formData) => {
        props.submitChangePassword(props.userId, formData.password)
    }

    const passwordField = defaultField.password

    return (
        <li>
            <h4>Change password</h4>
            {commonReduxForm('change-password', onSubmit, [passwordField])}
        </li>
    )

}

const DangerZone = (props) => {
    return (
        <li className="danger">
            <h5>Danger zone</h5>

            <div className='list-group'>
                <div className='list-group-item'>Some danger option</div>
                <DeleteAccount {...props}/>
            </div>
        </li>
    )
}

const DeleteAccount = (props) => {
    const history = useHistory()

    const onClick = () => {
        UserApi.deleteUser(props.userId)
            .then(() => {
                history.replace('/')
                window.location.reload();
            })
    }

    return (
        <div className="list-group-item">
            <h5>Delete your account</h5>
            <div className="btn btn-danger" onClick={onClick}>Delete</div>
        </div>
    )
}

let mapStateToProps = () => ({

});

export default compose(
    connect(mapStateToProps, {submitChangeUsername, submitChangePassword, submitChangeStatus, submitChangePhoto}),
    withAuth(true),
)(Settings)