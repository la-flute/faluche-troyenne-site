import React from 'react'
import {Button} from 'antd'
import { Link } from 'react-router-dom'

import './informations.css'

const Informations = () => (
  <div className="a-informations">
    <h2>Le WET c'est quoi ?</h2>
    <p>
        C'est le meilleur congrès faluchard du monde mamene.
    </p>


    <h2>EN CLAIR :</h2>
      <div className="a-informations__table__row">
        <div className="a-informations__table__row__cell">Début du congrès</div>
        <div className="a-informations__table__row__cell">3 mai 2019 - 19h</div>
      </div>
      <div className="a-informations__table__row">
        <div className="a-informations__table__row__cell">Fin du congrès</div>
        <div className="a-informations__table__row__cell">5 mai 2019 - 12h</div>
      </div>
      <div className="a-informations__table__row">
        <div className="a-informations__table__row__cell">Nourriture</div>
        <div className="a-informations__table__row__cell">Sur place à prix plus minis que minis 24/24</div>
      </div>
      <div className="a-informations__table__row">
        <div className="a-informations__table__row__cell">Places</div>
        <div className="a-informations__table__row__cell">300</div>
      </div>
      <div className="a-informations__table__row">
        <div className="a-informations__table__row__cell">Tarif</div>
        <div className="a-informations__table__row__cell">50 balles tout compris</div>
      </div>
  </div>
)

export default Informations
