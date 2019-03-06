import React from 'react'
import { connect } from 'react-redux'
import { Spin } from 'antd'
import { fetchUsers } from '../../../../modules/user'

import { Table, Input, Icon } from 'antd'

//DEFINE COLUMS
const columns = [
  {
    title: 'Nom',
    dataIndex: 'lastName',
    sorter: (a, b) => {
      if (a.lastName < b.lastName) return 1
      if (a.lastName > b.lastName) return -1
      return 0
    }
  },
  {
    title: 'Prénom',
    dataIndex: 'firstName',
    sorter: (a, b) => {
      if (a.firstName < b.firstName) return 1
      if (a.firstName > b.firstName) return -1
      return 0
    }
  },
  {
    title: 'Surnom',
    dataIndex: 'nickName',
    sorter: (a, b) => {
      if (a.nickName < b.nickName) return 1
      if (a.nickName > b.nickName) return -1
      return 0
    }
  },
  {
    title: 'Filière',
    dataIndex: 'studies',
    sorter: (a, b) => {
      if (a.studies < b.studies) return 1
      if (a.studies > b.studies) return -1
      return 0
    }
  },
  {
    title: 'Ville',
    dataIndex: 'town',
    sorter: (a, b) => {
      if (a.town < b.town) return 1
      if (a.town > b.town) return -1
      return 0
    }
  },
  {
    title: 'Folklore',
    dataIndex: 'folklore',
    sorter: (a, b) => {
      if (a.folklore < b.folklore) return 1
      if (a.folklore > b.folklore) return -1
      return 0
    }
  }
]

class ListUsers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      matches: [],
      search: ''
    }
    this.props.fetchUsers()
  }

  search = e => this.setState({ search: e.target.value })

  render() {
    let { users } = this.props
    if (!users) {
      return <Spin />
    }
    users = users.filter(user => {
      const fullUser = `${user.lastName} ${user.firstName} ${user.nickName} ${user.studies} ${user.town}`
      return (
        fullUser.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
      )
    })
    return (
      <div style={{ height: '100%' }}>
        <h1>Liste des inscrits</h1>
        <Input
          addonBefore={<Icon type='search' />}
          onChange={this.search}
          placeholder='Rechercher un utilisateur par Prénom, Surnom, Fillière ou Ville'
        />
        <Table
          columns={columns}
          dataSource={users}
          rowKey='id'
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
  fetchUsers: () => dispatch(fetchUsers())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListUsers)
