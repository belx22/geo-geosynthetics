import { Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'

/* Le profil rédacteur n'accède pas aux demandes : elles contiennent des
   données personnelles (cahier des charges § VII). */
export default function AccessDenied() {
  return (
    <div className="adm-denied">
      <Icon name="shield" size={34} />
      <h2>Accès réservé</h2>
      <p>
        Les demandes d'étude contiennent des données personnelles. Leur
        consultation est réservée à l'administrateur et à l'équipe d'étude.
        Votre profil donne accès à la gestion des contenus du site.
      </p>
      <Link className="btn btn--green" to="/admin/contenus">
        Gérer les contenus
        <Icon name="arrowRight" size={16} />
      </Link>
    </div>
  )
}
