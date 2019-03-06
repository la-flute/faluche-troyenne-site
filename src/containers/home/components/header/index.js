import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import SmoothScroll from 'smooth-scroll'
import saber from '../../../../assets/saber.png'
import { Button } from 'antd'

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
      this.props.gotoDashboard()
    } else {
      this.props.openLoginModal()
    }
  }

  render() {
    let mainButtonText = this.props.isLoggedIn ? 'Dashboard' : 'Connexion'

    return (
      <header className='a-intro-header'>
        <span className='a-intro__main-text'>WET3</span>
        <div className='a-intro-header__mainButton'>
          <Button
            onClick={this.mainButton}
            className='button_header'
            type='danger'
            size='large'
            shape='round'
          >
            {mainButtonText}
          </Button>
        </div>
        <img src={saber} height='85px' alt='' />
      </header>
    )
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.login.token && state.login.token.length > 0
})

const mapDispatchToProps = dispatch => ({
  gotoHome: () => dispatch(push('/')),
  gotoFAQ: () => dispatch(push('/faq')),
  gotoTournaments: () => dispatch(push('/tournaments')),
  gotoPartners: () => dispatch(push('/partners')),
  gotoDashboard: () => dispatch(push('/dashboard'))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
