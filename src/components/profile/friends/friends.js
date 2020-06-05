import React from "react";

import ProfileCard from "../profile-card/profile-card";

export const Friends = ({list}) => {
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