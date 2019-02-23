import React from 'react'
import { List, Button, Collapse, Spin, Divider } from 'antd'
import { connect } from 'react-redux'
import { fetchTeams, joinTeam, leaveTeam } from '../../../../modules/teams'

const Panel = Collapse.Panel

class Teams extends React.Component {
  render() {
    let { teams, user } = this.props
    if (!teams || !user) {
      this.props.fetchTeams()
      return <Spin />
    }
    return (
      <div>
        <h1>Liste des équipes</h1>
        {teams.length > 0 ? (
          <Collapse>
            {teams.map(team => (
              <Panel header={team.name} key={team.id}>
                {!user.teamId && (
                  <Button
                    type='primary'
                    onClick={() => this.props.joinTeam(team.id)}
                  >
                    Rejoindre cette équipe
                  </Button>
                )}
                {!user.teamId && <Divider />}
                {user.teamId && team.id === user.teamId && (
                  <Button
                    type='danger'
                    onClick={() => this.props.leaveTeam(team.id)}
                  >
                    Quitter cette Équipe
                  </Button>
                )}
                {user.teamId && team.id === user.teamId && <Divider />}
                <List
                  itemLayout='horizontal'
                  dataSource={team.users}
                  locale={{ emptyText: 'Cette équipe est vide' }}
                  renderItem={user => (
                    <span>{`${user.lastName}. ${user.firstName} ${
                      user.nickName ? user.nickName : ''
                    }`}</span>
                  )}
                />
              </Panel>
            ))}
          </Collapse>
        ) : (
          <Spin />
        )}
      </div>
    )
  }
}
const mapStateToProps = state => ({
  teams: state.teams.teams,
  user: state.user.user
})

const mapDispatchToProps = dispatch => ({
  fetchTeams: () => dispatch(fetchTeams()),
  joinTeam: id => dispatch(joinTeam(id)),
  leaveTeam: id => dispatch(leaveTeam(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Teams)
