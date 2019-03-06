import React from 'react'
import { Button, Spin } from 'antd'
import { fetchUser, sendAttestation } from '../../../../modules/user'
import AttestationModal from './AttestationModal'
import { actions as notifActions } from 'redux-notifications'
import { connect } from 'react-redux'
class Edit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      updated: false
    }
  }
  openModal = () => this.setState({ visible: true })
  closeModal = () => this.setState({ visible: false })

  validateValue = () => {
    const form = this.formRef.props.form
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      if (values.nbr !== 5) this.props.errorNotif(Math.abs(values.nbr - 5))
      else this.props.sendAttestation()
      form.resetFields()
      this.setState({ visible: false })
    })
  }

  saveFormRef = formRef => {
    this.formRef = formRef
  }
  render() {
    const { user } = this.props
    if (!user) {
      this.props.fetchUser()
      return <Spin />
    }
    return (
      <React.Fragment>
        <AttestationModal
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.closeModal}
          onValidate={this.validateValue}
        />
        <h1>Attestation sur l'honneur</h1>
        <p>
          Je soussigné{' '}
          <strong>
            {user.firstName} {user.lastName}
          </strong>
          , certifie sur l'honneur participer au Weekend Troyen qui se déroulera
          à l'Auberge de jeunesse de Rosières-près-Troyes du 3 au 5 mai 2019,
          pour me prendre ma plus grosse pétée de l'année en respectant
          l'intégralité des personnes présentes : congressistes, organisateurs,
          personnels présents; ainsi que les locaux et différents agencements
          mis à ma disposition.
        </p>
        <p>
          De plus je déclare sur l'honneur respecter les biens publics et privés
          et adorer <strong>Mon grand seigneur La Poutre</strong>. Je m'engage
          également à rendre les locaux qui seront sous ma responsabilités
          (chambre et douche) dans un état de propreté et d'intégrité identique
          à celui dans lequel ils m'ont été confiés.
        </p>
        <p>
          Je suis informé(e) que la responsabilité de <strong>La Flute </strong>
          ne pourra être engagée en cas de vol par le participant ou à
          l'encontre des affaires personnelles de celui-ci.
        </p>
        <p>
          Je suis informé(e) que La Flute se réserve le droit de faire appliquer
          l'encaissement du dépôt de garantie de 133€ à titre de caution pour
          les dégâts causés au matériel et à la mise en application éventuelle
          de mon assurance de responsabilité civile.
        </p>
        <p>
          Je suis informé(e) du fait qu'en cas de comportement anormal ou de
          tout acte volontaire d'agression ou de dégradation, je m'expose à des
          poursuites judiciaires. Je suis informé(e) qu'en cas de possession de
          drogues sur les lieux de l'événement, je m'expose à une expulsion
          immédiate et à des poursuites judiciaires. La Flute sera
          intransigeante sur ce sujet.
        </p>
        <p>Lu et approuvé</p>
        <p>
          <strong>
            {user.firstName} {user.lastName}
          </strong>
        </p>
        {!user.attestation ? (
          <div style={{ display: 'flex' }}>
            <Button
              type='primary'
              style={{ margin: 'auto', fontSize: '18px' }}
              onClick={this.openModal}
            >
              Envoyer l'attestation
            </Button>
          </div>
        ) : (
          <h2 style={{ color: 'green' }}>Attestation validée !</h2>
        )}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.user
})

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(fetchUser()),
  errorNotif: nbr =>
    dispatch(
      notifActions.notifSend({
        message: `Raté, ça fait ${nbr} secs en plus`,
        kind: 'danger',
        dismissAfter: 2000
      })
    ),
  sendAttestation: () => dispatch(sendAttestation())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Edit)
