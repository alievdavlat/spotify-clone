"use client"
import React from 'react'
import { UserProvider as UserProviderHook } from "@/hooks/useUser";
interface UserProviderProps {
  children: React.ReactNode
}

const UserProvider:React.FC<UserProviderProps> = ({children}) => {
  return (
    <UserProviderHook>{children}</UserProviderHook>
  )
}

export default UserProvider