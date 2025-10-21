import { useEffect, useState } from 'react'
import './App.css'

export default function App() {
  const [data, setData] = useState(null)
  const [err, setErr] = useState(null)

  useEffect(() => {
    fetch('/api/health')
      .then(r => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then(setData)
      .catch(setErr)
  }, [])

  if (err)   return <p style={{ color: 'crimson' }}>Erreur : {String(err.message || err)}</p>
  if (!data) return <p>Chargement…</p>
  return <pre>{JSON.stringify(data, null, 2)}</pre>
}
