"use client"
import useAutModal from '@/hooks/useAuthModal'
import useUploadModal from '@/hooks/useUploadModal'
import { useUser } from '@/hooks/useUser'
import { Song } from '@/types'
import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { TbPlaylist } from 'react-icons/tb'
import MediaItem from './MediaItem'
import useOnPlay from '@/hooks/useOnPlay'

interface LiberyProps {
  songs:Song[]
}

const Libery:React.FC<LiberyProps> = ({songs}) => {
  const autModal = useAutModal()
  const uploadModal = useUploadModal()
  const {user, subscription} = useUser()

  const onPlay = useOnPlay(songs)


  
  const onClick = () => {
    if (!user) {
      return autModal.onOpen()
    }

    // chekc subscription 

    return uploadModal.onOpen()
  }

  return (
    <div className='flex flex-col'>
      <div className='
      flex
      items-center
      justify-between
      px-5
      pt-4
      '>
        <div className='
        inline-flex
        items-center
        gap-x-2
        '>
          <TbPlaylist size={26} className='text-neutral-400 cursor-pointer'/>
          <p
          className='
          text-neutral-400
          font-medium
          text-md
          '
          >
            Your Library
          </p>
        </div>
        <AiOutlinePlus 
        className='cursor-pointer text-neutral-400 hover:text-white transition'
        onClick={onClick}
        size={20}
        />
      </div>

      <div
      className='
        flex
        flex-col
        gap-y-2
        mt-4
        px-3
      '
      >
        {
        songs.map((song) => (
          <MediaItem  
          key={song.id}
          onClick={(id:string) => onPlay(id)}
          data={song}
          />
        ))
        }        
      </div>
    </div>
  )
}

export default Libery