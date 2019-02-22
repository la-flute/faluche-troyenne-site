import React from 'react'
import { connect } from 'react-redux'
import { Divider, Card, Spin } from 'antd'
import moment from 'moment';
import { fetchMatches } from '../../../modules/matches'
import { fetchUser } from '../../../modules/user'

class Accueil extends React.Component {

  
  constructor(props) {
    super(props)

    this.state = {
      matches: []
    }

    props.fetchUser()
  }
  
  componentDidMount() {
    this.fetchMatches()
  }

  componentDidUpdate(prevProps) { 
    if (prevProps.user !== this.props.user) {
      this.fetchMatches()
    }
  }

  render() {
    const { user } = this.props

    if(!user) {
      return <Spin />
    }

    // Get user fullname, role and place
    user.fullname = `${user.name} (${user.firstname} ${user.lastname})`
    user.role = null
    if(user.permission) {
      if(user.permission.admin) {
        user.role = 'Admin'
      }
      else if(user.permission.respo) {
        user.role = 'Respo'
      }
      else if(user.permission.permission) {
        user.role = 'Orga'
      }
    }
    user.place = null
    if(user.tableLetter && user.placeNumber) {
      user.place = `${user.tableLetter}${user.placeNumber}`
    }

    return (
      <div style={{ height: '100%'}}>
        <h1>Accueil</h1>

        <Card
          title="Vos informations"
          style={{ marginBottom: '20px' }}
        >
          <div>Nom d'utilisateur : <strong>{user.fullname}</strong></div>
          {user.role ? <div>Rôle : <strong>{user.role}</strong></div> : ''}
          <div>A payé : <strong>{user.paid ? 'Oui' : 'Non'}</strong></div>
          <div>Place : <strong>{user.place ? user.place : 'Aucune'}{user.plusone ? ' (Visiteur)' : ''}</strong></div>
          {user.team && user.team.spotlight ? <div>Tournoi : <strong>{user.team.spotlight.name}</strong></div> : ''}
          {user.team && !user.team.soloTeam ? <div>Équipe : <strong>{user.team.name}</strong></div> : ''}
        </Card>

        <Divider />

        <h2>Mes matchs</h2>

        <div style={{ display: 'flex', flexWrap: 'wrap' }}>

        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  matches: state.matches.matches,
  user: state.user.user,
})

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(fetchUser()),
  fetchMatches: (spotlightID, participantID) => dispatch(fetchMatches(spotlightID, participantID)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Accueil)
