import React from 'react'
import { Route, Redirect, Switch } from 'react-router'
import { connect } from 'react-redux'

import DashboardHome from './components/Accueil'
import DashboardLoading from './components/Loading'
import EditUser from './components/User/Edit'
import UserInfos from './components/User/Infos'
import AttestationUser from './components/User/Attestation'
import ListUsers from './components/User/ListUsers'
import Pay from './components/User/Pay'
import PaymentValidate from './components/User/PaymentValidate'
import PaymentError from './components/User/PaymentError'
import Bedrooms from './components/User/Bedrooms'
import Teams from './components/User/Teams'

import TinderProfile from './components/Tinder/Profile'
import TinderView from './components/Tinder/View'
import TopTinder from './components/Tinder/TopTinder'
import TinderMatch from './components/Tinder/Match'

import TargetProfile from './components/Target/Profile'
import TargetView from './components/Target/View'
import TopTarget from './components/Target/TopTarget'
import TargetMatch from './components/Target/Match'

import AdminBedrooms from './components/Admin/AdminBedrooms'
import AdminTeams from './components/Admin/AdminTeams'
import AdminPrices from './components/Admin/AdminPrices'
import AdminValid from './components/Admin/AdminValid'
import AdminRoles from './components/Admin/AdminRoles'
import AdminConfig from './components/Admin/AdminConfig'


import asyncComponent from '../../components/async'


import DashboardLayout from './layout'

import { autoLogin } from '../../modules/login'
import './dashboard.css'
const Mouche = asyncComponent(() => import('./components/Easter/Mouche'))

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
      <React.Fragment>
      <Mouche/>
      <Switch>
        {this.state.render && (
          <Route path={baseUrl + 'home'} exact component={DashboardHome} />
        )}

        {this.state.render && !user.town && (
          <Route path={baseUrl + 'user/infos'} exact component={EditUser} />
        )}

        {this.state.render && user.town && (
          <Route path={baseUrl + 'user/infos'} exact component={UserInfos} />
        )}

        {this.state.render && (
          <Route
            path={baseUrl + 'user/attestation'}
            exact
            component={AttestationUser}
          />
        )}

        {this.state.render && (
          <Route path={baseUrl + 'user/list'} exact component={ListUsers} />
        )}

        {this.state.render && user && !user.order && (
          <Route path={baseUrl + 'user/pay'} exact component={Pay} />
        )}

        {this.state.render && (
          <Route
            path={baseUrl + 'user/pay/validate'}
            exact
            component={PaymentValidate}
          />
        )}

        {this.state.render && (
          <Route
            path={baseUrl + 'user/pay/error'}
            exact
            component={PaymentError}
          />
        )}

        {this.state.render && (
          <Route path={baseUrl + 'user/bedrooms'} exact component={Bedrooms} />
        )}

        {this.state.render && (
          <Route path={baseUrl + 'user/teams'} exact component={Teams} />
        )}

        {/* tinder */}
        {this.state.render && user.validated  && (
          <Route
            path={baseUrl + 'tinder/profile'}
            exact
            component={TinderProfile}
          />
        )}
        {this.state.render && user.image && user.validated && (
          <Route path={baseUrl + 'tinder/view'} exact component={TinderView} />
        )}
        {this.state.render && user.validated && (
          <Route path={baseUrl + 'tinder/top'} exact component={TopTinder} />
        )}
        {this.state.render && user.validated && (
          <Route
            path={baseUrl + 'tinder/matchs'}
            exact
            component={TinderMatch}
          />
        )}

        {/* target */}
        {this.state.render && user.validated && (
          <Route
            path={baseUrl + 'target/profile'}
            exact
            component={TargetProfile}
          />
        )}
        {this.state.render && user.validated && (
          <Route path={baseUrl + 'target/view'} exact component={TargetView} />
        )}
        {this.state.render && user.validated && (
          <Route path={baseUrl + 'target/top'} exact component={TopTarget} />
        )}
        {this.state.render && user.validated && (
          <Route
            path={baseUrl + 'target/matchs'}
            exact
            component={TargetMatch}
          />
        )}

        {/* admin */}
        {this.state.render &&
          user &&
          user.permission &&
          user.permission.admin && (
            <Route
              path={baseUrl + 'admin/validate'}
              exact
              component={AdminValid}
            />
          )}
        {this.state.render &&
          user &&
          user.permission &&
          user.permission.admin && (
            <Route
              path={baseUrl + 'admin/bedrooms'}
              exact
              component={AdminBedrooms}
            />
          )}
        {this.state.render &&
          user &&
          user.permission &&
          user.permission.admin && (
            <Route
              path={baseUrl + 'admin/teams'}
              exact
              component={AdminTeams}
            />
          )}
        {this.state.render &&
          user &&
          user.permission &&
          user.permission.admin && (
            <Route
              path={baseUrl + 'admin/prices'}
              exact
              component={AdminPrices}
            />
          )}
        {this.state.render &&
          user &&
          user.permission &&
          user.permission.admin && (
            <Route
              path={baseUrl + 'admin/settings'}
              exact
              component={AdminConfig}
            />
          )} 
        {this.state.render &&
          user &&
          user.permission &&
          user.permission.admin && (
            <Route
              path={baseUrl + 'admin/define'}
              exact
              component={AdminRoles}
            />
          )}


        {this.state.render && <Redirect from='*' to='/dashboard/home' />}
        {!this.state.render && <DashboardLoading />}
      </Switch>
      </React.Fragment>
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
