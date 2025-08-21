import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { login as apiLogin } from '../api/client'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem('user')
    return u ? JSON.parse(u) : null
  })

  useEffect(() => {
    if (token) localStorage.setItem('token', token)
    else localStorage.removeItem('token')
  }, [token])

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user))
    else localStorage.removeItem('user')
  }, [user])

  const signin = async (email, password) => {
    const data = await apiLogin({ email, password })
    // expecting { token, user }
    setToken(data.token)
    setUser(data.user || { email })
    return data
  }

  const signout = () => {
    setToken(null)
    setUser(null)
  }

  const value = useMemo(() => ({ token, user, signin, signout }), [token, user])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}