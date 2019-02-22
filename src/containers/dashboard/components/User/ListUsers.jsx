import React from 'react'
import { connect } from 'react-redux'
import { Spin } from 'antd'
import { listUsers } from '../../../../modules/user'
import notPrepared from '../../assets/notprepared.jpg'

import { Table, Divider, Tag } from 'antd'

//DEFINE COLUMS
const columns = [
  {
    title: 'Matricule',
    dataIndex: 'name'
  },
  {
    title: 'Ville',
    dataIndex: 'town'
  }
]

class ListUsers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      matches: []
    }

    this.props.listUsers()
  }

  render() {
    const { users } = this.props
    if (!users) {
      return <Spin />
    }

    return (
      <div style={{ height: '100%' }}>
        <h1>Liste des inscrits</h1>
        <Table
          columns={columns}
          dataSource={users}
          rowKey="id"
          locale={{ emptyText: 'Aucun utilisateur' }}
          style={{ marginTop: '20px' }}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  users: state.user.users
})

const mapDispatchToProps = dispatch => ({
  listUsers: () => dispatch(listUsers())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListUsers)
