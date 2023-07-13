import { useEffect, useState } from 'react'

export function useUsers() {
  const [users, setUsers] = useState([])
  const [errors, setError] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users')
        const data = await res.json()
        setUsers(data)
      } catch (error) {
        setError(error)
      }
    }

    fetchData()
  }, [])

  return [errors, users]
}
