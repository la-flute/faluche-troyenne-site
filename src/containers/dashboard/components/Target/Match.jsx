import React from 'react'
import { connect } from 'react-redux'
import { List, Avatar, Divider } from 'antd'
import { fetchMatchs, fetchTargetUsers } from '../../../../modules/target'
class Match extends React.Component {
  constructor(props) {
    super(props)
    this.props.fetchMatchs()
    this.props.fetchTargetUsers()
  }
  render() {
    let { matchs, users } = this.props
    let loading = false
    console.log(matchs, users)
    if (!matchs || !users) loading = true
    matchs = matchs.map(match => {
      let user = users.find(u => u.id === match)
      return { ...user }
    })
    console.log(matchs)
    return (
      <React.Fragment>
        <h1 style={{ textAlign: 'center' }}>
          Ces personnes veulent votre mort
        </h1>
        <Divider/>
        <List
          loading={loading}
          itemLayout='horizontal'
          dataSource={matchs}
          locale={{ emptyText: 'Personne ne veut votre mort pour le moment' }}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  item.image && (
                    <Avatar
                      src={`${process.env.REACT_APP_API}/tinders/${
                        item.id
                      }/image`}
                    />
                  )
                }
                title={item.firstName}
                description={item.town}
              />
            </List.Item>
          )}
        />
        <Divider/>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  matchs: state.target.matchs,
  users: state.target.users
})

const mapDispatchToProps = dispatch => ({
  fetchMatchs: () => dispatch(fetchMatchs()),
  fetchTargetUsers: () => dispatch(fetchTargetUsers())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Match)
