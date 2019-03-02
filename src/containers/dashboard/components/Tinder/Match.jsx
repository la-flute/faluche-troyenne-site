import React from 'react'
import { connect } from 'react-redux'
import { List, Avatar, Icon, Tooltip } from 'antd'
import { fetchMatchs, fetchTinderUsers } from '../../../../modules/tinder'
class Match extends React.Component {
  constructor(props) {
    super(props)
    this.props.fetchMatchs()
    this.props.fetchTinderUsers()
  }
  render() {
    let { matchs, users } = this.props
    let loading = false
    if (!matchs || !users) loading = true
    matchs = matchs.map(match => {
      let user = users.find(u => u.id === match.id)
      return { ...match, ...user }
    })
    return (
      <React.Fragment>
        <h1 style={{ textAlign: 'center' }}>Mes matchs</h1>
        <List
          loading={loading}
          itemLayout='horizontal'
          dataSource={matchs}
          locale={{ emptyText: 'Aucun match pour le moment' }}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={`${process.env.REACT_APP_API}/tinders/${
                      item.id
                    }/image`}
                  />
                }
                title={item.firstName}
                description={item.catchphrase}
              />
              <div>
                {item.turboliked && (
                  <Tooltip
                    placement='left'
                    title='Vous avez turboliké cette personne '
                  >
                    <Icon type='star' style={{ color: 'blue' }} />
                  </Tooltip>
                )}
                {item.turbolikedBy && (
                  <Tooltip
                    placement='left'
                    title='Vous avez été turboliké par cette personne '
                  >
                    <Icon type='star' style={{ color: 'yellow' }} />
                  </Tooltip>
                )}
              </div>
            </List.Item>
          )}
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  matchs: state.tinder.matchs,
  users: state.tinder.users
})

const mapDispatchToProps = dispatch => ({
  fetchMatchs: () => dispatch(fetchMatchs()),
  fetchTinderUsers: () => dispatch(fetchTinderUsers())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Match)
