import React from 'react'
import { Form, Input, Tooltip, Icon, Button, Radio, Spin, Modal, DatePicker } from 'antd'
import { fetchUser, sendInfos } from '../../../../modules/user'
import { connect } from 'react-redux'
import moment from 'moment'

const { confirm } = Modal
const dateFormat = 'DD/MM/YYYY'
class Edit extends React.Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.isMajeur = moment(values.isMajeur).isBefore(moment('03/05/2001', dateFormat))
        this.showConfirm(values)
      }
    })
  }

  showConfirm = (values) => {
    confirm({
      title: 'Êtes-vous sûr de ces informations ?',
      content:
        'En cas d\'erreur, vous ne pourrez pas modifier ce formulaire, et vous devrez contacter l\'orga',
      onOk: () => {
        console.log(values)
        this.props.sendInfos(values)
      },
      onCancel() {}
    })
  }

  render() {
    const { user } = this.props
    if (!user) {
      this.props.fetchUser()
      return <Spin />
    }

    const { getFieldDecorator } = this.props.form

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
      <Form onSubmit={this.handleSubmit}>
        <Form.Item
          {...formItemLayout}
          label={
            <span>
              Nom&nbsp;
              <Tooltip title="Visible seulement par l'orga">
                <Icon type='question-circle-o' />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('lastName', {
            rules: [
              {
                required: true,
                message: 'Vous devez entrer un nom !'
              }
            ],
            initialValue: user.lastName
          })(<Input />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label={<span>Prénom</span>}>
          {getFieldDecorator('firstName', {
            rules: [
              {
                required: true,
                message: 'Vous devez entrer un prénom !'
              }
            ],
            initialValue: user.firstName
          })(<Input />)}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label={
            <span>
              Surnom&nbsp;
              <Tooltip title='Surnom de fal'>
                <Icon type='question-circle-o' />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('nickName')(
            <Input placeholder='Pour les faluchards' />
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label='Téléphone'>
          {getFieldDecorator('phone', {
            rules: [
              {
                required: true,
                message: 'Vous devez entrer un numéro de téléphone !'
              }
            ]
          })(<Input placeholder='0633063306' />)}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="Date d'anniversaire"
        >
          {getFieldDecorator('isMajeur', {
            rules: [{ type: 'object', required: true, message: 'Vous devez renseigner votre date d\'anniversaire !' }],
            initialValue: moment('01/01/1995', dateFormat)
          })(
            <DatePicker format={dateFormat}/>
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label={
            <span>
              Adresse&nbsp;
              <Tooltip title='Votre adresse (exemple : 3 rue de la Trinité 10000 Troyes)'>
                <Icon type='question-circle-o' />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('address', {
            rules: [
              {
                required: true,
                message: 'Vous devez entrer une adresse !'
              }
            ]
          })(<Input placeholder='3 rue de la Trinité 10000 Troyes' />)}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label={
            <span>
              Ville d'étude&nbsp;
              <Tooltip title="Votre ville d'étude (exemple : Troyes Capitale)">
                <Icon type='question-circle-o' />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('town', {
            rules: [
              {
                required: true,
                message: "Vous devez entrer une ville d'étude !"
              }
            ]
          })(<Input placeholder='Troyes 133' />)}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label={
            <span>
              Fillière&nbsp;
              <Tooltip title="Votre fillière d'étude (exemple : Ingénieur)">
                <Icon type='question-circle-o' />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('studies', {
            rules: [
              {
                required: true,
                message: "Vous devez entrer une fillière d'étude !"
              }
            ]
          })(<Input placeholder='Ingénieur' />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label='Folklore'>
          {getFieldDecorator('folklore', {
            rules: [
              {
                required: true,
                message: 'Vous devez entrer un folklore !'
              }
            ]
          })(
            <Radio.Group>
              <Radio value='faluchard'>Faluchard</Radio>
              <Radio value='impetrant'>Impétrant</Radio>
              <Radio value='sympathisant'>Sympathisant</Radio>
              <Radio value='autre'>Autre folklore</Radio>
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label={<span>Allergies</span>}>
          {getFieldDecorator('allergies')(
            <Input placeholder='Arachide, glutène, ...' />
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label={<span>Médicaments</span>}>
          {getFieldDecorator('medication')(
            <Input placeholder='Le doliprane post cuite ne compte pas' />
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label={
            <span>
              Régime&nbsp;
              <Tooltip
                title="En cas de régime très particulier, merci de ramener votre
              propre nourriture et d'informer les orgas"
              >
                <Icon type='question-circle-o' />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('regime', {
            rules: [
              {
                required: true,
                message: 'Vous devez choisir un régime !'
              }
            ]
          })(
            <Radio.Group>
              <Radio value='omni'>Omnivore</Radio>
              <Radio value='vege'>Végétarien</Radio>
              <Radio value='vegan'>Végan</Radio>
              <Radio value='autre'>Autre</Radio>
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label={
            <span>
              Mode de transport&nbsp;
              <Tooltip title="Si vous avez besoin de l'aide de l'orga pour venir, merci de le préciser">
                <Icon type='question-circle-o' />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('trajet', {
            rules: [
              {
                required: true,
                message: 'Vous devez choisir un mode de transport !'
              }
            ]
          })(
            <Radio.Group>
              <Radio value='car'>Voiture</Radio>
              <Radio value='train'>Train</Radio>
              <Radio value='autre'>Autre</Radio>
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label={
            <span>
              Commentaire sur votre trajet&nbsp;
              <Tooltip title="Si vous avez besoin que l'on vienne vous chercher à la gare...">
                <Icon type='question-circle-o' />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('trajet_commentaire')(
            <Input.TextArea placeholder="N'oubliez pas de préciser les informations utiles : heure, lieu,..." />
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit'>
            Envoyer mes informations à l'orga
          </Button>
        </Form.Item>
      </Form>
    )
  }
}
const WrappedEdit = Form.create({ name: 'register' })(Edit)

const mapStateToProps = state => ({
  user: state.user.user
})

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(fetchUser()),
  sendInfos: (data) => dispatch(sendInfos(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedEdit)
