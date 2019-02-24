import React from 'react'
import { Modal, Form, Input, InputNumber, DatePicker, Radio } from 'antd'

const { RangePicker } = DatePicker
const CreatePriceModal = Form.create({ name: 'create_price_modal' })(
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
          title="Création d'un palier"
          okText='valider'
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout='horizontal'>
            <Form.Item {...formItemLayout} label='Nom'>
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: 'Vous devez entrer un nom !'
                  }
                ]
              })(<Input placeholder="Palier X..." />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label='Prix Bacchus'>
              {getFieldDecorator('value', {
                rules: [
                  {
                    required: true,
                    message: 'Vous devez entrer un montant !'
                  }
                ]
              })(<InputNumber min={0} />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label='Dates'>
              {getFieldDecorator('date', {
                rules: [
                  {
                    type: 'array',
                    required: true,
                    message: 'Choisissez une date !'
                  }
                ]
              })(<RangePicker showTime format='DD-MM-YY HH:mm:ss' />)}
            </Form.Item>
          </Form>
        </Modal>
      )
    }
  }
)
export default CreatePriceModal
