import React from 'react'
import { connect } from 'react-redux'
import { Spin } from 'antd'
import { fetchUser } from '../../../../modules/user'
import notPrepared from '../../assets/notprepared.jpg'

class Edit extends React.Component {

  
  constructor(props) {
    super(props)
    this.state = {
      matches: []
    }
  }
  
  render() {
    const { user } = this.props
    if(!user) {
      this.props.fetchUser()
      return <Spin />
    }

    return (
      <div style={{ height: '100%'}}>
        <h1>Bienvenue sur le site du WET3 !</h1>

        <img src={notPrepared} alt="" />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
})

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(fetchUser()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Edit)
