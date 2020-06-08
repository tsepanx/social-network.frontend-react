import React, {useEffect, useState} from "react";

import {compose} from "redux";
import {connect} from "react-redux";
import ProfileCard from "../profile/profile-card/profile-card";
import {ProfileApi} from "../../api/api";
import {withAuth} from "../hoc/with-auth";

const People = (props) => {

    let [people, setPeople] = useState([])

    useEffect(() => {
        ProfileApi.getMany().then(r => {
            setPeople(r.data.results)
        })
    }, [])

    const onClick = (btn) => {
        console.log(btn.target.id)
    }


    const profileToCard = (value, index) => {
        return <ProfileCard
            key={index}
            {...value}
            onClick={onClick}
        />
    }

    return (
        <div className='people'>
            <h3>People</h3>
            {people.map(profileToCard)}
        </div>
    )
}

const mapStateToProps = (state) => ({})

export default compose(
    connect(mapStateToProps, {}),
    withAuth(false)
)(People)