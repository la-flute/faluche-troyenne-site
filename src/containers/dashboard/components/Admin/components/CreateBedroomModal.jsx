import React from 'react'
import { Modal, Form, InputNumber } from 'antd'

const CreateBedroomModal = Form.create({ name: 'create_bedroom_modal' })(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props
      const { getFieldDecorator } = form
      const formItemLayout = {
        labelCol: {
          xs: { span: 12 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };
      return (
        <Modal
          visible={visible}
          title="Création d'une chambre"
          okText='valider'
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout='horizontal'>
            <Form.Item {...formItemLayout} label='Numéro'>
              {getFieldDecorator('number', {
                rules: [
                  {
                    required: true,
                    message: 'Vous devez entrer un numéro de chambre !'
                  }
                ]
              })(<InputNumber min={1} />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label='Étage'>
              {getFieldDecorator('floor', {
                rules: [
                  {
                    required: true,
                    message: 'Vous devez entrer un étage !'
                  }
                ]
              })(<InputNumber />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label='Nombre de places'>
              {getFieldDecorator('places', {
                rules: [
                  {
                    required: true,
                    message: 'Vous devez entrer un nombre de places !'
                  }
                ]
              })(<InputNumber min={1} />)}
            </Form.Item>
          </Form>
        </Modal>
      )
    }
  }
)
export default CreateBedroomModal