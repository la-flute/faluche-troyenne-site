import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import Accueil from './components/Accueil'
import UsersList from './components/Admin/UsersList'
import Paids from './components/Admin/Paids'
import Payment from './components/Orga/Payment'
import DashboardLayout from './layout'

import { autoLogin } from '../../modules/login'

import './dashboard.css'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      path: this.props.match.path,
      pathname: this.props.location.pathname
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      path: nextProps.match.path,
      pathname: nextProps.location.pathname
    })
  }

  componentWillMount() {
    this.props.autoLogin()
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps !== this.props || nextState !== this.state ? true : false
  }

  render() {
    let component = null
    let tab = this.props.location.split('/')
    tab.splice(0,1) // remove first element because it's equal to ''

    if(tab[0] !== 'dashboard') {
      this.props.goToHome()
    }
    
    if(tab[1] === 'home' && tab.length === 2) component = <Accueil />

    if(tab[1] === 'admin') {
      let user = this.props.user

      if(user) {
        if(user.permission && user.permission.admin) {
          if(tab[2] === 'users') component = <UsersList />
          if(tab[2] === 'paids') component = <Paids />
        }
        else {
          this.props.goToHome()
        }
      }
    }


    if(tab[1] === 'orga') {
      let user = this.props.user

      if(user) {
        if(user.permission) {
          if(user.permission.permission.includes('payment') || user.permission.admin) {
            if(tab[2] === 'payment') component = <Payment />
          }
          else {
            this.props.goToHome()
          }
        }
        else {
          this.props.goToHome()
        }
      }
    }
    

    if(component === null) {      
      return null
    }

    return (
      <DashboardLayout
        path={this.state.pathname}
        component={component}
      />
    )
  }
}

const mapStateToProps = state => ({
  location: state.routing.location.pathname,
  user: state.user.user
})

const mapDispatchToProps = dispatch => ({
  autoLogin: () => dispatch(autoLogin()),
  goToHome: () => dispatch(push('/dashboard/home'))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)
