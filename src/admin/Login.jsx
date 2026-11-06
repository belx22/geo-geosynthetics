import { useState } from 'react'
import Icon from '../components/Icon.jsx'
import Logo from '../components/Logo.jsx'
import { PROFILES, signIn } from '../data/sessionStore.js'

export default function Login() {
  const [profile, setProfile] = useState('administrateur')

  return (
    <div className="adm-login">
      <form
        className="adm-login__card"
        onSubmit={(e) => {
          e.preventDefault()
          signIn(profile)
        }}
      >
        <Logo />
        <h1>Espace d'administration</h1>
        <p>Choisissez le profil avec lequel ouvrir la session.</p>

        <fieldset style={{ margin: 0 }}>
          <legend style={{ position: 'absolute', left: '-9999px' }}>Profil de connexion</legend>
          <div className="adm-profiles">
            {Object.values(PROFILES).map((p) => (
              <label key={p.id} className={`adm-profile${profile === p.id ? ' is-on' : ''}`}>
                <input
                  type="radio"
                  name="profil"
                  value={p.id}
                  checked={profile === p.id}
                  onChange={() => setProfile(p.id)}
                />
                <span>
                  <strong>{p.label} — {p.name}</strong>
                  <span>{p.scope}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <button className="btn btn--green btn--block" type="submit">
          Ouvrir la session
          <Icon name="arrowRight" size={16} />
        </button>

        <p className="adm-warn">
          <Icon name="alert" size={16} />
          <span>
            <strong>Démonstration d'interface.</strong> Aucune authentification
            réelle n'est en place : le contrôle d'accès, les comptes protégés et
            la connexion sécurisée (HTTPS) relèvent du back-office à réaliser
            (cahier des charges § VII, sécurité).
          </span>
        </p>
      </form>
    </div>
  )
}
