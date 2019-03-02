import React from 'react'
import Uploader from '../Tinder/Uploader'
import { connect } from 'react-redux'
import { Spin } from 'antd'
import { fetchUser } from '../../../../modules/user'

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.props.fetchUser()
  }
  render() {
    const { user } = this.props
    if (!user) return <Spin />
    return (
      <React.Fragment>
        <h1 style={{ textAlign: 'center' }}>Mon profil de victime</h1>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <span style={{ marginRight: '10px', fontSize: '20px' }}>
            Ma photo :
          </span>
          <Uploader />
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.user
})

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(fetchUser())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)
