import React from 'react'
import { Route, Redirect, Switch } from 'react-router'
import { connect } from 'react-redux'

import DashboardHome from './components/Accueil'
import DashboardLoading from './components/Loading'
import EditUser from './components/User/Edit'
import ListUsers from './components/User/ListUsers'
import Temp2 from './components/User/Temp2'
import DashboardLayout from './layout'

import { autoLogin } from '../../modules/login'
import './dashboard.css'

const baseUrl = process.env.REACT_APP_BASEURL + 'dashboard/'

class Dashboard extends React.Component {
  constructor() {
    super()

    this.state = {
      render: false
    }
  }

  componentWillMount() {
    this.props.autoLogin().then(() => {
      this.setState({
        render: this.props.user && this.props.user.email
      })
    })
    console.log('MOUNT ', this.props)
    this.arrow = this.arrow.bind(this)
  }

  arrow() {
    return this.props.location &&
      this.props.location.indexOf('/dashboard') > -1 &&
      this.props.location !== '/dashboard'
      ? '/dashboard'
      : '/'
  }

  render() {
    console.log(this.state.render)
    const component = (
      <Switch>
        {this.state.render && (
          <Route path={baseUrl + 'home'} exact component={DashboardHome} />
        )}

        {this.state.render && (
          <Route path={baseUrl + 'user'} exact component={EditUser} />
        )}

        {this.state.render && (
          <Route path={baseUrl + 'list'} exact component={ListUsers} />
        )}

        {this.state.render && (
          <Route path={baseUrl + 'admin/list'} exact component={EditUser} />
        )}
        {this.state.render && (
          <Route path={baseUrl + 'admin/temp2'} exact component={Temp2} />
        )}

        {/* teams */}

        {/*this.state.render && (
        <Route path={baseUrl + 'joinTeam'} render={() => (
          !this.props.user.team
            ? <Spin /> 
            : <Redirect to={baseUrl} />
        )} />
        )*/}
        {this.state.render && <Redirect from="*" to="/dashboard/home" />}
        {!this.state.render && <DashboardLoading />}
      </Switch>
    )
    return (
      <DashboardLayout
        path={this.state.pathname}
        component={component}
        style={{ height: '100%' }}
      />
    )
  }
}

const mapStateToProps = state => ({
  location: state.routing.location.pathname,
  user: state.user.user
})

const mapDispatchToProps = dispatch => ({
  autoLogin: () => dispatch(autoLogin())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)
