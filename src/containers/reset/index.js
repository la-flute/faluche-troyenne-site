import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import errorToString from '../../lib/errorToString'
import { actions as notifActions } from 'redux-notifications'

import './reset.css'
import { Icon, Input, Button, Form } from 'antd'

import { resetPassword } from '../../modules/forgot'

class Reset extends React.Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values = { ...values, token: this.props.match.params.resetToken }
        this.props.resetPassword(values)
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className='reset'>
        <div className='reset-form'>
          <Form onSubmit={this.handleSubmit}>
            <h1 className='reset-title'>Nouveau mot de passe :</h1>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message:
                      'Alors en générale ça aide de rentrer le mot de passe pour le reset'
                  }
                ]
              })(
                <Input
                  prefix={<Icon type='lock' />}
                  type='password'
                  placeholder='******'
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password2', {
                rules: [
                  {
                    required: true,
                    message:
                      'Faut retaper le mot de passe pour que ça marche...'
                  }
                ]
              })(
                <Input
                  prefix={<Icon type='lock' />}
                  type='password'
                  placeholder='******'
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                style={{ width: '100%' }}
              >
                Changer mon mot de passe
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  resetPassword: user =>
    dispatch(resetPassword(user))
      .then(() => dispatch(push('/')))
      .catch(() =>
        dispatch(
          notifActions.notifSend({
            message: errorToString('PASSWORD_MISMATCH'),
            kind: 'danger',
            dismissAfter: 2000
          })
        )
      )
})

const WrappedReset = Form.create({ name: 'register' })(Reset)

export default connect(
  null,
  mapDispatchToProps
)(WrappedReset)
