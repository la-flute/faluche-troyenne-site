import React from 'react'
import { connect } from 'react-redux'

import { Form, Input, Select, Button } from 'antd'

import { register } from '../../../../modules/register'
import { tryLogin } from '../../../../modules/login'
import { fetchUser } from '../../../../modules/user'

const { Option } = Select
const FormItem = Form.Item

class RegisterForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      accepted: false
    }
  }

  submit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (values.password !== values.password2)
          return this.props.passwordMismatch()
        this.setState({ loading: true })
        this.props.register(values).then(() => {
          this.setState({ loading: false, accepted: false })
        })
      }
    })
    // if (user.password !== user.password2) return this.props.passwordMismatch()
    // this.setState({
    //   loading: true
    // })

    // this.props
    //   .register(user)
    //   .then(() =>
    //     this.setState({ loading: false, tabIndex: 0, accepted: false })
    //   )
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.submit}>
        <FormItem label="Nom">
          {getFieldDecorator('lastName', {
            rules: [
              {
                required: true,
                message: 'Mets ton nom mamene'
              }
            ]
          })(<Input placeholder="Nom" autoFocus={true} />)}
        </FormItem>
        <FormItem label="Prénom">
          {getFieldDecorator('firstName', {
            rules: [{ required: true, message: 'Mets ton prénom mamene' }]
          })(<Input placeholder="Prénom" />)}
        </FormItem>
        <FormItem label="E-Mail">
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Mets ton email mamene' }]
          })(<Input placeholder="E-mail" />)}
        </FormItem>
        <FormItem label="Mot de passe">
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Mets ton mot de passe mamene' }]
          })(<Input type="password" placeholder="*******" />)}
        </FormItem>
        <FormItem label="Confirmer le mot de passe">
          {getFieldDecorator('password2', {
            rules: [
              { required: true, message: 'Confirme ton mot de passe mamene' }
            ]
          })(<Input type="password" placeholder="*******" />)}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            S'inscrire
          </Button>
        </FormItem>
      </Form>
    )
  }
}

const mapStateToProps = state => ({
  canLogin: state.canLogin.canLogin
})

const mapDispatchToProps = dispatch => ({
  login: user => {
    dispatch(tryLogin(user)).then(() => {
      dispatch(fetchUser())
    })
  },
  register: user => dispatch(register(user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(RegisterForm))
