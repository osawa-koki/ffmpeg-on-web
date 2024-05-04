'use client'

import React, { useContext, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'

import setting from '@/setting'

import { SharedContext } from '../layout'

export default function LoginPage (): React.JSX.Element {
  const { shared, setShared } = useContext(SharedContext)

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')

  const signUp = () => {
    fetch(`${setting.apiPath}/api/v1/auth`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
        confirm_password: confirmPassword
      })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('SignUp failed')
        }
        const uid = response.headers.get('Uid')
        const accessToken = response.headers.get('Access-Token')
        const client = response.headers.get('Client')
        return { uid, accessToken, client }
      })
      .then((data) => {
        setShared((prev) => ({
          ...prev,
          ...data,
          email,
          password
        }))
        toast.success('SignUp success')
      })
      .catch((error) => {
        toast.error(error.message)
      })
  }

  return (
    <>
      <div id='Login'>
        <h1>Login</h1>
        <Form.Group controlId='email' className='my-3'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='password' className='my-3'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='confirmPassword' className='my-3'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant='primary' type='button' onClick={signUp}>
          SignUp
        </Button>
      </div>
    </>
  )
}
