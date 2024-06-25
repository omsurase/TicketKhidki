import React, { useEffect} from 'react'
import { Form, message } from "antd";
import Button from '../../components/Button';
import { Link, useNavigate } from 'react-router-dom'
import { RegisterUser } from '../../apicalls/users';

function Register() {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await RegisterUser(values);
      if (response.success) {
        message.success(response.message);
        navigate("/login");
      } else {
        message.error(response.message);
      }
    } catch (err) {
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
          Ticket Khidki
        </h1>
        <hr />
        <Form
          layout='vertical'
          className='mt-1'
          onFinish={onFinish}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <input type="text" />
          </Form.Item>
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
            <Button fullWidth type='submit' title='REGISTER' />
            <Link className='text-primary ' to="/login">
              Already have an account? <span style={{ textDecoration: 'underline' }}>Login</span>
            </Link>
          </div>

        </Form>
      </div>
    </div>
  )
}

export default Register
