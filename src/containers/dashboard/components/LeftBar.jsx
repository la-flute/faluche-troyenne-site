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
    if (tab[1] && state.current !== tab[1]) {
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
      collapsed: !this.state.collapsed
    })
  }

  handleClick = e => {
    this.setState({
      current: e.key
    })
  }
  render() {
    return (
      <Sider breakpoint="lg" collapsedWidth="0" width={250} >
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

          {/* MENU USER */}
          <SubMenu
            key="user"
            title={
              <span>
                <Icon type="user" />
                <span>Mon dossier</span>
              </span>
            }
          >
            <Menu.Item key="user/infos">
              <Link to={'/dashboard/user/infos'}>
                <Icon type="file" />
                <span className="nav-text">La fiche</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="user/list">
              <Link to={'/dashboard/user/list'}>
                <Icon type="user" />
                <span className="nav-text">Liste des inscrits</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="user/pay">
              <Link to={'/dashboard/user/pay'}>
                <Icon type="user" />
                <span className="nav-text">Payer</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="user/bedrooms">
              <Link to={'/dashboard/user/bedrooms'}>
                <Icon type="user" />
                <span className="nav-text">Chambre</span>
              </Link>
            </Menu.Item>
            
          </SubMenu>

          {/* MENU ORGA */}
          <SubMenu
            key="orga"
            title={
              <span>
                <Icon type="setting" />
                <span>Organisateur</span>
              </span>
            }
          >
            <Menu.Item key="orga/incoming">
              <Link to={'/dashboard/admin/incoming'}>Valider les arrivées</Link>
            </Menu.Item>
          </SubMenu>

          {/* MENU ADMIN */}
          <SubMenu
            key="admin"
            title={
              <span>
                <Icon type="setting" />
                <span>Admin</span>
              </span>
            }
          >
            <Menu.Item key="admin/validate">
              <Link to={'/dashboard/admin/temp'}>
                Validation des inscriptions
              </Link>
            </Menu.Item>
            <Menu.Item key="admin/bedrooms">
              <Link to={'/dashboard/admin/temp2'}>Gestion des chambres</Link>
            </Menu.Item>
            <Menu.Item key="admin/finduser">
              <Link to={'/dashboard/admin/temp2'}>
                Rechercher un utilisateur
              </Link>
            </Menu.Item>
            <Menu.Item key="admin/mail">
              <Link to={'/dashboard/admin/mail'}>
                Envoyer un mail
              </Link>
            </Menu.Item>
            <Menu.Item key="admin/settings">
              <Link to={'/dashboard/admin/settings'}>
                Panneau d'administration
              </Link>
            </Menu.Item>
            <Menu.Item key="admin/define">
              <Link to={'/dashboard/admin/define'}>
                Gestion des administrateurs
              </Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
  location: state.routing.location.pathname
})

export default connect(
  mapStateToProps,
  null
)(LeftBar)
