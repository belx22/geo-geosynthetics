import { Routes, Route, Navigate } from 'react-router-dom'
import { useSession } from '../data/sessionStore.js'
import Login from './Login.jsx'
import Dashboard from './Dashboard.jsx'
import Demandes from './Demandes.jsx'
import DemandeDetail from './DemandeDetail.jsx'
import Contenus from './Contenus.jsx'
import ContenuEditor from './ContenuEditor.jsx'
import '../styles/admin.css'

export default function AdminApp() {
  const session = useSession()

  /* Pas de session ouverte : l'écran de connexion remplace l'espace. */
  if (!session) return <Login />

  return (
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="demandes" element={<Demandes />} />
      <Route path="demandes/:id" element={<DemandeDetail />} />
      <Route path="contenus" element={<Contenus />} />
      <Route path="contenus/:collection/:id" element={<ContenuEditor />} />
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  )
}
