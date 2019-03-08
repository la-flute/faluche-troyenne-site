import React from 'react'
import { Table, Spin, Divider, Button } from 'antd'
import { connect } from 'react-redux'

import AdminBar from './AdminBar'
import TeamsListActions from './components/TeamsListActions'
import CreateTeamModal from './components/CreateTeamModal'
import { fetchTeams, addTeam } from '../../../../modules/teams'

class AdminTeams extends React.Component {
  constructor(props) {
    super(props)
    this.state = { modal: false }
    this.props.fetchTeams()
  }

  openModal = () => {
    this.setState({ modal: true })
  }

  closeModal = () => {
    this.setState({ modal: false })
  }

  createTeam = () => {
    const form = this.formRef.props.form
    form.validateFields((err, values) => {
      if (err) {
        return
      }

      this.props.addTeam(values)
      form.resetFields()
      this.setState({ modal: false })
    })
  }

  saveFormRef = formRef => {
    this.formRef = formRef
  }
  render() {
    let { teams } = this.props
    if (!teams) return <Spin />
    let columns = [
      {
        title: 'Nom',
        dataIndex: 'name'
      },
      {
        title: 'Utilisateurs',
        dataIndex: 'numberUsers'
      },
      {
        title: 'Actions',
        dataIndex: 'id',
        render: id => (
          <TeamsListActions teamId={id} teams={this.props.teams} />
        )
      }
    ]
    const rows = teams.map(team => {
      return {
        id: team.id,
        name: team.name,
        numberUsers: team.users.length
      }
    }).sort((a, b) => {
      if(a.name > b.name) return 1
      if(a.name < b.name) return -1
      return 0
    })
    return (
      <React.Fragment>
        <AdminBar title={`Gestion des équipes`}/>
        <Divider />
        <h1>Équipes</h1>
        <Button type='primary' onClick={this.openModal}>
          Ajouter une équipe
        </Button>

        <CreateTeamModal
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.modal}
          onCancel={this.closeModal}
          onCreate={this.createTeam}
        />

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
  teams: state.teams.teams
})

const mapDispatchToProps = dispatch => ({
  fetchTeams: () => dispatch(fetchTeams()),
  addTeam: (data) => dispatch(addTeam(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminTeams)
