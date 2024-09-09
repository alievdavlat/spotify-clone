"use client"

import React from 'react'
import * as RadixSlder from '@radix-ui/react-slider'

interface SliderProps {
  value?:number
  onChange?:(value:number) => void

}

const Slider:React.FC<SliderProps> = ({onChange, value = 1}) => {
  const handleCHange = (newValue:number[]) => {
    onChange?.(newValue[0])

  }

  return (
    <RadixSlder.Root
    className='
    relative
    flex
    items-center
    select-none
    touch-none
    w-full
    h-10
    '
    defaultValue={[1]}
    value={[value]}
    onValueChange={handleCHange}
    max={1}
    step={0.1}
    aria-label='Volume'

    >
      <RadixSlder.Track
      className='
      bg-neutral-400
      relative
      grow
      rounded-full
      h-[3px]

      '
      >
        <RadixSlder.Range
        className='
        absolute
        bg-white
        rounded-full
        h-full
        
        '
        />

      </RadixSlder.Track>
    </RadixSlder.Root>
  )
}

export default Slider