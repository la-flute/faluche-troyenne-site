import React from 'react'

import './troll.css'

class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      messages: [
        "Tu croyais vraiment qu'on allait ouvrir maintenant ?",
        'tu es bien naïf',
        'signé les devs',
        'cheh'
      ],
      index: 0
    }
    this.interval = setInterval(() => this.setState({ index: this.state.index + 1 }), 4000)
  }
  render() {
    if(this.state.index > 3) {
      clearInterval(this.interval)
      window.location = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    }
    return (
      <div className='troll-container'>
        <h1>{this.state.messages[this.state.index]}</h1>
      </div>
    )
  }
}


export default Home
