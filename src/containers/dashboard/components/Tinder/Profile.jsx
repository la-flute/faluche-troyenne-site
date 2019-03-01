import React from 'react'
import Uploader from './Uploader'
import { connect } from 'react-redux'
import { Input, Button, Form, Tooltip, Icon, Spin } from 'antd'
import { fetchUser, sendCatchPhrase } from '../../../../modules/user'

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.props.fetchUser()
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.sendCatchPhrase(values.catchphrase)
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { user } = this.props
    if (!user) return <Spin />
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    }
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    }
    return (
      <React.Fragment>
        <h1 style={{ textAlign: 'center' }}>Mon profil Tinder</h1>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <span style={{ marginRight: '10px', fontSize: '20px' }}>
            Ma photo :
          </span>
          <Uploader />
        </div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item
            {...formItemLayout}
            label={
              <span>
                Phrase d'accroche&nbsp;
                <Tooltip title='Cette phrase sera vue par tous les autres membres du congrès'>
                  <Icon type='question-circle-o' />
                </Tooltip>
              </span>
            }
          >
            {getFieldDecorator('catchphrase', {
              rules: [
                {
                  required: true,
                  message: "Vous devez rentrer une phrase d'accroche !"
                }
              ],
              initialValue: user.catchphrase
            })(<Input.TextArea placeholder='Ta phrase de tchatche préférée' />)}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type='primary' htmlType='submit'>
              Valider
            </Button>
          </Form.Item>
        </Form>
      </React.Fragment>
    )
  }
}

const WrappedProfile = Form.create({ name: 'profile' })(Profile)

const mapStateToProps = state => ({
  user: state.user.user
})

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(fetchUser()),
  sendCatchPhrase: p => dispatch(sendCatchPhrase(p))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedProfile)
