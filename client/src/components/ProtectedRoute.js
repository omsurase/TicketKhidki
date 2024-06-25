import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import { GetCurrentUser } from '../apicalls/users';
import { useNavigate } from 'react-router-dom'

function ProtectedRoute({ children }) {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const getCurrentUser = async () => {
        try {
            const response = await GetCurrentUser();
            if (response.success) {
                //console.log("user is !null");
                setUser(response.data);
                //console.log(response.data);
            } else {
                console.log("user is null");
                setUser(null);
                message.error(response.message);
            }
        } catch (err) {
            console.log(err);
            setUser(null);
            message.error(err.message);
        }
    }

    useEffect(() => {
        if (localStorage.getItem("token")) {
            getCurrentUser();
        } else {
            navigate("/login");
        }
    }, []);
    return (
        user && <div>
            {user.name}

            {children}
        </div>
    )
}

export default ProtectedRoute
