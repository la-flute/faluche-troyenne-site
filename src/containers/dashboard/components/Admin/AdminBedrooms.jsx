import React from 'react'
import { Table, Spin, Divider, Button } from 'antd'
import { connect } from 'react-redux'

import AdminBar from './AdminBar'
import BedroomsListActions from './components/BedroomsListActions'
import CreateBedroomModal from './components/CreateBedroomModal'
import { fetchBedrooms, addBedroom } from '../../../../modules/bedrooms'

class AdminBedrooms extends React.Component {
  constructor(props) {
    super(props)
    this.state = { modal: false }
    this.props.fetchBedrooms()
  }

  openModal = () => {
    this.setState({ modal: true })
  }

  closeModal = () => {
    this.setState({ modal: false })
  }

  createBedroom = () => {
    const form = this.formRef.props.form
    form.validateFields((err, values) => {
      if (err) {
        return
      }

      this.props.addBedroom(values)
      form.resetFields()
      this.setState({ modal: false })
    })
  }

  saveFormRef = formRef => {
    this.formRef = formRef
  }
  render() {
    let { bedrooms } = this.props
    if (!bedrooms) return <Spin />
    let columns = [
      {
        title: 'Numéro',
        dataIndex: 'number'
      },
      {
        title: 'Étage',
        dataIndex: 'floor'
      },
      {
        title: 'Occupation',
        dataIndex: 'state'
      },
      {
        title: 'Actions',
        dataIndex: 'id',
        render: id => (
          <BedroomsListActions bedroomId={id} bedrooms={this.props.bedrooms} />
        )
      }
    ]
    const rows = bedrooms.map(bedroom => {
      return {
        id: bedroom.id,
        number: bedroom.number,
        floor: bedroom.floor,
        state: `${bedroom.users.length}/${bedroom.places}`
      }
    }).sort((a, b) => {
      if(a.number > b.number) return 1
      if(a.number < b.number) return -1
      return 0
    })
    return (
      <React.Fragment>
        <AdminBar title={`Gestion des chambres`}/>
        <Divider />
        <h1>Chambres</h1>
        <Button type='primary' onClick={this.openModal}>
          Ajouter une chambre
        </Button>

        <CreateBedroomModal
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.modal}
          onCancel={this.closeModal}
          onCreate={this.createBedroom}
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
  bedrooms: state.bedrooms.bedrooms
})

const mapDispatchToProps = dispatch => ({
  fetchBedrooms: () => dispatch(fetchBedrooms()),
  addBedroom: (data) => dispatch(addBedroom(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminBedrooms)
