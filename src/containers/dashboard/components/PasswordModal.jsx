import React from 'react'
import { Modal, Form, Input, Icon } from 'antd'

class PasswordModal extends React.Component {
  render() {
    const { visible, onCancel, onCreate, form } = this.props
    const { getFieldDecorator } = form
    return (
      <Modal
        visible={visible}
        title='Changer mon mot de passe'
        okText='Modifier'
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout='vertical'>
          <Form.Item label='Ancien mot de passe'>
            {getFieldDecorator('oldpassword', {
              rules: [
                {
                  required: true,
                  message: 'Vous devez entrer votre ancien mot de passe'
                },
                {
                  min: 6,
                  message: 'Le mot de passe doit faire au moins 6 caractères'
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
          <Form.Item label='Nouveau mot de passe'>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Vous devez entrer un nouveau mot de passe'
                },
                {
                  min: 6,
                  message: 'Le mot de passe doit faire au moins 6 caractères'
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
          <Form.Item label='Confirmer le mot de passe'>
            {getFieldDecorator('password2', {
              rules: [
                {
                  required: true,
                  message: 'Vous devez confirmer le mot de passe'
                },
                {
                  min: 6,
                  message: 'Le mot de passe doit faire au moins 6 caractères'
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
        </Form>
      </Modal>
    )
  }
}

const WrappedModal = Form.create({ name: 'password-modal' })(PasswordModal)

export default WrappedModal
