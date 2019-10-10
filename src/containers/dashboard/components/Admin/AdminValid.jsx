import React from 'react'
import { Icon, Table, Spin, Checkbox, Card, Input } from 'antd'
import { connect } from 'react-redux'

import AdminBar from './AdminBar'
import ValidationListActions from './components/ValidationListActions'
import ValidUser from './components/ValidUser'
import { fetchUsers } from '../../../../modules/admin'

class AdminValid extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showPaid: true,
      showFiche: true,
      showAttestation: true,
      showStudies: true,
      showTown: true,
      search: ''
    }

    this.props.fetchUsers()
  }

  render() {
    let { users } = this.props
    const {showPaid, showFiche, showAttestation, showStudies, showTown, search} = this.state

    if (!users) {
      return <Spin />
    }
    users = users.filter(user => {
      let fulltext = user.firstName + ' ' + user.lastName
      if (user.town) fulltext += ' ' + user.town
      if (user.nickName) fulltext += ' ' + user.nickName
      if (user.studies) fulltext += ' ' + user.studies
      return (
        fulltext.toLowerCase().indexOf(search.toLowerCase()) !== -1
      )
    })
    // Apply filters
    let rows = users.map(user => {
      return { ...user, id2: user.id }
    })
    // Apply column filters
    let columns = [
      {
        title: 'Nom',
        dataIndex: 'lastName'
      },
      {
        title: 'Prénom',
        dataIndex: 'firstName'
      }
    ]
    if (showStudies) {
      columns.push({
        title: 'Filière',
        dataIndex: 'studies'
      })
    }
    if (showTown) {
      columns.push({
        title: 'Ville',
        dataIndex: 'town'
      })
    }

    if (showPaid) {
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
    if (showFiche) {
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
    if (showAttestation) {
      columns.push({
        title: 'Attestation',
        dataIndex: 'attestation',
        render: attestation => {
          return attestation ? (
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
    columns.push({
      title: 'Valider le dossier',
      dataIndex: 'id2',
      render: id => <ValidUser userId={id} users={users} />
    })
    return (
      <React.Fragment>
        <AdminBar title={`Validation des inscriptions`} />

        <Card title='Affichage' style={{ marginTop: '20px' }}>
          <Checkbox
            checked={showStudies}
            onChange={() => this.setState({ showStudies: !showStudies })}
          >
            Fillière
          </Checkbox>
          <Checkbox
            checked={showTown}
            onChange={() => this.setState({ showTown: !showTown })}
          >
            Ville
          </Checkbox>
          <Checkbox
            checked={showPaid}
            onChange={() => this.setState({ showPaid: !showPaid })}
          >
            A payé
          </Checkbox>
          <Checkbox
            checked={showFiche}
            onChange={() => this.setState({ showFiche: !showFiche })}
          >
            Fiche
          </Checkbox>
          <Checkbox
            checked={showAttestation}
            onChange={() =>
              this.setState({
                showAttestation: !showAttestation
              })
            }
          >
            Attestation
          </Checkbox>
          <Input
            value={search}
            onChange={e => this.setState({ search: e.target.value })}
            placeholder='Rechercher un utilisateur par nom, prénom, surnom, fillière ou ville'
          />
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
