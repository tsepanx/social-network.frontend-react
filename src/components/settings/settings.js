import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom"

import './settings.css'

import {withAuthRedirect} from "../hoc/with-auth-redirect";
import {defaultField} from "../common/form/form-field/form-field";
import {UserApi} from "../../api/api";
import {commonReduxForm} from "../common/form/form/form";
import {submitChangeUsername, submitChangePassword} from "../../redux/auth-reducer";

const Settings = (props) => {

    let userId = props.auth.credentials.id

    return (<div className='settings'>
        <h2>Settings</h2>
        <ul>
            <ChangeUsername {...props} userId={userId}/>
            <ChangePassword {...props} userId={userId}/>
            <DangerZone {...props} userId={userId}/>
        </ul>
    </div>)
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

let mapStateToProps = (state) => ({
    // ...state.auth
});

export default compose(
    connect(mapStateToProps, {submitChangeUsername, submitChangePassword}),
    withAuthRedirect,
)(Settings)