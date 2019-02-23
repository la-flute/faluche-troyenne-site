import React from 'react'
import { Modal, Form, Input } from 'antd'

const CreateTeamModal = Form.create({ name: 'create_team_modal' })(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props
      const { getFieldDecorator } = form
      const formItemLayout = {
        labelCol: {
          xs: { span: 12 },
          sm: { span: 8 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        }
      }
      return (
        <Modal
          visible={visible}
          title="Création d'une équipe"
          okText='valider'
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout='horizontal'>
            <Form.Item {...formItemLayout} label="Nom de l'équipe">
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: 'Vous devez entrer un nom pour cette équipe !'
                  }
                ]
              })(<Input />)}
            </Form.Item>
          </Form>
        </Modal>
      )
    }
  }
)
export default CreateTeamModal
