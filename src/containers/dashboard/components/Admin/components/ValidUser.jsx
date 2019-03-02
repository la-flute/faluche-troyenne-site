import React from 'react'

import { connect } from 'react-redux'

import { Button, Spin, Modal, Tooltip } from 'antd'

import {validateUser, unvalidateUser} from '../../../../../modules/admin'

const confirm = Modal.confirm

class ValidUser extends React.Component {
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

  render() {
    const { users, userId } = this.props
    const user = users.find(u => u.id === userId)
    if (!user) {
      return <Spin />
    }
    return (
      <React.Fragment>
        {/* USER PAS VALIDE MAIS DOSSIER COMPLET */}
        {user &&
          user.trajet &&
          user.caution &&
          user.attestation &&
          user.paid&&
          !user.validated && (
            <Tooltip placement="right" title="Valider le dossier">
              <Button
                type="primary"
                onClick={() =>
                  this.showConfirm(
                    'Valider le dossier de cet utilisateur ?',
                    `Cela validera le dossier de ce participant et l'inscrira définitivement au WET. Fais pas l'con Philippe !`,
                    () => this.props.validateUser(userId)
                  )
                }
              >
                Valider dossier
              </Button>
            </Tooltip>
          )}

        {/* USER PAS VALIDE ET DOSSIER INCOMPLET */}
        {user &&
          (!user.trajet || !user.caution || !user.attestation || !user.paid) &&
          !user.validated && (
            <Button type="primary" disabled>
              Dossier incomplet
            </Button>
          )}

        {/* ANNULATION D'UN PARTICIPANT */}
        {user &&
          user.trajet &&
          user.caution &&
          user.attestation &&
          user.validated && (
            <Tooltip placement="right" title="Annuler le dossier">
              <Button
                type="primary"
                onClick={() =>
                  this.showConfirm(
                    'Annuler le dossier de cet utilisateur ?',
                    `Cela annulera le dossier de ce participant et le désinscrira définitivement au WET. Fais pas l'con Philippe !`,
                    () => this.props.unvalidateUser(userId)
                  )
                }
              >
                Annuler la participation
              </Button>
            </Tooltip>
          )}
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  validateUser: userId => dispatch(validateUser(userId)),
  unvalidateUser: userId => dispatch(unvalidateUser(userId)),
})

export default connect(
  null,
  mapDispatchToProps
)(ValidUser)
