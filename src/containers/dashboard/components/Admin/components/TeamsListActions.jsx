import React from 'react'
import { Icon, Tooltip, Modal } from 'antd'
import { connect } from 'react-redux'
import { removeTeam } from '../../../../../modules/teams'

import '../admin.css'

class TeamsListActions extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      removeTeamModalVisible: false
    }
  }

  removeTeam = () => {
    this.props.removeTeam(this.props.teamId)
    this.setState({
      removeTeamModalVisible: false
    })
  }

  openRemoveTeamModal = () => {
    this.setState({
      removeTeamModalVisible: true
    })
  }

  closeRemoveTeamModal = () => {
    this.setState({
      removeTeamModalVisible: false
    })
  }

  render() {
    const { teams, teamId } = this.props
    const team = teams.find(b => b.id === teamId)

    if (!team) {
      return null
    }

    return (
      <React.Fragment>
        <Tooltip placement='top' title="Supprimer l'équipe">
          <a onClick={this.openRemoveTeamModal} style={{ fontSize: '18px' }}>
            <Icon type='cross' />
          </a>
        </Tooltip>
        <Modal
          title='Êtes vous sûr ?'
          visible={this.state.removeTeamModalVisible}
          onOk={this.removeTeam}
          onCancel={this.closeRemoveTeamModal}
          cancelText='Annuler'
          okText='Ok'
        >
          <h3>Supprimer l'équipe</h3>
          <p>
            <strong>
              Voulez-vous supprimer l'équipe
              {`${team.name}`} ?
            </strong>
          </p>
        </Modal>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  removeTeam: id => dispatch(removeTeam(id))
})

export default connect(
  null,
  mapDispatchToProps
)(TeamsListActions)
