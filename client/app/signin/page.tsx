'use client'

import React, { useContext } from 'react'
import { Button, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'

import setting from '@/setting'

import { SharedContext } from '../layout'

export default function LoginPage (): React.JSX.Element {
  const { shared, setShared } = useContext(SharedContext)

  const signIn = () => {
    if (shared.email == null || shared.password == null) {
      return
    }

    fetch(`${setting.apiPath}/api/v1/auth/sign_in`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: shared.email,
        password: shared.password
      })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Login failed')
        }
        const uid = response.headers.get('Uid')
        const accessToken = response.headers.get('Access-Token')
        const client = response.headers.get('Client')
        return { uid, accessToken, client }
      })
      .then((data) => {
        setShared((prev) => ({
          ...prev,
          ...data
        }))
      })
      .catch((error) => {
        toast.error(error.message)
      })
  }

  return (
    <>
      <div id='Login'>
        <h1>Signin</h1>
        <Form.Group controlId='email' className='my-3'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={shared.email ?? ''}
            onChange={(e) => {
              const { value } = e.target
              if (value === '') {
                setShared((prev) => ({ ...prev, email: null }))
                return
              }
              setShared((prev) => ({ ...prev, email: value }))
            }}
          />
        </Form.Group>
        <Form.Group controlId='password' className='my-3'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            value={shared.password ?? ''}
            onChange={(e) => {
              const { value } = e.target
              if (value === '') {
                setShared((prev) => ({ ...prev, password: null }))
                return
              }
              setShared((prev) => ({ ...prev, password: value }))
            }}
          />
        </Form.Group>
        <Button variant='primary' type='button' onClick={signIn}>
        SignIn
        </Button>
      </div>
    </>
  )
}
