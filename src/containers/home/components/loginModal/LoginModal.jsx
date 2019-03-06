import React from 'react'
import { connect } from 'react-redux'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

import './loginModal.css'

import { Modal } from 'antd'

import { register } from '../../../../modules/register'
import { tryLogin } from '../../../../modules/login'
import { fetchUser } from '../../../../modules/user'
import LoginForm from '../loginForm/LoginForm'
import RegisterForm from '../registerForm/registerForm'

class LoginModal extends React.Component {
  constructor() {
    super()

    this.state = {
      tabIndex: 0
    }
  }

  setTabIndex = tabIndex => {
    this.setState({
      tabIndex
    })
  }
  render() {
    return (
      <Modal
        title={this.state.tabIndex === 0 ? 'connexion' : 'inscription'}
        visible={this.props.isOpen}
        onCancel={this.props.onClose}
        footer={null}
        mask={false}
      >
        {this.props.canLogin && (
          <div className='a-login-modal'>
            <Tabs
              selectedIndex={this.state.tabIndex}
              onSelect={this.setTabIndex}
            >
              <TabList>
                <Tab>Connexion</Tab>
                <Tab>Inscription</Tab>
              </TabList>
              <TabPanel>
                <LoginForm />
              </TabPanel>
              <TabPanel>
                <RegisterForm closeModal={this.props.onClose} />
              </TabPanel>
            </Tabs>
          </div>
        )}
        {!this.props.canLogin && (
          <div className='a-cantlogin-modal'>
            Connexion désactivée pour le moment.
          </div>
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
  register: user => dispatch(register(user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginModal)
