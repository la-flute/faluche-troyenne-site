import React from 'react'
import { Icon, Tooltip, Modal, Radio, Divider } from 'antd'
import { connect } from 'react-redux'
import {
  validatePayment,
  unvalidatePayment,
  validateCaution,
  unvalidateCaution
} from '../../../../../modules/admin'

import '../admin.css'

const confirm = Modal.confirm

class ValidationListActions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      alcool: true,
      bedroom: false
    }
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

  validatePayment = id => {
    this.props.validatePayment(id, this.state.alcool, this.state.bedroom)
    this.setState({ modal: false })
  }

  render() {
    const { users, userId } = this.props
    const user = users.find(u => u.id === userId)
    return (
      <React.Fragment>
        <Modal
          title={`Valider le paiement de ${user.lastName} ${user.firstName} ${
            user.nickName ? '(' + user.nickName + ') ' : ''
          }?`}
          visible={this.state.modal}
          onOk={() => this.validatePayment(userId)}
          onCancel={() => this.setState({ modal: false })}
          cancelText='Annuler'
          okText='Ok'
        >
          <Radio.Group
            onChange={e =>
              this.setState({ alcool: e.target.value === 'alcool' })
            }
            defaultValue='alcool'
          >
            <Radio value='alcool'>Bacchus</Radio>
            <Radio value='troue'>Bacchus Troué</Radio>
          </Radio.Group>
          <Divider />
          <Radio.Group
            onChange={e =>
              this.setState({ bedroom: e.target.value === 'bedroom' })
            }
            defaultValue='tente'
          >
            <Radio value='tente'>Tente</Radio>
            <Radio value='bedroom'>Chambre</Radio>
          </Radio.Group>
        </Modal>
        {!user.paid && user.town && (
          <Tooltip placement='top' title='Valider le paiement'>
            <a
              onClick={() => this.setState({ modal: true })}
              style={{ fontSize: '18px' }}
            >
              <Icon type='euro' />
            </a>
          </Tooltip>
        )}
        {!user.paid && !user.town && (
          <Tooltip placement='top' title="La personne n'a pas remplit sa fiche">
            <Icon type='euro' style={{ fontSize: '18px', color: 'gray' }} />
          </Tooltip>
        )}
        {user.paid && (
          <Tooltip placement='top' title='Annuler le Paiement'>
            <a
              onClick={() =>
                this.showConfirm(
                  'Voulez-vous vraiment annuler le paiement ?',
                  'Fait pas le con Phillipe',
                  () => this.props.unvalidatePayment(userId)
                )
              }
              style={{ fontSize: '18px', color: 'red' }}
            >
              <Icon type='euro' />
            </a>
          </Tooltip>
        )}
        {user.caution && (
          <Tooltip placement='top' title='Annuler la caution'>
            <a
              onClick={() =>
                this.showConfirm(
                  'Voulez-vous vraiment annuler la caution ?',
                  "N'utiliser qu'en cas d'erreur",
                  () => this.props.unvalidateCaution(userId)
                )
              }
              style={{ fontSize: '18px', color: 'red', marginLeft: '2px' }}
            >
              <Icon type='bank' />
            </a>
          </Tooltip>
        )}
        {!user.caution && (
          <Tooltip placement='top' title='Valider la caution'>
            <a
              onClick={() =>
                this.showConfirm(
                  'Voulez-vous vraiment valider la caution ?',
                  'Ne valider que si vous avez reçu le chèque de caution',
                  () => this.props.validateCaution(userId)
                )
              }
              style={{ fontSize: '18px', marginLeft: '2px' }}
            >
              <Icon type='bank' />
            </a>
          </Tooltip>
        )}
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  validatePayment: (id, alcool, bedroom) =>
    dispatch(validatePayment(id, alcool, bedroom)),
  unvalidatePayment: id => dispatch(unvalidatePayment(id)),
  validateCaution: id => dispatch(validateCaution(id)),
  unvalidateCaution: id => dispatch(unvalidateCaution(id))
})

export default connect(
  null,
  mapDispatchToProps
)(ValidationListActions)
