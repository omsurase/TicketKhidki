import React from 'react'
import { Form } from "antd";
import Button from '../../components/Button';
import { Link } from 'react-router-dom'
function Login() {
    const onFinish = ( values ) => {
        console.log(values)
    };
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
                  onFinish={ onFinish }>
                  <Form.Item
                      label= "Name"
                      name = "name"
                      rules={[{ required: true, message: "Please enter your name" }]}
                    >
                      <input type="text" />
                  </Form.Item>
                  <Form.Item
                      label= "Email"
                      name = "email"
                      rules={[{ required: true, message: "Please enter your email" }]}
                    >
                      <input type="email" />
                  </Form.Item>
                  <Form.Item
                      label= "Password"
                      name = "password"
                      rules={[{ required: true, message: "Please enter your password" }]}
                    >
                      <input type="password" />
                  </Form.Item>
                  <div className="flex flex-col mt-2 gap-1">
                      <Button fullWidth type='submit' title='Login' />
                      <Link className='text-primary '  to="/register">
                      Dont have an account? <span style={{ textDecoration: 'underline' }}>Register</span>
                      </Link>
                  </div>

              </Form>
        </div>
    </div>
  )
}

export default Login
