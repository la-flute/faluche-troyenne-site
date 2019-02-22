import React from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const SubMenu = Menu.SubMenu

class LeftBar extends React.Component {
  constructor(props) {
    super(props)

    let current = '1'
    let openKeys = []

    let tab = this.props.location.split('/')
    tab.splice(0, 1) // remove first element because it's equal to ''

    if (tab[0] === 'dashboard') {
      if (tab[1] === 'admin') {
        openKeys.push('2')

        if (tab[2] === 'users') {
          current = `2-1`
        }
        if(tab[2] === 'conversations' || tab[2] === 'messages') {
          current = `2-2`
        }
        if(tab[2] === 'paids') {
          current = `2-3`
        }
      }

      if(tab[1] === 'respo') {
        openKeys.push('2.1')

        if(tab[2] === 'conversations' || tab[2] === 'messages') {
          current = '2.1-1'
        }
        if(tab[2] === 'scanned') {
          current = '2.1-2'
        }
      }

      if(tab[1] === 'orga') {
        openKeys.push('2.2')

        if(tab[2] === 'validate') {
          current = '2.2-1'
        }
        if(tab[2] === 'payment') {
          current = '2.2-2'
        }
      }

      if (tab[1] === 'tournois') {
        openKeys.push('3')

        if (tab.length >= 2) {
          tab[2] === 'libre'
            ? openKeys.push(`3-7`)
            : openKeys.push(`3-${tab[2]}`)

          if (tab.length >= 4) {
            if (tab[3] === 'arbre-tournois') {
              current = `3-${tab[2]}-1`
            }
            if (tab[3] === 'teams') {
              current = `3-${tab[2]}-2`
            }
            if(tab[3] === 'players') {
              tab[2] === 'libre'
                ? (current = `3-7-2`)
                : (current = `3-${tab[2]}-2`)
            }
            if(tab[3] === 'decks') {
              current = `3-${tab[2]}-2.3`
            }
            if (tab[3] === 'mydecks') {
              current = `3-${tab[2]}-2.5`
            }
            if (tab[3] === 'rules') {
              current = `3-${tab[2]}-3`
            }
            if (tab[3] === 'info') {
              tab[2] === 'libre'
                ? (current = `3-7-5`)
                : (current = `3-${tab[2]}-5`)
            }
            if(tab[2] === 'libre') {
              if (tab[3] === 'players') {
                current = `3-7-1`
              }
              if (tab[3] === 'calendar') {
                current = `3-7-2`
              }
              if (tab[3] === 'compare') {
                current = `3-7-3`
              }
            }
          }
        }
      }
      if (tab[1] === 'messages') {
        current = '2.5'
      }
    }

    this.state = { current, openKeys }
  }

  handleClick = e => {
    this.setState({
      current: e.key
    })
  }

  render() {

    let { user } = this.props
    let subMenuAdmin = ''
    if (user && user.permission && user.permission.admin) {
      subMenuAdmin = (
        <SubMenu
            key="2"
            title={
              <span>
                <Icon type="crown" />
                <span>Administration</span>
              </span>
            }
          >
            <Menu.Item key="2-1">
              <Link to={`/dashboard/admin/users`}>
                <Icon type="user" />
                <span>Utilisateurs</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2-3">
              <Link to={`/dashboard/admin/paids`}>
                <Icon type="line-chart" />
                <span>Mais qui a payé ?</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2-5">
              <Link to={`/dashboard/admin/material`}>
                <Icon type="desktop" />
                <span>Matériel</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2-6">
              <Link to={`/dashboard/admin/places`}>
                <Icon type="profile" />
                <span>Places</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2-7">
            <Link to={'/dashboard/admin/scanned'}>
              <Icon type="schedule" />
              <span>Équipes scannées</span>
            </Link>
          </Menu.Item>
          </SubMenu>
      )
    }
    let subMenuRespo = ''
    if (user && user.permission && user.permission.respo) {
      subMenuRespo = (
        <SubMenu
          key="2.1"
          title={
            <span>
              <Icon type="crown" />
              <span>Respo Tournoi</span>
            </span>
          }
        >
          <Menu.Item key="2.1-1">
            <Link to={'/dashboard/respo/conversations'}>
              <Icon type="message" />
              <span>Messagerie tournoi</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2.1-2">
            <Link to={'/dashboard/respo/scanned'}>
              <Icon type="schedule" />
              <span>Équipes scannées</span>
            </Link>
          </Menu.Item>
        </SubMenu>
      )
    }
    let subMenuOrga = ''
    if (user && user.permission && (user.permission.permission || user.permission.admin)) {
      subMenuOrga = (
        <SubMenu
          key="2.2"
          title={
            <span>
              <Icon type="crown" />
              <span>Organisateur</span>
            </span>
          }
        >
          {(user.permission.permission.includes('validate') || user.permission.admin) &&
            <Menu.Item key="2.2-1">
              <Link to={`/dashboard/orga/validate`}>
                <Icon type="barcode" />
                <span>Valider l'entrée</span>
              </Link>
            </Menu.Item>
          }
          {(user.permission.permission.includes('payment') || user.permission.admin) &&
            <Menu.Item key="2.2-2">
              <Link to={`/dashboard/orga/payment`}>
                <Icon type="euro" />
                <span>Valider un paiement</span>
              </Link>
            </Menu.Item>
          }
        </SubMenu>
      )
    }
    
    return (
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[this.state.current]}
        defaultOpenKeys={this.state.openKeys}
        selectedKeys={[this.state.current]}
        onClick={this.handleClick}
      >
        <Menu.Item key="1" style={{ marginTop: 0 }}>
          <Link to="/dashboard/home">
            <Icon type="home" />
            <span>Accueil</span>
          </Link>
        </Menu.Item>
        {subMenuAdmin}
        {subMenuRespo}
        {subMenuOrga}
        <Menu.Item key="6">
          <a href="https://arena.utt.fr/partners">
            <Icon type="star-o" />
            <span>Partenaires</span>
          </a>
        </Menu.Item>
        <Menu.Item key="7">
          <a href="https://arena.utt.fr/mentions-legales">
            <Icon type="copyright" />
            <span>Mentions légales</span>
          </a>
        </Menu.Item>
      </Menu>
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
