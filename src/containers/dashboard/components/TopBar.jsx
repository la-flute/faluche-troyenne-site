import React from 'react'
import { connect } from 'react-redux'
import { Layout, Menu, Icon } from 'antd'
import { fetchUser } from '../../../modules/user'
import { logout } from '../../../modules/login'
import flute from '../../../../src/assets/flute.png'
const { Header } = Layout

class TopBar extends React.Component {
  constructor(props) {
    super(props)

    this.props.fetchUser()
  }

  render() {

    return (
      <Header className="header">
        <div className="logo">
          <img src={flute} alt="" />
          <span>WET 3</span>
        </div>
        
        <Menu
          theme="dark"
          mode="horizontal"
          style={{ lineHeight: '64px', float: 'right',  }}
        >
          <Menu.Item key="1" onClick={this.props.disconnect}>
            <div>
              <Icon type='logout' /> Déconnexion
            </div>
          </Menu.Item>

        </Menu>
      </Header>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.user
})

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(fetchUser()),
  disconnect: () => dispatch(logout())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopBar)
