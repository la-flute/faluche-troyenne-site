import React from 'react'
import { Layout, Menu, Icon } from 'antd'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getDisplays } from '../../../modules/displays'
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
    console.log(this.props)
    const { user, render } = this.props
    return (
      <Sider breakpoint='lg' collapsedWidth='0' width={250}>
        <div className='logo' />
        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={[this.state.current]}
          defaultOpenKeys={this.state.openKeys}
          selectedKeys={[this.state.current]}
          onClick={this.handleClick}
        >
          <Menu.Item key='home'>
            <Link to={'/dashboard/home'}>
              <Icon type='user' />
              <span className='nav-text'>Accueil</span>
            </Link>
          </Menu.Item>

          {/* MENU USER */}
          {user && (
            <SubMenu
              key='user'
              title={
                <span>
                  <Icon type='user' />
                  <span>Mon dossier</span>
                </span>
              }
            >
              <Menu.Item key='user/infos'>
                <Link to={'/dashboard/user/infos'}>
                  <Icon type='file' />
                  <span className='nav-text'>
                    {user.town ? 'Mes informations' : 'La fiche'}
                  </span>
                </Link>
              </Menu.Item>
              <Menu.Item key='user/attestation'>
                <Link to={'/dashboard/user/attestation'}>
                  <Icon type='form' />
                  <span className='nav-text'>Attestation sur l'honneur</span>
                </Link>
              </Menu.Item>
              <Menu.Item key='user/caution'>
                <Link to={'/dashboard/user/caution'}>
                  <Icon type='bank' />
                  <span className='nav-text'>Caution</span>
                </Link>
              </Menu.Item>
              <Menu.Item key='user/list'>
                <Link to={'/dashboard/user/list'}>
                  <Icon type='bars' />
                  <span className='nav-text'>Liste des inscrits</span>
                </Link>
              </Menu.Item>
              {!user.order && (
                <Menu.Item key='user/pay'>
                  <Link to={'/dashboard/user/pay'}>
                    <Icon type='shopping-cart' />
                    <span className='nav-text'>Payer</span>
                  </Link>
                </Menu.Item>
              )}
              {user.validated && (
                <Menu.Item key='user/bedrooms'>
                  <Link to={'/dashboard/user/bedrooms'}>
                    <Icon type='home' />
                    <span className='nav-text'>Chambres</span>
                  </Link>
                </Menu.Item>
              )}
              <Menu.Item key='user/teams'>
                <Link to={'/dashboard/user/teams'}>
                  <Icon type='team' />
                  <span className='nav-text'>Équipes</span>
                </Link>
              </Menu.Item>
            </SubMenu>
          )}

          {/* MENU TINDER */}
          {user && user.validated && render && render[0] && render[0].render && (
            <SubMenu
              key='tinder'
              title={
                <span>
                  <Icon type='heart' />
                  <span>Tinder</span>
                </span>
              }
            >
              {user.town && (
                <Menu.Item key='tinder/profile'>
                  <Link to={'/dashboard/tinder/profile'}>
                    <Icon type='edit' />
                    <span className='nav-text'>Modifier mon profil</span>
                  </Link>
                </Menu.Item>
              )}
              {user && user.image && (
                <Menu.Item key='tinder/view'>
                  <Link to={'/dashboard/tinder/view'}>
                    <Icon type='contacts' />
                    <span className='nav-text'>Voir les profils</span>
                  </Link>
                </Menu.Item>
              )}
              {user && user.image && (
                <Menu.Item key='tinder/matchs'>
                  <Link to={'/dashboard/tinder/matchs'}>
                    <Icon type='heart' />
                    <span className='nav-text'>Voir mes matchs</span>
                  </Link>
                </Menu.Item>
              )}
              <Menu.Item key='tinder/top'>
                <Link to={'/dashboard/tinder/top'}>
                  <Icon type='star' />
                  <span className='nav-text'>Classement</span>
                </Link>
              </Menu.Item>
            </SubMenu>
          )}

          {/* MENU TARGET */}
          {user && user.validated && render[1] && render[1].render && (
            <SubMenu
              key='target'
              title={
                <span>
                  <Icon type='fire' />
                  <span>Target</span>
                </span>
              }
            >
              {user.town && (
                <Menu.Item key='target/profile'>
                  <Link to={'/dashboard/target/profile'}>
                    <Icon type='edit' />
                    <span className='nav-text'>Modifier ma photo</span>
                  </Link>
                </Menu.Item>
              )}
              {user && (
                <Menu.Item key='target/view'>
                  <Link to={'/dashboard/target/view'}>
                    <Icon type='stop' />
                    <span className='nav-text'>Plier des gens</span>
                  </Link>
                </Menu.Item>
              )}
              {user && (
                <Menu.Item key='target/matchs'>
                  <Link to={'/dashboard/target/matchs'}>
                    <Icon type='thunderbolt' />
                    <span className='nav-text'>Qui veut ta mort ?</span>
                  </Link>
                </Menu.Item>
              )}
              <Menu.Item key='target/top'>
                <Link to={'/dashboard/target/top'}>
                  <Icon type='bars' />
                  <span className='nav-text'>Classement</span>
                </Link>
              </Menu.Item>
            </SubMenu>
          )}

          {/* MENU ORGA */}
          {user &&
            user.permission &&
            (user.permission.treso || user.permission.bureau) && (
              <SubMenu
                key='orga'
                title={
                  <span>
                    <Icon type='setting' />
                    <span>Organisateur</span>
                  </span>
                }
              >
                <Menu.Item key='orga/validate'>
                  <Link to={'/dashboard/orga/validate'}>
                    Validation des inscriptions
                  </Link>
                </Menu.Item>
              </SubMenu>
            )}

<<<<<<< HEAD
          {/* MENU ADMIN */}
          {user && user.permission && user.permission.admin && (
            <SubMenu
              key='admin'
              title={
                <span>
                  <Icon type='setting' />
                  <span>Admin</span>
                </span>
              }
            >
              <Menu.Item key='orga/validate'>
                <Link to={'/dashboard/orga/validate'}>
                  Validation des inscriptions
                </Link>
              </Menu.Item>
              <Menu.Item key='admin/bedrooms'>
                <Link to={'/dashboard/admin/bedrooms'}>
                  Gestion des chambres
                </Link>
              </Menu.Item>
              <Menu.Item key='admin/teams'>
                <Link to={'/dashboard/admin/teams'}>Gestion des équipes</Link>
              </Menu.Item>
              <Menu.Item key='admin/prices'>
                <Link to={'/dashboard/admin/prices'}>Gestion des paliers</Link>
              </Menu.Item>
              {/* <Menu.Item key='admin/finduser'>
=======
                    {/* MENU ADMIN */}
                    {user &&
                        user.permission &&
                        (user.permission.admin ||
                            user.permission.treso ||
                            user.permission.bureau) && (
                            <SubMenu
                                key='admin'
                                title={
                                    <span>
                                        <Icon type='setting' />
                                        <span>Admin</span>
                                    </span>
                                }
                            >
                                {user.permission.admin ||
                                user.permission.treso ? (
                                    <Menu.Item key='admin/validate'>
                                        <Link to={'/dashboard/admin/validate'}>
                                            Validation des inscriptions
                                        </Link>
                                    </Menu.Item>
                                ) : null}

                                <Menu.Item key='admin/bedrooms'>
                                    <Link to={'/dashboard/admin/bedrooms'}>
                                        Gestion des chambres
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key='admin/teams'>
                                    <Link to={'/dashboard/admin/teams'}>
                                        Gestion des équipes
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key='admin/prices'>
                                    <Link to={'/dashboard/admin/prices'}>
                                        Gestion des paliers
                                    </Link>
                                </Menu.Item>
                                {/* <Menu.Item key='admin/finduser'>
>>>>>>> master
                <Link to={'/dashboard/admin/temp2'}>
                  Rechercher un utilisateur
                </Link>
              </Menu.Item> */}
<<<<<<< HEAD
              {/* <Menu.Item key='admin/mail'>
                <Link to={'/dashboard/admin/mail'}>Envoyer un mail</Link>
              </Menu.Item> */}
              <Menu.Item key='admin/settings'>
                <Link to={'/dashboard/admin/settings'}>
                  Panneau d'administration
                </Link>
              </Menu.Item>
              <Menu.Item key='admin/define'>
                <Link to={'/dashboard/admin/define'}>
                  Gestion des administrateurs
                </Link>
              </Menu.Item>
            </SubMenu>
          )}
        </Menu>
      </Sider>
    )
  }
=======
                                {/* <Menu.Item key='admin/mail'>
                <Link to={'/dashboard/admin/mail'}>Envoyer un mail</Link>
              </Menu.Item> */}
                                {user.permission.admin && (
                                    <Menu.Item key='admin/settings'>
                                        <Link to={'/dashboard/admin/settings'}>
                                            Panneau d'administration
                                        </Link>
                                    </Menu.Item>
                                )}
                                {user.permission.admin && (
                                    <Menu.Item key='admin/define'>
                                        <Link to={'/dashboard/admin/define'}>
                                            Gestion des administrateurs
                                        </Link>
                                    </Menu.Item>
                                )}
                            </SubMenu>
                        )}
                </Menu>
            </Sider>
        )
    }
>>>>>>> master
}

const mapStateToProps = state => ({
  user: state.user.user,
  location: state.routing.location.pathname,
  render: state.displays.displays
})

const mapDispatchToProps = dispatch => ({
  getDisplays: () => dispatch(getDisplays())
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeftBar)
