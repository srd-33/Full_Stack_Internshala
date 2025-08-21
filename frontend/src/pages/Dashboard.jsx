import React from 'react'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const cards = [
    { title: 'Agents', desc: 'Create and manage agents', to: '/agents' },
    { title: 'Upload Lists', desc: 'Upload CSV/XLSX and distribute', to: '/upload' },
    { title: 'Records', desc: 'View distributed records', to: '/records' },
  ]

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((c) => (
          <Link key={c.title} to={c.to} className="block bg-white rounded-2xl p-6 shadow hover:shadow-md transition">
            <div className="text-lg font-semibold">{c.title}</div>
            <div className="text-gray-500 mt-1">{c.desc}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}