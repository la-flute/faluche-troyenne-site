import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import errorToString from '../../../lib/errorToString'
import { actions as notifActions } from 'redux-notifications'
import { Layout, Menu, Icon } from 'antd'
import { fetchUser, changePassword } from '../../../modules/user'
import { logout } from '../../../modules/login'
import flute from '../../../../src/assets/flute.png'
import PasswordModal from './PasswordModal'
const { Header } = Layout

class TopBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false
    }
    this.props.fetchUser()
  }

  changePassword = () => {
    const form = this.formRef.props.form
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      this.props.changePassword(values, this)
    })
  }

  saveFormRef = formRef => {
    this.formRef = formRef
  }

  render() {
    return (
      <React.Fragment>
        <Header className='header'>
          <div className='logo'>
            <img src={flute} alt='' />
            <span style={{ fontFamily: 'Starjedi', fontSize: '30px' }}>WET 3</span>
          </div>

          <Menu
            theme='dark'
            mode='horizontal'
            style={{ lineHeight: '64px', float: 'right' }}
          >
            <Menu.Item key='2' onClick={() => this.setState({ modal: true })}>
              <div>
                <Icon type='lock' />
              </div>
            </Menu.Item>
            <Menu.Item key='1' onClick={this.props.disconnect}>
              <div>
                <Icon type='logout' /> Déconnexion
              </div>
            </Menu.Item>
          </Menu>
        </Header>

        <PasswordModal
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.modal}
          onCreate={this.changePassword}
          onCancel={() => this.setState({ modal: false })}
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.user
})

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(fetchUser()),
  disconnect: () => dispatch(logout()),
  changePassword: (p, t) =>
    dispatch(changePassword(p)).then(() => t.setState({ modal: false }))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopBar)
