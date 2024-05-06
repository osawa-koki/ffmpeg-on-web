'use client'

import React, { useContext, useEffect, useState } from 'react'
import { Spinner, Table } from 'react-bootstrap'
import { toast } from 'react-toastify'
import dayjs from 'dayjs'

import setting from '@/setting'

import { SharedContext } from '../SharedContext'

export default function LogPage (): React.JSX.Element {
  const { shared } = useContext(SharedContext)

  const [outputs, setOutputs] = useState<Output[] | null>(null)

  useEffect(() => {
    const { uid, accessToken, client } = shared
    console.log(uid)
    if (uid == null || accessToken == null || client == null) {
      return
    }
    fetch(`${setting.apiPath}/api/v1/outputs`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        Uid: uid,
        'Access-Token': accessToken,
        Client: client
      }
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error('Get outputs failed')
        }
        return await response.json()
      })
      .then((data: Output[]) => {
        setOutputs(data)
      })
      .catch((error) => {
        toast.error(error.message)
      })
  }, [shared])

  if (outputs == null) {
    return <Spinner animation='border' />
  }

  return (
    <>
      <div id='Log'>
        <h1>Log</h1>
        <Table striped bordered hover className='mt-3'>
          <thead>
            <tr>
              <th>Id</th>
              <th>Path</th>
              <th>CreatedAt</th>
              <th>UpdatedAt</th>
              <th>Source</th>
            </tr>
          </thead>
          <tbody>
            {
              outputs.map((output) => (
                <tr key={output.id}>
                  <td>{output.id}</td>
                  <td>
                    <a href={`${setting.apiPath}${output.video_url}`} target='_blank' rel="noreferrer">
                      {'{generated}'}.gif
                    </a>
                  </td>
                  <td>{dayjs(output.created_at).format('YYYY-MM-DD HH:mm:ss')}</td>
                  <td>{dayjs(output.updated_at).format('YYYY-MM-DD HH:mm:ss')}</td>
                  <td>
                    <a href={`${setting.apiPath}${output.source_video_url}`} target='_blank' rel="noreferrer">
                      {'{source}'}.{output.input.ext}
                    </a>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </div>
    </>
  )
}
