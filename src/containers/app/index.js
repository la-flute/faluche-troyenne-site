import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Notifs as Notifications } from 'redux-notifications'
import 'antd/dist/antd.css'

import Home from '../home'
import asyncComponent from '../../components/async'

const Dashboard = asyncComponent(() => import('../dashboard'))
const Validate = asyncComponent(()=> import('../validate'))
const Reset = asyncComponent(()=> import('../reset'))

const App = props => (
  <div>
    <Notifications />
    <Switch>
      <Route path={process.env.REACT_APP_BASEURL} exact component={Home} />
      <Route path={process.env.REACT_APP_BASEURL + 'dashboard/home'} exact component={Dashboard} />

      <Route path={process.env.REACT_APP_BASEURL + 'valid/:token'} exact component={Validate} />
      <Route path={process.env.REACT_APP_BASEURL + 'reset/:resetToken'} exact component={Reset} />

      
      <Route path={process.env.REACT_APP_BASEURL + 'dashboard/admin/users'} exact component={Dashboard} />
      <Route path={process.env.REACT_APP_BASEURL + 'dashboard/admin/paids'} exact component={Dashboard} />
      <Route path={process.env.REACT_APP_BASEURL + 'dashboard/admin/conversations'} component={Dashboard} />
      <Route path={process.env.REACT_APP_BASEURL + 'dashboard/admin/material'} exact component={Dashboard} />
      <Route path={process.env.REACT_APP_BASEURL + 'dashboard/admin/places'} exact component={Dashboard} />
      <Route path={process.env.REACT_APP_BASEURL + 'dashboard/admin/scanned'} exact component={Dashboard} />

      <Route path={process.env.REACT_APP_BASEURL + 'dashboard/respo/conversations'} exact component={Dashboard} />
      <Route path={process.env.REACT_APP_BASEURL + 'dashboard/respo/messages/:id'} exact component={Dashboard} />
      <Route path={process.env.REACT_APP_BASEURL + 'dashboard/respo/scanned'} exact component={Dashboard} />

      <Route path={process.env.REACT_APP_BASEURL + 'dashboard/orga/payment'} exact component={Dashboard} />
      <Route path={process.env.REACT_APP_BASEURL + 'dashboard/orga/validate'} exact component={Dashboard} />

      <Route path={process.env.REACT_APP_BASEURL + 'dashboard/tournois/:game/decks'} component={Dashboard} />
      <Route path={process.env.REACT_APP_BASEURL + 'dashboard/tournois/:game/mydecks'} component={Dashboard} />
      <Route path={process.env.REACT_APP_BASEURL + 'dashboard/tournois/:game/arbre-tournois'} component={Dashboard} />
      <Route path={process.env.REACT_APP_BASEURL + 'dashboard/tournois/:game/teams'} component={Dashboard} />
      <Route path={process.env.REACT_APP_BASEURL + 'dashboard/tournois/:game/players'} component={Dashboard} />
      <Route path={process.env.REACT_APP_BASEURL + 'dashboard/tournois/:game/rules'} component={Dashboard} />
      <Route path={process.env.REACT_APP_BASEURL + 'dashboard/tournois/libre/players'} component={Dashboard} />
      <Route path={process.env.REACT_APP_BASEURL + 'dashboard/tournois/libre/compare'} component={Dashboard} />
      <Route path={process.env.REACT_APP_BASEURL + 'dashboard/tournois/libre/calendar'} component={Dashboard} />

      <Route path={process.env.REACT_APP_BASEURL + 'dashboard/messages'} component={Dashboard} />

      <Redirect from="*" to="/dashboard/home" />
    </Switch>
  </div>
)

const mapStateToProps = state => ({
  auth: state.user.user
})

export default connect(mapStateToProps)(App)
