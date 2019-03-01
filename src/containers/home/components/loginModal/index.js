import React from 'react'
import { connect } from 'react-redux'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { actions as notifActions } from 'redux-notifications'

import './loginModal.css'

import {Modal} from 'antd'

import { register } from '../../../../modules/register'
import { tryLogin } from '../../../../modules/login'
import { fetchUser } from '../../../../modules/user'
import LoginForm from '../loginForm'
import RegisterForm from '../registerForm/registerForm'


class LoginModal extends React.Component {
  constructor() {
    super()

    this.state = {
      tabIndex: 0,
      loading: false,
      accepted: false,
    }

    this.setTabIndex = this.setTabIndex.bind(this)
    this.submit = this.submit.bind(this)
  }


  setTabIndex(tabIndex) {
    this.setState({
      tabIndex
    })
  }

  submit(user) {
    if(!this.state.accepted) return this.props.noAcceptation() 
    if(user.password !== user.password2) return this.props.passwordMismatch()
    this.setState({
      loading: true
    })

    this.props.register(user)
      .then(() => this.setState({ loading: false, tabIndex: 0, accepted: false }))
  }



  render() {
    return (
      <Modal
          title="Connexion"
          visible={this.props.isOpen}
          onCancel={this.props.onClose}
          footer={null}
          mask={false}
        >
         {this.props.canLogin && (
          <div className="a-login-modal">
            <Tabs selectedIndex={this.state.tabIndex} onSelect={this.setTabIndex}>
              <TabList>
                <Tab>Connexion</Tab>
                <Tab>Inscription</Tab>
              </TabList>
              <TabPanel>
                <LoginForm />
              </TabPanel>
              <TabPanel>
                <RegisterForm />
              </TabPanel>
            </Tabs>
          </div>
        )}
        {!this.props.canLogin && (
          <div className="a-cantlogin-modal">Connexion désactivée pour le moment.</div>
        )}
        </Modal>
    )
  }
}

const mapStateToProps = state => ({
  canLogin: state.canLogin.canLogin
})

const mapDispatchToProps = dispatch => ({
  login: user => {
    dispatch(tryLogin(user)).then(() => {
      dispatch(fetchUser())
    })
  },
  register: user => dispatch(register(user)),
  passwordMismatch: () => dispatch(
    notifActions.notifSend({
      message: 'Les mots de passe ne correspondent pas',
      kind: 'danger',
      dismissAfter: 2000
    })
  ),
  noAcceptation: () => dispatch(
    notifActions.notifSend({
      message: 'Vous devez accepter les conditions d\'utilisation',
      kind: 'danger',
      dismissAfter: 2000
    })
  )
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginModal)
