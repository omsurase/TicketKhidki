import React, { useEffect } from 'react'
import { Form, message } from "antd";
import Button from '../../components/Button';
import { Link, useNavigate } from 'react-router-dom'
import { LoginUser } from '../../apicalls/users';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../redux/loaderSlice';
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storeTokenAndNavigate = async (token) => {
    localStorage.setItem("token", token);
    // Ensure navigation happens after token storage
    window.location.href = "/";
  };
  const onFinish = async (values) => {
    try {
      dispatch (ShowLoading())
      const response = await LoginUser(values);
      dispatch(HideLoading());
      //console.log(response);
      if (response.succes) {
        //console.log("hi2");
        message.success(response.message);
        await storeTokenAndNavigate(response.data);
        //console.log(localStorage.getItem('token'));

        //navigate("/");
      } else {
        //console.log("hi");
        message.error(response.message);
      }
    } catch (err) {
      //console.log(err)
      //console.log("hi3");
      dispatch(HideLoading);
      message.error(err.message);
    }
  };

  useEffect(() => { 
    if (localStorage.getItem("token")) { 
      navigate("/");
    }
  }, []);
  return (
    <div className='flex justify-center h-screen items-center bg-primary'>
      <div className='card p-3 w-400'>
        <h1 className="text-xl mb-1">
          Ticket Khidki - Login
        </h1>
        <hr />
        <Form
          layout='vertical'
          className='mt-1'
          onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <input type="email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <input type="password" />
          </Form.Item>
          <div className="flex flex-col mt-2 gap-1">
            <Button fullWidth type='submit' title='Login' />
            <Link className='text-primary ' to="/register">
              Dont have an account? <span style={{ textDecoration: 'underline' }}>Register</span>
            </Link>
          </div>

        </Form>
      </div>
    </div>
  )
}

export default Login
