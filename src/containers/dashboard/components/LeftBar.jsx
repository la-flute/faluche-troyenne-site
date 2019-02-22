import React from 'react'
import { Layout, Menu, Icon } from 'antd'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
const { Sider } = Layout
const { SubMenu } = Menu

class LeftBar extends React.Component {
  constructor(props) {
    super(props)
    let current = 'home'
    let openKeys = []
    this.state = { current, openKeys, collapsed: false }
  }

  static getDerivedStateFromProps(props, state) {
    let tab = props.location.split('/dashboard/')
    if (state.current !== tab[1]) {
      const tab2 = tab[1].split('/')
      let openKeys = []
      if (tab2.length > 1) {
        openKeys.push(tab2[0])
      }
      return { current: tab[1], openKeys }
    }
    return null
  }
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }

  handleClick = e => {
    this.setState({
      current: e.key
    })
  }
  render() {
    
    return (
      <Sider
      breakpoint="lg"
      collapsedWidth="0"
    >
      <div className="logo" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[this.state.current]}
        defaultOpenKeys={this.state.openKeys}
        selectedKeys={[this.state.current]}
        onClick={this.handleClick}
      >
        <Menu.Item key="home">
          <Link to={'/dashboard/home'}>
            <Icon type="user" />
            <span className="nav-text">Accueil</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="user">
          <Link to={'/dashboard/user'}>
            <Icon type="user" />
            <span className="nav-text">Mes infos</span>
          </Link>
        </Menu.Item>
        <SubMenu key="admin" title={<span><Icon type="setting" /><span>Admin</span></span>}>
          <Menu.Item key="admin/temp"><Link to={'/dashboard/admin/temp'}>Option 9</Link></Menu.Item>
          <Menu.Item key="admin/temp2"><Link to={'/dashboard/admin/temp2'}>Option 10</Link></Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
  location: state.routing.location.pathname,
})


export default connect(
  mapStateToProps,
  null
)(LeftBar)
