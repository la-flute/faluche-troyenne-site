import React from 'react'
import { connect } from 'react-redux'

import { Form, Icon, Input, Button, Spin } from 'antd'

import { sendResetMail } from '../../../../modules/forgot'

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  handleSubmit = e => {
    this.setState({ loading: true })
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props
          .sendMail(values)
          .then(() => this.setState({ loading: false }))
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <Spin spinning={this.state.loading}>
        <Form onSubmit={this.handleSubmit} className='login-form'>
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [
                {
                  required: true,
                  message:
                    'Déjà tu perds ton mot de passe mais en plus tu mets pas ton email...'
                }
              ]
            })(
              <Input
                prefix={<Icon type='mail' />}
                type='email'
                placeholder='E-Mail'
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Envoyer le mail
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    )
  }
}

const mapStateToProps = state => ({
  canLogin: state.canLogin.canLogin
})

const mapDispatchToProps = dispatch => ({
  sendMail: user => dispatch(sendResetMail(user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(ForgotPassword))
