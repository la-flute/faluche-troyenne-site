import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Notifs as Notifications } from 'redux-notifications'
import 'antd/dist/antd.css'

import Home from '../home'
import asyncComponent from '../../components/async'

const Dashboard = asyncComponent(() => import('../dashboard/Dashboard'))
const MentionsLegales = asyncComponent(() =>
  import('../mentions-legales/MentionsLegales')
)
const Troll = asyncComponent(() =>
  import('../troll')
)
const Validate = asyncComponent(() => import('../validate'))
const Reset = asyncComponent(() => import('../reset'))

const App = props => (
  <div style={{ height: '100%' }}>
    <Notifications />
    <Switch>
      <Route path={process.env.REACT_APP_BASEURL} exact component={Home} />
      <Route
        path={process.env.REACT_APP_BASEURL + 'mentions-legales'}
        exact
        component={MentionsLegales}
      />
      <Route
        path={process.env.REACT_APP_BASEURL + 'mectesstupidtucroyaisvraimentquonallaitouvrirmaintenant'}
        exact
        component={Troll}
      />
      <Route
        path={process.env.REACT_APP_BASEURL + 'dashboard'}
        component={Dashboard}
      />
      <Route
        path={process.env.REACT_APP_BASEURL + 'valid/:token'}
        exact
        component={Validate}
      />
      <Route
        path={process.env.REACT_APP_BASEURL + 'reset/:resetToken'}
        exact
        component={Reset}
      />
      <Redirect from='*' to='/' />
    </Switch>
  </div>
)

const mapStateToProps = state => ({
  auth: state.user.user
})

export default connect(mapStateToProps)(App)
