import React from 'react'
import { connect } from 'react-redux'

import { Form, Icon, Input, Button } from 'antd'

import { register } from '../../../../modules/register'
import { tryLogin } from '../../../../modules/login'
import { fetchUser } from '../../../../modules/user'

import './loginForm.css'
import ForgotPassword from '../forgotPassword/ForgotPassword.jsx'

const FormItem = Form.Item

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      resetPassword: false
    }
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.login(values)
      }
    })
    this.setState({resetPassword: false})
  }

  changePassword = () => {
    const {resetPassword} = this.state
    this.setState({ resetPassword: !resetPassword })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div>
        {this.state.resetPassword ? (
          <div><ForgotPassword />
          <div
              style={{
                marginBottom: '5px',
                marginTop: '20px',
                fontSize: '0.9em'
              }}
            >
              T'as missclick trouduc ? {' '}
              <a onClick={this.changePassword}>Clique là !</a>
            </div></div>
        ) : (
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
              {getFieldDecorator('email', {
                rules: [
                  {
                    required: true,
                    message: 'Veuillez saisir votre nom e-mail'
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon
                      type="user"
                      style={{ color: 'rgba(0,0,0,.25)', marginLeft: '-3px' }}
                    />
                  }
                  placeholder="E-mail"
                  autoFocus={true}
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'Veuillez saisir votre mot de passe'
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon
                      type="lock"
                      style={{ color: 'rgba(0,0,0,.25)', marginLeft: '-3px' }}
                    />
                  }
                  type="password"
                  placeholder="Mot de passe"
                />
              )}
            </FormItem>
            <div
              style={{
                marginBottom: '5px',
                marginTop: '20px',
                fontSize: '0.9em'
              }}
            >
              T'as perdu ton mot de passe trouduc ?{' '}
              <a onClick={this.changePassword}>Clique là !</a>
            </div>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Connexion
              </Button>
            </FormItem>
          </Form>
        )}
      </div>
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
)(Form.create()(LoginForm))
