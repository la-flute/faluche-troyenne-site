import React from 'react'

import { connect } from 'react-redux'
import { fetchUsersRoles } from '../../../../modules/admin'

import { Spin, Table } from 'antd'
import AdminBar from './AdminBar'
import UserListActions from './components/UserListActions'

class AdminRoles extends React.Component {
  constructor(props) {
    super(props)

    this.props.fetchUsersRoles()
  }

  render() {
    let { users } = this.props
    if (!users) {
      return <Spin />
    }

    // Apply column filters
    let columns = [
      {
        title: 'Nom',
        dataIndex: 'lastName'
      },
      {
        title: 'Prénom',
        dataIndex: 'firstName'
      },
      {
        title: 'Ville',
        dataIndex: 'town'
      },
      {
        title: 'Role',
        dataIndex: 'role'
      },
      {
        title: 'Actions',
        dataIndex: 'id',
        render: id => <UserListActions userId={id} users={this.props.users} />
      }
    ]

    //Get users froles
    users = users.map(user => {
      let role = ''
      if (user.permission && user.permission.admin) {
        role += 'Admin'
      }
      if (user.permission && user.permission.treso) {
        role += ` Tréso`
      }
      if (user.permission && user.permission.bureau) {
        role += ` Bureau`
      }
      if (user.permission && user.permission.write) {
        role += ' Rédacteur'
      }

      return {
        ...user,
        role
      }
    })
    if (!users) {
      return <Spin />
    }
    let rows = users
    return (
      <React.Fragment>
        <AdminBar title={`Gestion des droits`}/>

        <Table
          columns={columns}
          dataSource={rows}
          rowKey='id'
          locale={{ emptyText: 'Aucun utilisateur' }}
          style={{ marginTop: '20px' }}
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  users: state.admin.users
})

const mapDispatchToProps = dispatch => ({
  fetchUsersRoles: () => dispatch(fetchUsersRoles())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminRoles)
