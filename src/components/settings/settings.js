import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom"

import './settings.css'

import {withAuthRedirect} from "../hoc/with-auth-redirect";
import {commonFormField, commonReduxForm} from "../common/form-control/form-control";
import {AuthApi, UserApi} from "../../api/api";

const Settings = (props) => {
    return (<div className='settings'>
        <h2>Settings</h2>
        <ul>
            <ChangeUsername {...props}/>
            <DangerZone {...props}/>
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

    const history = useHistory()
    let userId = props.auth.credentials.id

    const onSubmit = (formData) => {
        let newUsername = formData.username

        console.log(userId + newUsername)
        UserApi.changeUsername(userId, newUsername)
            .then(() => {
                history.replace('/')
                window.location.reload();
            })
    }

    const usernameField = commonFormField('username', undefined, 'New username')

    return (
        <li>
            <h4>Change username</h4>
            {commonReduxForm('change-username', onSubmit, [usernameField])}
        </li>
    )
}

const DeleteAccount = (props) => {
    const history = useHistory()
    let userId = props.auth.credentials.id

    const onClick = () => {
        UserApi.deleteUser(userId)
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
    connect(mapStateToProps, {}),
    withAuthRedirect,
)(Settings)