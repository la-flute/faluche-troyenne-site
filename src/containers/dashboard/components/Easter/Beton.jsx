import React from 'react'
import Konami from './Konami'

import image from '../../../../assets/beton.jpg'
import './mouche.css'

class Beton extends React.Component {
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
      <div className='a-mouche'>
        <Konami action={this.trigger} resetDelay={1000} code={[66, 69, 84, 79, 78]}/>
        <div className='a-mouche-modal' active={this.state.show.toString()}>
          <img src={image} alt='' />
        </div>
      </div>
    )
  }
}

export default Beton
