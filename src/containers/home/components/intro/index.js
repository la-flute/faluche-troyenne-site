import React from 'react'

import './intro.css'

import flute from '../../../../assets/flute.png'
import quigon from '../../../../assets/quigon.jpeg'
import kylo from '../../../../assets/kylo.png'
import rey from '../../../../assets/rey.png'
import vador from '../../../../assets/vader.png'
import maul from '../../../../assets/maul.png'
// import logo from '../../../assets/ua2018.png'
// import csgo from '../../../assets/csgo.jpg'
// import hearthstone from '../../../assets/hs.jpg'
// import lol from '../../../assets/lol.jpg'
// import fortnite from '../../../assets/fortnite.jpg'
// import smbu from '../../../assets/smbu.jpg'

const Intro = props => {
  const imgs = [vador, kylo].map(img => ({
    backgroundImage: `url(${img})`,
    backgroundPosition: 'center'
  }))

  return (
    <div className="a-intro">
      <div className="a-intro__shadow" />
      <div className="a-intro__images">
        <div className="a-intro__images__image" style={imgs[0]} />
        <div className="a-intro__images__image" style={imgs[1]} />
      </div>
      <div className="a-intro__logo">
        <img src={flute} alt="" />
      </div>
    </div>
  )
}

export default Intro
