import React from 'react'
import { connect } from 'react-redux'
import { List, Avatar } from 'antd'
import { fetchTopTargets, fetchTargetUsers } from '../../../../modules/target'
class TopTarget extends React.Component {
  constructor(props) {
    super(props)
    this.props.fetchTopTargets()
    this.props.fetchTargetUsers()
  }
  render() {
    let { mostTargeted, users } = this.props
    let loading = false
    if (!mostTargeted || !users) loading = true
    if (mostTargeted)
      mostTargeted = mostTargeted.map(target => {
        let user = users.find(u => u.id === target.id)
        return { ...target, ...user }
      })

    return (
      <React.Fragment>
        <h1 style={{ textAlign: 'center' }}>Top Target</h1>
        <List
          loading={loading}
          itemLayout='horizontal'
          dataSource={mostTargeted}
          locale={{ emptyText: 'Aucune target pour le moment' }}
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
              />
              {item.number > 1 && <div>{item.number} personnes veulent le plier</div>}
              {item.number === 1 && <div>{item.number} personne veut le plier</div>}
            </List.Item>
          )}
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  mostTargeted: state.target.mostTargeted,
  users: state.target.users
})

const mapDispatchToProps = dispatch => ({
  fetchTopTargets: () => dispatch(fetchTopTargets()),
  fetchTargetUsers: () => dispatch(fetchTargetUsers())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopTarget)
