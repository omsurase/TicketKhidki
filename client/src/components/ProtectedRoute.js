import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import { GetCurrentUser } from '../apicalls/users';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { SetUser } from '../redux/userSlice';

function ProtectedRoute({ children }) {
    const { user } = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const getCurrentUser = async () => {
        try {
            const response = await GetCurrentUser();
            if (response.success) {
                //console.log("user is !null");
                dispatch(SetUser(response.data));
                //console.log(response.data);
            } else {
                console.log("user is null");
                dispatch(SetUser(null));
                message.error(response.message);
            }
        } catch (err) {
            console.log(err);
            dispatch(SetUser(null));
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
