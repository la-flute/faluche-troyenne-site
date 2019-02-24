import React from 'react'
import { Table, Spin, Divider, Button, Icon } from 'antd'
import { connect } from 'react-redux'
import moment from 'moment'

import AdminBar from './AdminBar'
import PricesListActions from './components/PricesListActions'
import CreatePriceModal from './components/CreatePriceModal'
import { fetchPrices, addPrice } from '../../../../modules/prices'

class AdminPrices extends React.Component {
  constructor(props) {
    super(props)
    this.state = { modal: false }
    this.props.fetchPrices()
  }

  openModal = () => {
    this.setState({ modal: true })
  }

  closeModal = () => {
    this.setState({ modal: false })
  }

  createPrice = () => {
    const form = this.formRef.props.form
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      console.log(values)
      const price = {
        ...values,
        start: values.date[0].format(),
        end: values.date[1].format()
      }
      this.props.addPrice(price)
      form.resetFields()
      this.setState({ modal: false })
    })
  }

  saveFormRef = formRef => {
    this.formRef = formRef
  }
  render() {
    let { prices } = this.props
    if (!prices) return <Spin />
    let columns = [
      {
        title: 'Nom',
        dataIndex: 'name'
      },
      {
        title: 'Prix',
        dataIndex: 'value',
        render: b => `${b}€`
      },
      {
        title: 'Début',
        dataIndex: 'start',
        render: id => moment(id).format('DD/MM/YYYY - HH:mm:ss')
      },
      {
        title: 'Fin',
        dataIndex: 'end',
        render: id => moment(id).format('DD/MM/YYYY - HH:mm:ss')
      },
      {
        title: 'Actions',
        dataIndex: 'id',
        render: id => (
          <PricesListActions priceId={id} prices={this.props.prices} />
        )
      }
    ]
    return (
      <React.Fragment>
        <AdminBar />
        <Divider />
        <h1>Paliers</h1>
        <Button type='primary' onClick={this.openModal}>
          Ajouter un palier
        </Button>

        <CreatePriceModal
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.modal}
          onCancel={this.closeModal}
          onCreate={this.createPrice}
        />

        <Table
          columns={columns}
          dataSource={prices}
          rowKey='id'
          locale={{ emptyText: 'Aucun palier' }}
          style={{ marginTop: '20px' }}
        />
        <Divider />
        <h1>Réduction Bacchus Troué</h1>
        <p>-5€</p>
        <Divider />
        <h1>Supplément Chambre</h1>
        <p>+7€</p>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  prices: state.prices.prices
})

const mapDispatchToProps = dispatch => ({
  fetchPrices: () => dispatch(fetchPrices()),
  addPrice: data => dispatch(addPrice(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPrices)
