import React from 'react'
import Konami from 'react-konami'

import image from '../../../../assets/mouche.png'
import './mouche.css'

class Mouche extends React.Component {
  constructor() {
    super()

    this.state = {
      show: false
    }

    this.trigger = this.trigger.bind(this)
  }

  trigger() {
    this.setState({
      show: true
    })

    setTimeout(
      () =>
        this.setState({
          show: false
        }),
      2000
    )
  }

  render() {
    return (
      <div className="a-mouche">
        <Konami easterEgg={this.trigger} resetDelay={1000} />
        <div className="a-mouche-modal" active={this.state.show.toString()}>
          <img src={image} alt="" />
        </div>
      </div>
    )
  }
}

export default Mouche
