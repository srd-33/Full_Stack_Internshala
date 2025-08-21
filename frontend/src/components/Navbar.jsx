import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, signout } = useAuth()

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold">Agent Distributor</Link>
        
        <div className="flex items-center gap-6">
          {user && (
            <>
              <NavLink 
                to="/agents" 
                className={({isActive}) => `hover:underline ${isActive ? 'font-semibold' : ''}`}
              >
                Agents
              </NavLink>
              <NavLink 
                to="/upload" 
                className={({isActive}) => `hover:underline ${isActive ? 'font-semibold' : ''}`}
              >
                Upload
              </NavLink>
              <NavLink 
                to="/records" 
                className={({isActive}) => `hover:underline ${isActive ? 'font-semibold' : ''}`}
              >
                Records
              </NavLink>
            </>
          )}

          {user ? (
            <button 
              onClick={signout} 
              className="px-3 py-1.5 rounded-xl bg-gray-900 text-white hover:bg-gray-800"
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink 
                to="/login" 
                className="px-3 py-1.5 rounded-xl bg-gray-900 text-white hover:bg-gray-800"
              >
                Login
              </NavLink>
              <NavLink 
                to="/register" 
                className="px-3 py-1.5 rounded-xl border border-gray-900 text-gray-900 hover:bg-gray-100 rounded-xl"
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
