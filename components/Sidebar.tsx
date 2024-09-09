"use client"
import { usePathname } from 'next/navigation'
import React, { useMemo } from 'react'
import { BiSearch } from 'react-icons/bi'
import { HiHome } from 'react-icons/hi'
import Box from './Box'
import SidebarItem from './SidebarItem'
import { IconType } from 'react-icons'
import Libery from './Libery'
import { Song } from '@/types'
import usePlayer from '@/hooks/usePlayer'
import { twMerge } from 'tailwind-merge'

interface SideBarProps{
  children:React.ReactNode
  userSongs:Song[]
}
interface routesProps {
  id:number
  label:string,
  active:boolean,
  href:string,
  Icon:IconType
}

const Sidebar = ({children, userSongs}:SideBarProps) => {

  const player = usePlayer()

  const pathname= usePathname()

  const routes:routesProps[]  = useMemo(() => [
    {
      id:1,
      label:'Home',
      active:pathname !== '/search',
      href:'/',
      Icon:HiHome
    },
    {
      id:2,
      label:'Search',
      active:pathname === '/search',
      href:'/search',
      Icon:BiSearch
    },
  ], [pathname])

  return (
    <div className={twMerge(`flex h-full`, player.activeId && 'h-[calc(100% - 80px)]')}>
      {/* {children} */}
      <div
      className='hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2'
      > 
        <Box>
          <div className='
          flex 
          flex-col
          gap-y-4
          px-5
          py-4
          '>
            {
              routes.map((item:routesProps, index) => (
                <SidebarItem key={item.id} {...item}/>
              ))
            }
          </div>
        </Box>
        <Box className='overflow-y-auto h-full'>
          <Libery songs={userSongs}/>
        </Box>
      </div>

      <main className='h-full flex-1 overflow-y-auto py-2'>
        {children}
      </main>
    </div>
  )
}

export default Sidebar