import React from "react";
import { useParams } from 'react-router-dom'

const ProfilePage = () => {
    const { id } = useParams()


    return (
        <div>
            this is the profile page, 
            user id = { id }
        </div>
    )
}

export default ProfilePage

