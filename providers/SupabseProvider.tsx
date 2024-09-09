"use client"
import React from "react"
import { Database } from "@/types_db"
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from "@supabase/auth-helpers-react"

interface SupabseProviderProps {
  children:React.ReactNode
}

const SupabseProvider:React.FC<SupabseProviderProps> = ({children}) => {


  const [supabseClient] = React.useState<any>(() => createPagesBrowserClient<Database>() )

  return (
    <SessionContextProvider supabaseClient={supabseClient}>
    {children}
    </SessionContextProvider> 
  )
}

export default SupabseProvider