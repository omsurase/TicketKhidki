import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import { GetCurrentUser } from '../apicalls/users';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { SetUser } from '../redux/userSlice';
import { HideLoading, ShowLoading } from '../redux/loaderSlice';

function ProtectedRoute({ children }) {
    const { user } = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const getCurrentUser = async () => {
        try {
            dispatch(ShowLoading());
            const response = await GetCurrentUser();
            dispatch(HideLoading());
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
            dispatch(HideLoading());
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
