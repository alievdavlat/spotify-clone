"use client"
import React from 'react'
import Modal from './Modal'
import { useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import useAutModal from '@/hooks/useAuthModal'


const AuthModal = () => {
  const supabaseClient =  useSupabaseClient()
  const router = useRouter()
  const {session} = useSessionContext()
  const { onClose, isOpen} = useAutModal()
  

  React.useEffect(() => {
    if (session) {
        router.refresh()
        onClose()
    }
  }, [session, onClose])

  const onChange  = (open:boolean) => {
    if (!open) {
        onClose()
    }
  }

  return (
    <Modal
    title='Welcome Back'
    description='Login to your account'
    isOpen={isOpen}
    onChange={onChange}
    >
      <Auth 
      theme='dark'
      providers={['github', 'google']}
      magicLink
      supabaseClient={supabaseClient} 
      appearance={{
        theme:ThemeSupa,
        variables:{
          default:{
            colors:{
              brand:'#404040',
              brandAccent:'#22c55e',
            }
          }
        }
      }}
      
      />
    </Modal>
  )
}

export default AuthModal