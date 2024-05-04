'use client'

import React, { createContext, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

import '@/styles/style.scss'
import '@/styles/menu.scss'

import setting from '@/setting'
import Menu from '@/components/Menu'

interface Shared {
  apiPath: any
  uid: string | null
  accessToken: string | null
  client: string | null
  email: string | null
  password: string | null
}

interface SharedSet {
  shared: Shared
  setShared: React.Dispatch<React.SetStateAction<Shared>>
}

export const SharedContext = createContext({} as unknown as SharedSet)

const sharedDataKey = 'sharedData'

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}): React.JSX.Element {
  const pathname = usePathname()

  const [currentPage, setCurrentPage] = useState<string | null>(null)

  const [shared, setShared] = useState({
    uid: null,
    accessToken: null,
    client: null,
    email: null,
    password: null
  })

  useEffect(() => {
    const path = window.location.pathname
    setCurrentPage(path)
  }, [pathname])

  useEffect(() => {
    const data = localStorage.getItem(sharedDataKey)
    if (data != null) {
      const sharedData = JSON.parse(data)
      setShared(sharedData)
    }
  }, [])

  useEffect(() => {
    if (Object.values(shared).every((v) => v === null)) {
      localStorage.removeItem(sharedDataKey)
      return
    }
    localStorage.setItem(sharedDataKey, JSON.stringify(shared))
  }, [shared])

  return (
    <html lang='ja'>
      <head>
        <meta charSet='utf-8' />
        <link rel='shortcut icon' href='/favicon.ico' type='image/x-icon' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <title>{setting.title}</title>
        <meta name='description' content={setting.description} />
        {setting.keywords.length > 0 && (
          <meta name='keywords' content={setting.keywords.join(',')} />
        )}
      </head>
      <body>
        <div id='Wrapper'>
          <SharedContext.Provider value={{
            shared,
            setShared
          }}>
            <main>{children}</main>
          </SharedContext.Provider>
          <Menu currentPage={currentPage} />
          <ToastContainer />
        </div>
        <footer>
          <a
            href='https://github.com/osawa-koki'
            target='_blank'
            rel='noreferrer'
          >
            @osawa-koki
          </a>
        </footer>
      </body>
    </html>
  )
}
