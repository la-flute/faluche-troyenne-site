import React from 'react'

import './informations.css'
import Scroll from './scroll'
import { Button } from 'antd'

class Informations extends React.Component {
  render() {
    return (
      <div className='a-informations'>
        <p className='a-swag-introtext'>
          Il y a bien longtemps, dans une galaxie Troyenne, très Troyenne...
        </p>
        <Scroll />
        <h2>EN CLAIR :</h2>
        <div className='a-informations__table__row'>
          <div className='a-informations__table__row__cell'>
            Début du congrès
          </div>
          <div className='a-informations__table__row__cell'>
            3 mai 2019 - 19h
          </div>
        </div>
        <div className='a-informations__table__row'>
          <div className='a-informations__table__row__cell'>Fin du congrès</div>
          <div className='a-informations__table__row__cell'>
            5 mai 2019 - 12h
          </div>
        </div>
        <div className='a-informations__table__row'>
          <div className='a-informations__table__row__cell'>Nourriture</div>
          <div className='a-informations__table__row__cell'>
            Sur place à prix plus minis que minis 24/24
          </div>
        </div>
        <div className='a-informations__table__row'>
          <div className='a-informations__table__row__cell'>Places</div>
          <div className='a-informations__table__row__cell'>300</div>
        </div>
        <div className='a-informations__table__row'>
          <div className='a-informations__table__row__cell'>Tarif</div>
          <div className='a-informations__table__row__cell'>
            50 balles tout compris
          </div>
        </div>
      </div>
    )
  }
}

export default Informations
