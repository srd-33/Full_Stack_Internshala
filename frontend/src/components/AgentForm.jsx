import React, { useState } from 'react'

export default function AgentForm({ onSubmit, loading }) {
  const [form, setForm] = useState({ name: '', email: '', mobile: '', password: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm mb-1">Name</label>
        <input name="name" value={form.name} onChange={handleChange} required placeholder='Enter ur name here' className="w-full rounded-xl border-gray-300 focus:ring-2 focus:ring-gray-900" />
      </div>
      <div>
        <label className="block text-sm mb-1">Email</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder='Enter ur email here' required className="w-full rounded-xl border-gray-300 focus:ring-2 focus:ring-gray-900" />
      </div>
      <div>
        <label className="block text-sm mb-1">Mobile (+CC...)</label>
        <input name="mobile" value={form.mobile} onChange={handleChange} required placeholder="+91XXXXXXXXXX" className="w-full rounded-xl border-gray-300 focus:ring-2 focus:ring-gray-900" />
      </div>
      <div>
        <label className="block text-sm mb-1">Password</label>
        <input type="password" name="password" value={form.password} onChange={handleChange} placeholder='Enter ur password here' required className="w-full rounded-xl border-gray-300 focus:ring-2 focus:ring-gray-900" />
      </div>
      <button disabled={loading} className="w-full py-2 rounded-xl bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-60">
        {loading ? 'Adding...' : 'Add Agent'}
      </button>
    </form>
  )
}