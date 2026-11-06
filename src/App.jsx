import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'

import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Domains from './pages/Domains.jsx'
import DomainDetail from './pages/DomainDetail.jsx'
import References from './pages/References.jsx'
import ReferenceDetail from './pages/ReferenceDetail.jsx'
import Contact from './pages/Contact.jsx'
import Confirmation from './pages/Confirmation.jsx'

import AdminApp from './admin/AdminApp.jsx'

/* Site public : en-tête et pied de page communs. */
function PublicSite() {
  return (
    <>
      <a className="skip-link" href="#contenu">Aller au contenu principal</a>
      <Header />
      <main id="contenu">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/domaines-d-application" element={<Domains />} />
          <Route path="/domaines/:slug" element={<DomainDetail />} />
          <Route path="/references" element={<References />} />
          <Route path="/references/:slug" element={<ReferenceDetail />} />
          <Route path="/demander-une-etude" element={<Contact />} />
          <Route path="/demande-envoyee" element={<Confirmation />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Espace d'administration : sa propre interface, sans l'habillage public. */}
        <Route path="/admin/*" element={<AdminApp />} />
        <Route path="/*" element={<PublicSite />} />
      </Routes>
    </>
  )
}
