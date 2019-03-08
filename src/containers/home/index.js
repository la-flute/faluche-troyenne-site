import React from 'react'
import { connect } from 'react-redux'

import './home.css'

import ScrollToTopOnMount from './components/scrollToTopOnMount'
import Header from './components/header'
import Intro from './components/intro'
import Countdown from './components/countdown'
import Informations from './components/informations/informations'
import Category from './components/category'
import Footer from './components/footer'
import LoginModal from './components/loginModal/LoginModal'

import { fetchCanLogin } from '../../modules/canLogin'
import { autoLogin } from '../../modules/login'

class Home extends React.Component {
  constructor() {
    super()

    this.state = {
      loginModalOpened: false,
      forgotModalOpened: false,
      contactModalOpened: false
    }

    this.openLoginModal = this.openLoginModal.bind(this)
    this.openForgotModal = this.openForgotModal.bind(this)
    this.openContactModal = this.openContactModal.bind(this)
    this.closeLoginModal = this.closeLoginModal.bind(this)
    this.closeContactModal = this.closeContactModal.bind(this)
    this.closeForgotModal = this.closeForgotModal.bind(this)
    this.scrollCapture = this.scrollCapture.bind(this)
  }

  componentWillMount() {
    this.props.fetchCanLogin()
    this.props.autoLogin()

    document.addEventListener('scroll', this.scrollCapture, { passive: true })
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.scrollCapture)
  }

  openLoginModal() {
    this.setState({
      loginModalOpened: true
    })
  }

  closeLoginModal() {
    this.setState({
      loginModalOpened: false
    })
  }

  openContactModal() {
    this.setState({
      contactModalOpened: true
    })
  }

  closeContactModal() {
    this.setState({
      contactModalOpened: false
    })
  }

  openForgotModal() {
    this.setState({
      loginModalOpened: false,
      forgotModalOpened: true
    })
  }

  closeForgotModal() {
    this.setState({
      loginModalOpened: true,
      forgotModalOpened: false
    })
  }

  scrollCapture() {
    const scrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0

    const bottom = window.innerHeight + 125 - 12 - 60

    document.body.className =
      scrollTop >= document.body.scrollHeight - bottom ? 'a-social-fixed' : ''
  }

  render() {
    return (
      <div>
        <ScrollToTopOnMount />
        <Header
          openLoginModal={this.openLoginModal}
          openContactModal={this.openContactModal}
        />
        <Intro />
        <LoginModal
          isOpen={this.state.loginModalOpened}
          onClose={this.closeLoginModal}
          onForgot={this.openForgotModal}
        />
        <main className='a-home'>
          <div className='a-home__content'>
            <Countdown date={new Date('May 3, 2019 18:00:00')} />
            <Category id='informations'>informations</Category>
            <Informations />
            <Category id='lieu'>lieu du congrès</Category>
            <div className='place'>
              <span>Auberge de jeunesse de Rosières</span>
              <span>Chemin Sainte-Scholastique</span>
              <span>10430 Rosières-prés-Troyes</span>
            </div>
            <Category id='paliers'>Paliers</Category>
            <div className='palier'>
              <span className='palier-title'>
                <strong className='palier-title-1'>Premier palier</strong>{' '}
                (jusqu'au 23/03/2019)
              </span>
              <span>
                Week-End avec alcool{' '}
                <strong className='palier-title-1'>50.33€</strong>
              </span>
              <span>
                Week-End Bacchus Troué{' '}
                <strong className='palier-title-1'>43.00€</strong>
              </span>
              <br />
              <span className='palier-title'>
                <strong className='palier-title-2'>Deuxième palier</strong> (du
                24/03/2019 au 21/04/2019)
              </span>
              <span>
                Week-End avec alcool{' '}
                <strong className='palier-title-2'>55.33€</strong>
              </span>
              <span>
                Week-End Bacchus Troué{' '}
                <strong className='palier-title-2'>48.00€</strong>
              </span>
              <br />
              <span className='palier-title'>
                <strong className='palier-title-3'>Troyesieme palier</strong>{' '}
                (du 22/04/2019 au 03/05/2019)
              </span>
              <span>
                Week-End avec alcool{' '}
                <strong className='palier-title-3'>60.33€</strong>
              </span>
              <span>
                Week-End Bacchus Troué{' '}
                <strong className='palier-title-3'>53.00€</strong>
              </span>
              <br />
              <span>
                (<span className='Deathstar'>+</span>7€ si couchage en dur)
              </span>
            </div>
            <Category id='bk'>burger king</Category>
            <div className='bk'>
              <span>4 boulevard de l'ouest</span>
              <span>la voix des pois - centre commercial l'escapade</span>
              <span>10600 la chapelle-saint-luc</span>
            </div>
            <Category id='remboursement'>remboursement</Category>
            <div className='remboursement'>
              <span>
                envoie du rib dans un petit mail à{' '}
                <strong className='Deathstar'>laflute.troyes@gmail.com</strong>{' '}
                avant le 22/04/2019 (deadline pour se faire rembourser, aucuns
                remboursements acceptés après cette date)
              </span>
            </div>
          </div>
          <Footer openContactModal={this.openContactModal} />
        </main>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchCanLogin: () => dispatch(fetchCanLogin()),
  autoLogin: () => dispatch(autoLogin())
})

export default connect(
  null,
  mapDispatchToProps
)(Home)
