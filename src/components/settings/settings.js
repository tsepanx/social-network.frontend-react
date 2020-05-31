import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom"
import {withAuthRedirect} from "../hoc/with-auth-redirect";
import {commonFormField, commonReduxForm} from "../common/form-control/form-control";
import {AuthApi, UserApi} from "../../api/api";

const Settings = (props) => {
    return (<div className='settings'>
        <ChangeUsername {...props}/>
        <DeleteAccount {...props}/>
    </div>)
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
        <div>
            {commonReduxForm('change-username', onSubmit, [usernameField])}
        </div>
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
        <div>
            <div className="btn btn-danger" onClick={onClick}>Delete Account</div>
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