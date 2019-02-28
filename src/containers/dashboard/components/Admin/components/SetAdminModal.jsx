import React from 'react'

import { connect } from 'react-redux'
import {
  setAdmin,
  removeAdmin,
  setPermission,
  setRespo
} from '../../../../../modules/admin'

import { Icon, Tooltip, Modal, Button, Checkbox } from 'antd'

const confirm = Modal.confirm

class SetAdminModal extends React.Component {
  constructor(props) {
    super(props)
  }

  setAdmin = () => {
    this.props.setAdmin(this.props.userId)
    this.setState({
      setAdminModalVisible: false
    })
  }

  removeAdmin = () => {
    this.props.removeAdmin(this.props.userId)
    this.setState({
      removeAdminModalVisible: false
    })
  }

  render() {
    
  }
}
