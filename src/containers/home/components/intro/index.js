import React from 'react'

import './intro.css'

import flute from '../../../../assets/flute.png'
import yoda from '../../../../assets/yoda.jpg'
import kylo from '../../../../assets/kylo.jpg'
import finn from '../../../../assets/finn.jpg'
import vador from '../../../../assets/vader.jpg'

const Intro = props => {
  const imgs = [vador, yoda, finn, kylo].map(img => ({
    backgroundImage: `url(${img})`
  }))

  return (
    <div className="a-intro">
      <div className="a-intro__shadow" />
      <div className="a-intro__images">
        <div className="a-intro__images__image" style={imgs[0]} />
        <div className="a-intro__images__image" style={imgs[1]} />
        <div className="a-intro__images__image" style={imgs[2]} />
        <div className="a-intro__images__image" style={imgs[3]} />
      </div>
      <div className="a-intro__logo">
        <img src={flute} alt="" />
      </div>
    </div>
  )
}

export default Intro
