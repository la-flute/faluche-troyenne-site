import React from 'react'
import { Card } from 'antd'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

class AdminBar extends React.Component {

  render() {
    return (
      <Card title={<h1>Panneau d'administration</h1>}>
        <p><i>"Un grand pouvoir implique de grandes responsabilités"</i><strong> Oncle Ben</strong></p>
        <p>Alors <strong>fais gaffe à ce que tu fais !</strong></p>
      </Card>
    )
  }
}


const mapDispatchToProps = dispatch => ({
  redirectToHome: () => dispatch(push('/dashboard/home')),
})


export default connect(
    null,
    mapDispatchToProps)(AdminBar)