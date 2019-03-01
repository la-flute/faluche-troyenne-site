import React from 'react'
import { Upload, Icon, Modal, Spin } from 'antd'
import { connect } from 'react-redux'
import { actions as notifActions } from 'redux-notifications'
import { fetchUser, deleteImage, addImage } from '../../../../modules/user'

class Uploader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: []
    }
    this.props.fetchUser()
  }
  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    })
  }

  handleChange = e => {
    console.log(e)
    if (e.file.status === 'removed') {
      this.props.deleteImage()
    }
    if (e.file.status === 'uploading') {
      this.props.addImage(
        `${this.props.user.id}${e.file.name.split('.').pop()}`
      )
    }
    this.setState({ fileList: e.fileList })
  }

  beforeUpload = file => {
    const isLt2M = file.size / 1024 / 1024 < 1
    if (!isLt2M) {
      this.props.sendError()
    }
    return isLt2M
  }

  render() {
    const { previewVisible, previewImage } = this.state
    let { fileList } = this.state
    const { user } = this.props
    if (!user) return <Spin />
    if (user.image && fileList.length === 0)
      fileList.push({
        uid: '-1',
        name: user.image,
        status: 'done',
        url: `http://localhost:3000/api/v1/tinders/${user.id}/image`
      })
    if (!user.image) fileList = []
    const uploadButton = (
      <div>
        <Icon type='plus' />
        <div className='ant-upload-text'>Upload</div>
      </div>
    )
    return (
      <React.Fragment>
        <Upload
          action='http://localhost:3000/api/v1/tinders/image' //TODO
          listType='picture-card'
          fileList={fileList}
          beforeUpload={this.beforeUpload}
          data={{ auth: this.props.auth }}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt='example' style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </React.Fragment>
    )
  }
}
const mapStateToProps = state => ({
  auth: state.login.token,
  user: state.user.user
})

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(fetchUser()),
  deleteImage: () => dispatch(deleteImage()),
  addImage: name => dispatch(addImage(name)),
  sendError: () =>
    dispatch(
      notifActions.notifSend({
        message:
          "L'image choisit est trop grande, elle doit être inférieur à 1Mo",
        kind: 'danger',
        dismissAfter: 2000
      })
    )
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Uploader)
