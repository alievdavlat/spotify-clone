import { Song } from "@/types"
import { useSessionContext } from "@supabase/auth-helpers-react"
import { useEffect, useMemo, useState } from "react"
import toast from "react-hot-toast"


const useGetSongById = (id?: string) => {
  const [isLoading , setIsLoading] = useState(false)
  const [song, setSong] = useState<Song | undefined>(undefined)

  const {supabaseClient} = useSessionContext()

  useEffect(() => {
    if (!id) {
      return
    }

    setIsLoading(true)

    const fetData = async () => {
      const {data, error} = await supabaseClient
      .from('songs')
      .select('*')
      .eq('id', id)
      .single()
      if (error) {
        console.log(error.message);
        toast.error(error.message)
        return
      }

      setSong(data as Song)
      setIsLoading(false)
    }

    fetData()

  }, [id, supabaseClient])

  return useMemo(() => ({
    isLoading,
    song
  }), [isLoading, song])

}


export default useGetSongById