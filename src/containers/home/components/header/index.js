import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import SmoothScroll from 'smooth-scroll'

import {Button} from 'antd'

import './header.css'

class Header extends React.Component {
  constructor() {
    super()

    this.scroll = new SmoothScroll()

    this.state = {
      mobileMenu: false
    }

    this.toggleMobileMenu = this.toggleMobileMenu.bind(this)
    this.closeMobileMenu = this.closeMobileMenu.bind(this)
    this.mainButton = this.mainButton.bind(this)
  }

  toggleMobileMenu() {
    this.setState({
      mobileMenu: !this.state.mobileMenu
    })
  }

  closeMobileMenu() {
    this.setState({
      mobileMenu: false
    })
  }

  mainButton() {
    if (this.props.isLoggedIn) {
      console.log('not open')
      this.props.gotoDashboard()
    } else {
      console.log('open')

      this.props.openLoginModal()
    }
  }

  render() {
    let mainButtonText = this.props.isLoggedIn ? 'Dashboard' : 'Connexion'

    return (
      <header className="a-intro-header">
        <nav className="a-intro-header__nav__desktop">
          <div>
            <Button onClick={this.props.gotoHome} className='button_header' type="primary" size='large'>Accueil</Button>
          </div>
          <div>
            <Button onClick={this.props.gotoHome} className='button_header' type="primary" size='large'>Informations</Button>
          </div>
          <div>
            <Button onClick={this.props.gotoHome} className='button_header' type="primary" size='large'>FAQ</Button>
          </div>
          <div>
            <Button onClick={this.props.gotoHome} className='button_header' type="primary" size='large'>Tournois</Button>
          </div>
          <div>
            <Button onClick={this.props.gotoHome} className='button_header' type="primary" size='large'>Partenaires</Button>
          </div>
          <div>
            <Button onClick={this.props.gotoHome} className='button_header' type="primary" size='large'>Contact</Button>
          </div>
          <div className="a-intro-header__mainButton">
            <Button onClick={this.mainButton} className='button_header' type="primary" size='large'>{mainButtonText}</Button>
          </div>
        </nav>
        
        <nav className="a-intro-header__nav__mobile">
          <div className="a-intro-header__nav__mobile__topbar">
            <div style={{ paddingBottom: '3px' }}>
              <Button onClick={this.toggleMobileMenu}>
                <div className={"a-intro-header__hamburger" + (this.state.mobileMenu ? " active" : "")}>
                  <div className="a-intro-header__hamburger__segment"></div>
                  <div className="a-intro-header__hamburger__segment"></div>
                  <div className="a-intro-header__hamburger__segment"></div>
                </div>
              </Button>
            </div>
            <div className="a-intro-header__mainButton" style={{ paddingBottom: '3px' }}>
              <Button onClick={this.mainButton} raised>{mainButtonText}</Button>
            </div>
          </div>

          <div className={"a-intro-header__nav__mobile__content" + (this.state.mobileMenu ? " active" : "")}>
            <div>
              <Button onClick={this.props.gotoHome}>Accueil</Button>
            </div>
            <div>
              <Button onClick={this.props.gotoInformations}>Informations</Button>
            </div>
            <div>
              <Button onClick={this.props.gotoFAQ}>FAQ</Button>
            </div>
            <div>
              <Button onClick={this.props.gotoTournaments}>Tournois</Button>
            </div>
            <div>
              <Button onClick={this.props.gotoPartners}>Partenaires</Button>
            </div>
            <div>
              <Button onClick={this.props.openContactModal}>Contact</Button>
            </div>
          </div>

          <div onClick={this.closeMobileMenu} className={"a-intro-header__nav__mobile__overlay" + (this.state.mobileMenu ? " active" : "")}></div>
        </nav>
      </header>
    )
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.login.token && state.login.token.length > 0
})

const mapDispatchToProps = dispatch => ({
  gotoHome: () => dispatch(push('/')),
  gotoInformations: () => dispatch(push('/informations')),
  gotoFAQ: () => dispatch(push('/faq')),
  gotoTournaments: () => dispatch(push('/tournaments')),
  gotoPartners: () => dispatch(push('/partners')),
  gotoDashboard: () => dispatch(push('/dashboard'))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
