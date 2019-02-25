import React from 'react'
import { Route, Redirect, Switch } from 'react-router'
import { connect } from 'react-redux'

import DashboardHome from './components/Accueil'
import DashboardLoading from './components/Loading'
import EditUser from './components/User/Edit'
import ListUsers from './components/User/ListUsers'
import Pay from './components/User/Pay'
import Bedrooms from './components/User/Bedrooms'
import Teams from './components/User/Teams'
import AdminBedrooms from './components/Admin/AdminBedrooms'
import AdminTeams from './components/Admin/AdminTeams'
import AdminPrices from './components/Admin/AdminPrices'
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
  }


  render() {
    const { user } = this.props
    const component = (
      <Switch>
        {this.state.render && (
          <Route path={baseUrl + 'home'} exact component={DashboardHome} />
        )}

        {this.state.render && (
          <Route path={baseUrl + 'user/infos'} exact component={EditUser} />
        )}

        {this.state.render && (
          <Route path={baseUrl + 'user/list'} exact component={ListUsers} />
        )}

        {this.state.render && user && !user.order && (
          <Route path={baseUrl + 'user/pay'} exact component={Pay} />
        )}

        {this.state.render && (
          <Route path={baseUrl + 'user/bedrooms'} exact component={Bedrooms} />
        )}

        {this.state.render && (
          <Route path={baseUrl + 'user/teams'} exact component={Teams} />
        )}


        {/* admin */}

        {this.state.render && (
          <Route path={baseUrl + 'admin/list'} exact component={EditUser} />
        )}
        {this.state.render && (
          <Route path={baseUrl + 'admin/bedrooms'} exact component={AdminBedrooms} />
        )}
        {this.state.render && (
          <Route path={baseUrl + 'admin/teams'} exact component={AdminTeams} />
        )}
        {this.state.render && (
          <Route path={baseUrl + 'admin/prices'} exact component={AdminPrices} />
        )}



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
