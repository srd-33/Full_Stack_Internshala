import React, { useEffect, useState } from 'react'
import { createAgent, getAgents } from '../api/client'
import AgentForm from '../components/AgentForm'

export default function Agents() {
  const [agents, setAgents] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const loadAgents = async () => {
    try {
      const data = await getAgents()
      setAgents(Array.isArray(data) ? data : data?.agents || [])
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to fetch agents')
    }
  }

  useEffect(() => { loadAgents() }, [])

  const handleAdd = async (payload) => {
    setLoading(true)
    setError('')
    try {
      await createAgent(payload)
      await loadAgents()
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to add agent')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-8">
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4">Add Agent</h2>
          {error && <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-700 text-sm">{error}</div>}
          <AgentForm onSubmit={handleAdd} loading={loading} />
        </div>
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4">Agents</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500">
                  <th className="py-2">#</th>
                  <th className="py-2">Name</th>
                  <th className="py-2">Email</th>
                  <th className="py-2">Mobile</th>
                </tr>
              </thead>
              <tbody>
                {agents.map((a, i) => (
                  <tr key={a._id || i} className="border-t">
                    <td className="py-2">{i + 1}</td>
                    <td className="py-2">{a.name}</td>
                    <td className="py-2">{a.email}</td>
                    <td className="py-2">{a.mobile || a.phone || a.mobileNumber}</td>
                  </tr>
                ))}
                {agents.length === 0 && (
                  <tr><td className="py-4 text-gray-500" colSpan={4}>No agents yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}