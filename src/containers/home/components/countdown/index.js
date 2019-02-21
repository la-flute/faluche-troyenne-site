import React from 'react'
import Countdown from 'react-countdown-now'

import './countdown.css'

const _Countdown = props => {
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return null
    }
    else {
      return (<React.Fragment>
        <div>
          <h1>{days}</h1>
          <h2>Jours</h2>
        </div>
        <div>
          <h1>{hours}</h1>
          <h2>Heures</h2>
        </div>
        <div>
          <h1>{minutes}</h1>
          <h2>Minutes</h2>
        </div>
        <div>
          <h1>{seconds}</h1>
          <h2>Secondes</h2>
        </div>
      </React.Fragment>)
    }
  }
  
  return (
    <div className="a-countdown">
      <Countdown date={props.date} renderer={renderer}/>
    </div>)
}

export default _Countdown
