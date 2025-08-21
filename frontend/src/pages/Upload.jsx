import React, { useState } from 'react'
import { uploadList } from '../api/client'

const ALLOWED = ['csv', 'xlsx', 'xls']

export default function Upload() {
  const [file, setFile] = useState(null)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const onFileChange = (e) => {
    setError('')
    setMessage('')
    const f = e.target.files?.[0]
    if (!f) return setFile(null)
    const ext = f.name.split('.').pop().toLowerCase()
    if (!ALLOWED.includes(ext)) {
      setError('Only .csv, .xlsx, .xls files are allowed')
      return setFile(null)
    }
    setFile(f)
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!file) return setError('Please choose a valid file')
    setLoading(true)
    setError('')
    setMessage('')
    try {
      const res = await uploadList(file)
      setMessage(res?.message || 'File uploaded & distribution initiated')
    } catch (err) {
      setError(err?.response?.data?.message || 'Upload failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-8">
      <div className="max-w-xl bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4">Upload & Distribute</h2>
        {error && <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-700 text-sm">{error}</div>}
        {message && <div className="mb-4 p-3 rounded-xl bg-green-50 text-green-700 text-sm">{message}</div>}
        <form onSubmit={handleUpload} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">File (.csv, .xlsx, .xls)</label>
            <input type="file" accept=".csv,.xlsx,.xls" onChange={onFileChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 cursor-pointer text-sm text-gray-700 
             file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0
             file:text-sm file:font-semibold
             file:bg-gray-900 file:text-white
             hover:file:bg-gray-800"/>
          </div>
          <button disabled={loading} className="w-full py-2 rounded-xl bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-60">
            {loading ? 'Uploading...' : 'Upload'}
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-3">Expected columns: <b>FirstName</b>, <b>Phone</b>, <b>Notes</b>. Distribution logic is handled by backend among 5 agents.</p>
      </div>
    </div>
  )
}