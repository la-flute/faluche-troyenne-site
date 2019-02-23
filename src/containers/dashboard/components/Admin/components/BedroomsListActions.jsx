import React from 'react'
import { Icon, Tooltip, Modal } from 'antd'
import { connect } from 'react-redux'
import { removeBedroom } from '../../../../../modules/bedrooms'

import '../admin.css'


class BedroomsListActions extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      removeBedroomModalVisible: false
    }
  }

  removeBedroom = () => {
    this.props.removeBedroom(this.props.bedroomId)
    this.setState({
      removeBedroomModalVisible: false
    })
  }

  openRemoveBedroomModal = () => {
    this.setState({
      removeBedroomModalVisible: true
    })
  }

  closeRemoveBedroomModal = () => {
    this.setState({
      removeBedroomModalVisible: false
    })
  }


  render() {
    const { bedrooms, bedroomId } = this.props
    const bedroom = bedrooms.find(b => b.id === bedroomId)

    if (!bedroom) {
      return null
    }

    return (
      <React.Fragment>
        <Tooltip placement='top' title='Supprimer la chambre'>
          <a onClick={this.openRemoveBedroomModal} style={{ fontSize: '18px' }}>
            <Icon type='cross' />
          </a>
        </Tooltip>
        <Modal
          title='Êtes vous sûr ?'
          visible={this.state.removeBedroomModalVisible}
          onOk={this.removeBedroom}
          onCancel={this.closeRemoveBedroomModal}
          cancelText='Annuler'
          okText='Ok'
        >
          <h3>Supprimer la chambre</h3>
          <p>
            <strong>
              Chambre n°
              {`${bedroom.number}`}
            </strong>
          </p>
        </Modal>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  removeBedroom: id => dispatch(removeBedroom(id))
})

export default connect(
  null,
  mapDispatchToProps
)(BedroomsListActions)
