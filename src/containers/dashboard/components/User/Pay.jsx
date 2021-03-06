import React from 'react'
import { connect } from 'react-redux'
import { Divider, Spin, Button, Checkbox } from 'antd'
import { actions as notifActions } from 'redux-notifications'
import { Link } from 'react-router-dom'
import { fetchPrice } from '../../../../modules/prices'
import { sendBasket } from '../../../../modules/payment'
import ListItem from './components/list-item'

class Pay extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      alcool: true,
      bedroom: false,
      accepted: false
    }
    this.props.fetchPrice()
  }

  selectAlcool = () => {
    this.setState({ alcool: true })
  }
  selectNotAlcool = () => {
    this.setState({ alcool: false })
  }
  toggleBedroom = () => {
    this.setState({ bedroom: !this.state.bedroom })
  }
  payment = () => {
    if (!this.state.accepted) {
      this.props.sendError()
      return
    }
    const basket = {
      alcool: this.state.alcool,
      bedroom: this.state.bedroom
    }
    this.props.sendBasket(basket)
  }

  render() {
    const { price, bacchusTroue, bedroomPrice, user } = this.props
    if (!user.town)
      return (
        <React.Fragment>
          <h1>Profil incomplet !</h1>
          <p>
            Vous devez remplir{' '}
            <Link to={{ pathname: `/dashboard/user/infos` }}>la fiche</Link>{' '}
            pour pouvoir accéder au paiement.
          </p>
        </React.Fragment>
      )
    if (!user.attestation)
      return (
        <React.Fragment>
          <h1>Attestation non validée !</h1>
          <p>
            Vous devez valider{' '}
            <Link to={{ pathname: `/dashboard/user/attestation` }}>
              l'attestation sur l'honneur
            </Link>{' '}
            pour pouvoir accéder au paiement.
          </p>
        </React.Fragment>
      )
    if (!price) {
      this.props.fetchPrice()
      return <Spin />
    }
    const total =
      0 +
      (this.state.alcool ? price.value : price.value - bacchusTroue) +
      (this.state.bedroom ? bedroomPrice : 0)
    return (
      <React.Fragment>
        <form className='a-dashboard-page a-dashboard-payment'>
          <h1>Paiement</h1>
          <p>
            C'est le moment de racker ! Nous vous offrons la possibilité de
            payer en ligne via la plateforme etupay. Le paiement est sécurisé.
          </p>
          <p>
            <strong>
              Il est aussi possible de payer par chèque à l'adresse suivante :
            </strong>
          </p>
          <p>
            Capucine Jager-Bah
            <br />
            7 rue Colbert
            <br />
            10000 Troyes
            <br />
            (Chèque à l'ordre de "La Flute")
            <br />
            Si vous choisissez le paiement par chèque, vous n'avez rien à faire,
            à part envoyer le chèque. Le paiement sera validé sur ce site à la
            réception du chèque
          </p>
          <Divider />
          <ListItem
            price={price.value}
            active={this.state.alcool}
            onClick={this.selectAlcool}
          >
            <h3>Weekend Complet Bacchus</h3>
            <span>Inclus les repas, l'alcool et la bonne ambiance</span>
          </ListItem>
          <ListItem
            price={price.value - bacchusTroue}
            active={!this.state.alcool}
            onClick={this.selectNotAlcool}
          >
            <h3>Weekend Complet Bacchus Troué</h3>
            <span>Inclus les repas, le soft et la bonne ambiance</span>
          </ListItem>
          <Divider />
          <ListItem
            price={`+${bedroomPrice}`}
            active={this.state.bedroom}
            onClick={this.toggleBedroom}
          >
            <h3>Chambre</h3>
            <span>Place en dur dans une chambre, pour les plus fragiles</span>
          </ListItem>
          <Divider />
          <Checkbox
            onChange={e => this.setState({ accepted: e.target.checked })}
          >
            Accepter les
          </Checkbox>
          <Link to={{ pathname: `/dashboard/conditions` }}>
            conditions générales de vente
          </Link>
          <Divider />

          <div style={{ display: 'flex' }}>
            <Button
              type='primary'
              style={{ margin: 'auto', fontSize: '18px' }}
              onClick={this.payment}
            >{`Payer ${total}€`}</Button>
          </div>
        </form>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
  price: state.prices.price,
  bacchusTroue: state.prices.bacchusTroue,
  bedroomPrice: state.prices.bedroomPrice
})

const mapDispatchToProps = dispatch => ({
  fetchPrice: () => dispatch(fetchPrice()),
  sendBasket: basket => dispatch(sendBasket(basket)),
  sendError: () =>
    dispatch(
      notifActions.notifSend({
        message: 'Vous devez accepter les conditions générales de vente !',
        kind: 'danger',
        dismissAfter: 2000
      })
    )
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pay)
