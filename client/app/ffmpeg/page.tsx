'use client'

import React, { useContext, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'

import setting from '@/setting'

import { SharedContext } from '../layout'

export default function FFmpegPage (): React.JSX.Element {
  const { shared } = useContext(SharedContext)

  const [file, setFile] = useState<File | null>(null)

  const convert = (): void => {
    const { uid, accessToken, client } = shared
    if (uid == null || accessToken == null || client == null) {
      toast.error('Please login')
      return
    }
    if (file == null) {
      toast.error('Please select file')
      return
    }
    const formData = new FormData()
    formData.append('video', file)
    fetch(`${setting.apiPath}/api/v1/inputs`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Uid: uid,
        'Access-Token': accessToken,
        Client: client
      },
      body: formData
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error('Convert failed')
        }
        return await response.json()
      })
      .then(() => {
        toast.success('Convert success')
      })
      .catch((error) => {
        toast.error(error.message)
      })
  }

  return (
    <>
      <div id='FFmpeg'>
        <h1>FFmpeg</h1>
        <Form.Group className='mt-3'>
          <Form.Label>File</Form.Label>
          <Form.Control
            type='file'
            onChange={(event: any) => {
              const files = event.target.files
              if (files == null) {
                return
              }
              setFile(files[0])
            }}
          />
        </Form.Group>
        <Button variant='primary' className='mt-3' onClick={convert}>
          Convert
        </Button>
      </div>
    </>
  )
}
