import React from 'react'
import { Icon, Tooltip, Modal } from 'antd'
import { connect } from 'react-redux'
import { removePrice } from '../../../../../modules/prices'

import '../admin.css'

class PricesListActions extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      removePriceModalVisible: false
    }
  }

  removePrice = () => {
    this.props.removePrice(this.props.priceId)
    this.setState({
      removePriceModalVisible: false
    })
  }

  openRemovePriceModal = () => {
    this.setState({
      removePriceModalVisible: true
    })
  }

  closeRemovePriceModal = () => {
    this.setState({
      removePriceModalVisible: false
    })
  }

  render() {
    const { prices, priceId } = this.props
    const price = prices.find(b => b.id === priceId)

    if (!price) {
      return null
    }

    return (
      <React.Fragment>
        <Tooltip placement='top' title='Supprimer le palier'>
          <a onClick={this.openRemovePriceModal} style={{ fontSize: '18px' }}>
            <Icon type='cross' />
          </a>
        </Tooltip>
        <Modal
          title='Êtes vous sûr ?'
          visible={this.state.removePriceModalVisible}
          onOk={this.removePrice}
          onCancel={this.closeRemovePriceModal}
          cancelText='Annuler'
          okText='Ok'
        >
          <p>
            Supprimer le palier "
            <strong>{price.name}</strong>" ?
          </p>
        </Modal>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  removePrice: id => dispatch(removePrice(id))
})

export default connect(
  null,
  mapDispatchToProps
)(PricesListActions)
