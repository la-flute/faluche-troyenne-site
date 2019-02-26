import React from 'react'
import { Modal, Form, InputNumber } from 'antd'

const AttestationModal = Form.create({ name: 'attestation_modal' })(
  class extends React.Component {
    render() {
      const { visible, onCancel, onValidate, form } = this.props
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
          title="Tu as vraiment lu l'attestation ?"
          okText='valider'
          onCancel={onCancel}
          onOk={onValidate}
        >
          <Form layout='horizontal'>
            <p>
              Comme on sait que tu es un petit malin, on veut vérifier que tu as
              bien lu l'attestation. Pour vérifier cela, tu vas devoir rentrer{' '}
              <strong>le nombre d'occurence du mot "Troyes"</strong> dans le
              text <strong>sous toutes ses formes</strong>. Donc "3", "Troyes",
              "Troua", "troie", ... sont valables
            </p>
            <p>
              <strong>
                Attention ! Chaque erreur sera enregistrée, et la différence
                sera égale au nombre de sec de bienvenue que vous prendrez
              </strong>
            </p>
            <Form.Item {...formItemLayout} label="Nombre d'occurences">
              {getFieldDecorator('nbr', {
                rules: [
                  {
                    required: true,
                    message:
                      'Il faut rentrer le nombre d\'occurence de "Troyes" dans le text !'
                  }
                ]
              })(<InputNumber min={0} />)}
            </Form.Item>
          </Form>
        </Modal>
      )
    }
  }
)
export default AttestationModal
