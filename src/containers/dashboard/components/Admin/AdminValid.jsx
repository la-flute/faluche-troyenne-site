import React from 'react'
import { Icon, Table, Spin, Checkbox, Card } from 'antd'
import { connect } from 'react-redux'

import AdminBar from './AdminBar'
import ValidationListActions from './components/ValidationListActions'
import { fetchUsers } from '../../../../modules/admin'

class AdminValid extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showPaid: true,
      showFiche: true
    }

    this.props.fetchUsers()
  }

  render() {
    let { users } = this.props

    if (!users) {
      return <Spin />
    }

    // Apply filters
    let rows = users
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
        title: 'Filière',
        dataIndex: 'studies'
      },
      {
        title: 'Ville',
        dataIndex: 'town'
      }
    ]

    if (this.state.showPaid) {
      columns.push({
        title: 'A payé',
        dataIndex: 'paid',
        render: paid => {
          return paid ? (
            <Icon type='check' style={{ color: 'green' }} />
          ) : (
            <Icon type='close' style={{ color: 'red' }} />
          )
        }
      })
    }
    if (this.state.showFiche) {
      columns.push({
        title: 'Fiche',
        dataIndex: 'trajet',
        render: trajet => {
          return trajet ? (
            <Icon type='check' style={{ color: 'green' }} />
          ) : (
            <Icon type='close' style={{ color: 'red' }} />
          )
        }
      })
    }
    columns.push({
      title: 'Actions',
      dataIndex: 'id',
      render: id => <ValidationListActions userId={id} users={users} />
    })
    return (
      <React.Fragment>
        <AdminBar />

        <Card title='Affichage' style={{ marginTop: '20px' }}>
          <Checkbox
            checked={this.state.showPaid}
            onChange={() => this.setState({ showPaid: !this.state.showPaid })}
          >
            A payé
          </Checkbox>
          <Checkbox
            checked={this.state.showFiche}
            onChange={() => this.setState({ showFiche: !this.state.showFiche })}
          >
            Fiche
          </Checkbox>
        </Card>
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
  fetchUsers: () => dispatch(fetchUsers())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminValid)
