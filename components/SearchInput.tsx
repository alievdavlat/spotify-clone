"use client"
import React from 'react'
import useDebounce from '@/hooks/useDebounce'
import { useRouter } from 'next/navigation'
import qs from 'query-string'
import Input from './Input'

const SearchInput = () => {
  const router = useRouter()
  const [value, setValue] = React.useState('')

  const debounedValue = useDebounce<string>(value, 500)


  React.useEffect(() => {
    const query = {
      title:debounedValue
    }

    const url  = qs.stringifyUrl({
      url:'/search',
      query
    })

    router.push(url)
  }, [debounedValue, router])

  return (
    <Input
    placeholder='What do you want!'
    value={value}
    onChange={(e) => setValue(e.target.value)}
    />
  )
}

export default SearchInput