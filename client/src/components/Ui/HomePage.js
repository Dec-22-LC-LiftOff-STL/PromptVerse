import React from "react";
import { useCookies, Cookies } from 'react-cookie';


const Homepage = () => {
    const cookies = new Cookies();
    const token = cookies.get('user_token');
    const userData = cookies.get('user_data');

    return (
        <div>
            this is the homepage
        </div>
    )
}

export default Homepage

