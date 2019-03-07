import React from 'react'

import './informations.css'
import Scroll from './scroll'
import { Button } from 'antd'

class Informations extends React.Component {
  constructor(props) {
    super(props)
    this.state = { animate: false }
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 800) this.setState({ animate: true }) // animate only when visible on screen
    })
  }
  reload = () => {
    this.setState({ animate: false })
    setTimeout(() => {
      this.setState({ animate: true })
    }, 1000)
  }
  render() {
    return (
      <div className='a-informations'>
        <p className='a-swag-introtext'>
          Il y a bien longtemps, dans une galaxie Troyenne, très Troyenne...
        </p>
        <Scroll animate={this.state.animate} />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            marginTop: '5px'
          }}
        >
          <Button shape='circle' icon='reload' onClick={this.reload} />
        </div>
      </div>
    )
  }
}

export default Informations
