import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function IndexPage(): JSX.Element {
  const router = useRouter()

  useEffect(() => {
    router.replace('/game')
  }, [])

  return null
}
