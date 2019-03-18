import React from 'react'
import { Table, Spin } from 'antd'
import { fetchUser } from '../../../../modules/user'
import { connect } from 'react-redux'

class Caution extends React.Component {
  constructor(props) {
    super(props)
    props.fetchUser()
  }
  render() {
    const { user } = this.props
    if (!user) {
      return <Spin />
    }

    return (
      <React.Fragment>
        <h1>Caution</h1>
        <p>Un chèque de caution est nécéssaire pour venir au WET.</p>
        {user.caution ? (
          <p>
            <strong style={{ color: 'green' }}>
              Nous avons bien reçu ton chèque, tout est en ordre !
            </strong>
          </p>
        ) : (
          <div>
            <p>
              <strong style={{ color: 'red' }}>
                Nous n'avons pas encore reçu ton chèque.
              </strong>
            </p>
            <p>Merci d'envoyer un chèque de 133€ à :</p>
            <p>
              Capucine Jager-Bah
              <br />
              7 rue Colbert
              <br />
              10000 Troyes
              <br />
              (Chèque à l'ordre de "La Flute")
            </p>
          </div>
        )}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.user
})

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(fetchUser())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Caution)
