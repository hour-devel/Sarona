'use client'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

const SesssionWrapper = ({children}) => {
  return (
    <SessionProvider>{children}</SessionProvider>
  )
}

export default SesssionWrapper