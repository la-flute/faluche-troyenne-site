import React from 'react'
import { Icon, Tooltip, Modal, Button, Checkbox, Spin } from 'antd'
import { connect } from 'react-redux'
import {
  setAdmin,
  setOrga,
  setTreso,
  setRedac,
  removeAdmin,
  removeOrga,
  removeTreso,
  removeRedac,
} from '../../../../../modules/admin'
import Respo from './Respo'

import '../admin.css'

const CheckboxGroup = Checkbox.Group
const confirm = Modal.confirm

class UserListActions extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      setAdminModalVisible: false,
      removeAdminModalVisible: false,
      permissionModalVisible: false,
      respoModalVisible: false,
      checkedPermission: [],
      checkedRespo: []
    }
  }

  openMainModal = () => {
    this.setState({
      mainModalVisible: true
    })
  }

  closeMainModal = () => {
    this.setState({
      mainModalVisible: false
    })
  }

  showConfirm = (title, content, callback) => {
    confirm({
      title,
      content,
      onOk() {
        callback()
      },
      onCancel() {}
    })
  }

  openPermissionModal = () => {
    this.setState({
      permissionModalVisible: true,
      mainModalVisible: false
    })
  }

  closePermissionModal = () => {
    this.setState({
      permissionModalVisible: false,
      mainModalVisible: true
    })
  }

  render() {
    const { users, userId } = this.props
    const user = users.find(u => u.id === userId)
    console.log('USER : ', user)
    if (!user) {
      return <Spin />
    }
    let userIsAdmin = user.permission && user.permission.admin
    let userIsOrga = user.permission && user.permission.bureau
    let userIsTreso = user.permission && user.permission.treso
    let userIsRedac = user.permission && user.permission.write
    console.log('Admin : ', userIsAdmin)
    console.log('Orga : ', userIsOrga)
    console.log('Treso : ', userIsTreso)
    console.log('Redac : ', userIsRedac)

    return (
      <React.Fragment>
        <Tooltip placement="top" title="Actions">
          <a onClick={this.openMainModal} style={{ fontSize: '18px' }}>
            <Icon type="setting" />
          </a>
        </Tooltip>

        {/* MODAL PRINCIPALE */}
        <Modal
          title="Actions"
          visible={this.state.mainModalVisible}
          footer={
            <Button type="primary" onClick={this.closeMainModal}>
              Ok
            </Button>
          }
          onCancel={this.closeMainModal}
        >
          <h1 className="admin-action-username">
            {`Gestion des permissions de ${user.firstName} ${user.lastName}`}
          </h1>

          {/* DROITS ADMINISTRATEURS */}
          <h2 className="admin-action-title">
            <Icon type="crown" /> Administrateur
          </h2>
          <div className="admin-action-content">
            {!userIsAdmin ? (
              <Tooltip placement="right" title="Rendre administrateur">
                <Button
                  type="primary"
                  onClick={() =>
                    this.showConfirm(
                      `Définir cet utilisateur comme administrateur ?`,
                      `Cela lui donnera les pleins pouvoir sur le site et son contenu. Fais pas l'con Philippe !`,
                      () => this.props.setAdmin(this.props.userId)
                    )
                  }
                  className="admin-action-button"
                >
                  Définir administrateur
                </Button>
              </Tooltip>
            ) : (
              <React.Fragment>
                <Tooltip
                  placement="right"
                  title="Enlever le rang d'administrateur"
                >
                  <Button
                    type="danger"
                    onClick={() =>
                      this.showConfirm(
                        `Retirer cet utilisateur des administrateur ?`,
                        `Cela lui retirera les droits administrateurs. Fais pas l'con Philippe !`,
                        () => this.props.removeAdmin(this.props.userId)
                      )
                    }
                    className="admin-action-button"
                    style={{
                      backgroundColor: '#ff0000',
                      borderColor: '#ff0000'
                    }}
                  >
                    Retirer administrateur
                  </Button>
                </Tooltip>
                <p style={{ marginTop: '10px' }}>
                  L'utilisateur étant administrateur, toutes les permissions lui
                  sont accordées.
                </p>
              </React.Fragment>
            )}
          </div>

          {/* AUTRES DROITS */}
          {!userIsAdmin && (
            <React.Fragment>
              <h2 className="admin-action-title">
                <Icon type="tool" /> Rôles
              </h2>
              <div className="admin-action-content">
                {!userIsOrga || userIsOrga === null ? (
                  <Tooltip placement="right" title="Définir comme orga">
                    <Button
                      type="primary"
                      onClick={() =>
                        this.showConfirm(
                          `Ajouter cet utilisateur comme organisateur ?`,
                          `Cela lui donnera les droits organisateur. Fais pas l'con Philippe !`,
                          () => this.props.setOrga(this.props.userId)
                        )
                      }
                      style={{ marginTop: '10px' }}
                    >
                      Définir organisateur
                    </Button>
                  </Tooltip>
                ) : (
                  <Tooltip placement="right" title="Retirer orga">
                    <Button
                      type="primary"
                      onClick={() =>
                        this.showConfirm(
                          `Retirer cet utilisateur des organisateurs ?`,
                          `Cela lui retirera les droits organisateur. Fais pas l'con Philippe !`,
                          () => this.props.removeOrga(this.props.userId)
                        )
                      }
                      style={{ marginTop: '10px' }}
                    >
                      Retirer organisateur
                    </Button>
                  </Tooltip>
                )}
                {!userIsTreso || userIsTreso === null ? (
                  <Tooltip placement="right" title="Définir comme tréso">
                    <Button
                      type="primary"
                      onClick={() =>
                        this.showConfirm(
                          `Ajouter cet utilisateur comme trésorier ?`,
                          `Cela lui donnera les droits trésorier. Fais pas l'con Philippe !`,
                          () => this.props.setTreso(this.props.userId)
                        )
                      }
                      style={{ marginTop: '10px' }}
                    >
                      Définir trésorier
                    </Button>
                  </Tooltip>
                ) : (
                  <Tooltip placement="right" title="Retirer orga">
                    <Button
                      type="primary"
                      onClick={() =>
                        this.showConfirm(
                          `Retirer cet utilisateur des trésoriers ?`,
                          `Cela lui retirera les droits trésorier. Fais pas l'con Philippe !`,
                          () => this.props.removeTreso(this.props.userId)
                        )
                      }
                      style={{ marginTop: '10px' }}
                    >
                      Retirer trésorier
                    </Button>
                  </Tooltip>
                )}
                {!userIsRedac || userIsRedac === null ? (
                  <Tooltip placement="right" title="Définir comme tréso">
                    <Button
                      type="primary"
                      onClick={() =>
                        this.showConfirm(
                          `Ajouter cet utilisateur comme rédacteur ?`,
                          `Cela lui donnera les droits rédacteur. Fais pas l'con Philippe !`,
                          () => this.props.setRedac(this.props.userId)
                        )
                      }
                      style={{ marginTop: '10px' }}
                    >
                      Définir rédacteur
                    </Button>
                  </Tooltip>
                ) : (
                  <Tooltip placement="right" title="Retirer orga">
                    <Button
                      type="primary"
                      onClick={() =>
                        this.showConfirm(
                          `Retirer cet utilisateur des rédacteurs ?`,
                          `Cela lui retirera les droits rédacteur. Fais pas l'con Philippe !`,
                          () => this.props.removeRedac(this.props.userId)
                        )
                      }
                      style={{ marginTop: '10px' }}
                    >
                      Retirer rédacteur
                    </Button>
                  </Tooltip>
                )} 
              </div>
            </React.Fragment>
          )}
        </Modal>

        <Modal
          title="Êtes vous sûr ?"
          visible={this.state.permissionModalVisible}
          onOk={this.setPermission}
          onCancel={this.closePermissionModal}
          cancelText="Annuler"
          okText="Ok"
        >
          <h3>Modifier les permissions</h3>
          <p>
            <strong>
              Utilisateur :{' '}
              {`${user.name} (${user.firstname} ${user.lastname})`}
            </strong>
          </p>
        </Modal>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setAdmin: id => dispatch(setAdmin(id)),
  setOrga: id => dispatch(setOrga(id)),
  setTreso: id => dispatch(setTreso(id)),
  setRedac: id => dispatch(setRedac(id)),

  removeAdmin: id => dispatch(removeAdmin(id)),
  removeOrga: id => dispatch(removeOrga(id)),
  removeTreso: id => dispatch(removeTreso(id)),
  removeRedac: id => dispatch(removeRedac(id)),
})

export default connect(
  null,
  mapDispatchToProps
)(UserListActions)
