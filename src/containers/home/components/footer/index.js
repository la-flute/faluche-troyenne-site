import React from 'react'

class Footer extends React.Component {
  render() {
    return (
      <div className='a-home__content a-home__footer'>
        <div>
          <a href={`mailto:La%20Flute<laflute.troyes@gmail.com>`}>
            laflute.troyes@gmail.com
          </a>
        </div>
        <div>
          © La Flute
          <a href='/mentions-legales'>Mentions légales</a>
        </div>
      </div>
    )
  }
}

export default Footer
